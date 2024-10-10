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
        // Fetch penyerapan with related anggaran and kegiatan
        $penyerapan = Penyerapan::with(['anggaran', 'kegiatan'])->get();

        // Fetch programs along with their subprograms, kegiatans, and rekening
        $programs = Program::with([
            'subprograms.kegiatans.rekening', // Relasi subprogram dengan kegiatannya dan rekening
            'subprograms.rekening', // Relasi subprogram dengan rekening
        ])->get();

        // Fetch all anggaran data
        $anggaran = Anggaran::with(['kegiatan.rekening'])->get(); // Termasuk relasi rekening pada kegiatan

        // Send data to the view
        return Inertia::render('Penyerapan/Index', [
            'penyerapanList' => $penyerapan,
            'anggaran' => $anggaran,
            'programs' => $programs, // Send programs with related data
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    // Store a newly created penyerapan in storage
public function store(Request $request)
{
    $request->validate([
        'anggaran_id' => 'required|exists:anggaran,id',
        'kegiatan_id' => 'required|exists:kegiatan,id',
        'penyerapan_anggaran' => 'required|numeric|min:1',
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
        'persentase_penyerapan' => $persentase_penyerapan, // store as float
    ]);

    return redirect()->route('penyerapan.index')->with('success', 'Penyerapan berhasil disimpan!');
}


    // Update the specified penyerapan in storage
public function update(Request $request, $id)
{
    $request->validate([
        'anggaran_id' => 'required|exists:anggaran,id',
        'kegiatan_id' => 'required|exists:kegiatan,id',
        'penyerapan_anggaran' => 'required|numeric|min:1',
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

    $penyerapan = Penyerapan::findOrFail($id);
    $penyerapan->update([
        'anggaran_id' => $request->anggaran_id,
        'kegiatan_id' => $request->kegiatan_id,
        'penyerapan_anggaran' => $request->penyerapan_anggaran,
        'persentase_penyerapan' => $persentase_penyerapan,
    ]);

    return redirect()->route('penyerapan.index')->with('success', 'Penyerapan berhasil diupdate!');
}


    // Remove the specified penyerapan from storage
    public function destroy($id)
    {
        $penyerapan = Penyerapan::findOrFail($id);
        $penyerapan->delete();

        return redirect()->route('penyerapan.index')->with('success', 'Penyerapan berhasil dihapus!');
    }
}
