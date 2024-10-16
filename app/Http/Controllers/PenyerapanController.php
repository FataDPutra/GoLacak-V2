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
    if (auth()->user()->role === 'admin' || auth()->user()->role === 'user') {
        // Retrieve penyerapan and order by created_at descending
        $penyerapan = Penyerapan::with([
            'anggaran.kegiatan.program',
            'anggaran.kegiatan.subprogram',
            'anggaran.kegiatan.rekening'
        ])->orderBy('updated_at', 'desc')->get(); // Order by created_at

        $programs = Program::with([
            'subprograms.kegiatans.rekening',
            'subprograms.rekening',
        ])->get();

        $anggaran = Anggaran::with(['kegiatan.rekening'])->get();

        // dd($penyerapan);

        return Inertia::render(auth()->user()->role === 'admin' ? 'Realisasi/Index' : 'Users/Realisasi/Index', [
            'penyerapanList' => $penyerapan,
            'anggaran' => $anggaran,
            'programs' => $programs,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    // If role is not recognized, redirect to dashboard or default page
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
