<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Penyerapan;
use App\Models\Anggaran;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
class PenyerapanController extends Controller
{
    // Display a listing of the penyerapan
public function index()
{
    $user = auth()->user(); // Ambil user yang sedang login

    if ($user->role === 'admin' || $user->role === 'user') {
        // Jika yang login adalah user, batasi berdasarkan bidang_id
        if ($user->role === 'user') {
            $bidangId = $user->bidang_id;

            // Retrieve penyerapan dan filter berdasarkan bidang_id di anggaran
            $penyerapan = Penyerapan::with([
                'anggaran.kegiatan.program',
                'anggaran.kegiatan.subprogram',
                'anggaran.kegiatan.rekening'
            ])
            ->whereHas('anggaran', function ($query) use ($bidangId) {
                // Filter berdasarkan bidang_id di anggaran
                $query->where('bidang_id', $bidangId);
            })
            ->orderBy('updated_at', 'desc')
            ->get();

            // Ambil semua program melalui anggaran dan filter bidang_id di anggaran
            $programs = Program::whereHas('subprograms.kegiatans.anggaran', function ($query) use ($bidangId) {
                // Filter berdasarkan bidang_id di anggaran
                $query->where('bidang_id', $bidangId);
            })
            ->with([
                'subprograms.kegiatans.rekening',
                'subprograms.rekening',
            ])->get();

            // Ambil anggaran yang terkait dengan bidang user
            $anggaran = Anggaran::with(['kegiatan.rekening'])
                ->where('bidang_id', $bidangId) // Filter anggaran berdasarkan bidang_id
                ->get();
        } else {
            // Jika admin, ambil semua data tanpa filter
            $penyerapan = Penyerapan::with([
                'anggaran.kegiatan.program',
                'anggaran.kegiatan.subprogram',
                'anggaran.kegiatan.rekening'
            ])
            ->orderBy('updated_at', 'desc')
            ->get();

            // Ambil semua program tanpa filter
            $programs = Program::with([
                'subprograms.kegiatans.rekening',
                'subprograms.rekening',
            ])->get();

            // Ambil semua anggaran tanpa filter
            $anggaran = Anggaran::with(['kegiatan.rekening'])->get();
        }

        // Render view berdasarkan role user
        return Inertia::render($user->role === 'admin' ? 'Realisasi/Index' : 'Users/Realisasi/Index', [
            'penyerapanList' => $penyerapan,
            'anggaran' => $anggaran,
            'programs' => $programs,
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    // Jika role tidak dikenali, redirect ke dashboard atau halaman default
    return redirect('/dashboard');
}



    // Store a newly created penyerapan in storage
    public function store(Request $request)
    {
        $request->validate([
            'anggaran_id' => 'required|exists:anggaran,id',
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'penyerapan_anggaran' => 'required|numeric|min:1',
            'realisasi_kinerja' => 'nullable|numeric',
            'capaian_fisik' => 'nullable|numeric', // Validasi untuk tarcapaian_fisik' => 'nullable|numeric', // Validasi untuk realisasi fisik
        ]);

        $anggaran = Anggaran::findOrFail($request->anggaran_id);

        // Calculate persentase penyerapan
        $persentase_penyerapan = 0;

        if ($anggaran->pergeseran == 0 && $anggaran->perubahan == 0) {
            $persentase_penyerapan = ($request->penyerapan_anggaran / $anggaran->anggaran_murni) * 100;
        } elseif ($anggaran->pergeseran > 0 && $anggaran->perubahan == 0) {
            $persentase_penyerapan = ($request->penyerapan_anggaran / $anggaran->pergeseran) * 100;
        } elseif ($anggaran->perubahan > 0 && $anggaran->pergeseran > 0) {
            $persentase_penyerapan = ($request->penyerapan_anggaran / $anggaran->perubahan) * 100;
        }

        // Ensure persentase_penyerapan is a float
        $persentase_penyerapan = (float)$persentase_penyerapan;

        Penyerapan::create([
            'anggaran_id' => $request->anggaran_id,
            'kegiatan_id' => $request->kegiatan_id,
            'penyerapan_anggaran' => $request->penyerapan_anggaran,
            'persentase_penyerapan' => $persentase_penyerapan,
            'realisasi_kinerja' => $request->realisasi_kinerja, // Store realisascapaian_fisik'capaian_fisik, // Store
            'capaian_fisik' => $request->capaian_fisik, // Store realisascapaian_fisik'capaian_fisik, // Store
        ]);

        return redirect()->route('realisasi.index')->with('success', 'Penyerapan berhasil disimpan!');
    }

    // Update the specified penyerapan in storage
    public function update(Request $request, $id)
    {
        $request->validate([
            'anggaran_id' => 'required|exists:anggaran,id',
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'penyerapan_anggaran' => 'required|numeric|min:1',
            'realisasi_kinerja' => 'nullable|numeric', // Validasi untuk target fisik
            'capaian_fisik' => 'nullable|numeric', // Validasi untuk realisasi fisik
        ]);

        $anggaran = Anggaran::findOrFail($request->anggaran_id);
        $persentase_penyerapan = 0;

        if ($anggaran->pergeseran == 0 && $anggaran->perubahan == 0) {
            $persentase_penyerapan = ($request->penyerapan_anggaran / $anggaran->anggaran_murni) * 100;
        } elseif ($anggaran->pergeseran > 0 && $anggaran->perubahan == 0) {
            $persentase_penyerapan = ($request->penyerapan_anggaran / $anggaran->pergeseran) * 100;
        } elseif ($anggaran->perubahan > 0 && $anggaran->pergeseran > 0) {
            $persentase_penyerapan = ($request->penyerapan_anggaran / $anggaran->perubahan) * 100;
        }

        $penyerapan = Penyerapan::with([ // Pastikan relasi diambil
            'anggaran.kegiatan.program',
            'anggaran.kegiatan.subprogram',
            'anggaran.kegiatan.rekening'
        ])->findOrFail($id);        

        $penyerapan->update([
            'anggaran_id' => $request->anggaran_id,
            'kegiatan_id' => $request->kegiatan_id,
            'penyerapan_anggaran' => $request->penyerapan_anggaran,
            'persentase_penyerapan' => $persentase_penyerapan,
            'realisasi_kinerja' => $request->realisasi_kinerja, // Update realisascapaian_fisik'capaian_fisik, // Update
            'capaian_fisik' => $request->capaian_fisik, // Update realisascapaian_fisik'capaian_fisik, // Update
        ]);

        return redirect()->route('realisasi.index')->with('success', 'Penyerapan berhasil diupdate!');
    }

    // Remove the specified penyerapan from storage
    public function destroy($id)
    {
        $penyerapan = Penyerapan::findOrFail($id);
        $penyerapan->delete();

        return redirect()->route('realisasi.index')->with('success', 'Penyerapan berhasil dihapus!');
    }
}
