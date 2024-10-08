<?php

namespace App\Http\Controllers;

use App\Models\Anggaran;
use App\Models\Kegiatan;
use App\Models\Program;
use App\Models\Subprogram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggaranController extends Controller
{
public function index()
{
    // Ambil semua program, subprogram, kegiatan, anggaran, dan rekening
    $programs = Program::with('subprograms')->get(); 
    $subprograms = Subprogram::with('kegiatans')->get();
    $kegiatans = Kegiatan::with(['subprogram.program', 'rekening'])->get(); // Tambahkan relasi rekening
    $anggarans = Anggaran::with(['program', 'subprogram', 'kegiatan.rekening'])->get(); // Tambahkan relasi rekening

    // Kirim data ke view Inertia
    return Inertia::render('Anggaran/Index', [
        'anggarans' => $anggarans,
        'programs' => $programs,
        'subprograms' => $subprograms,
        'kegiatans' => $kegiatans,
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'program_id' => 'required|uuid|exists:programs,id',
            'sub_program_id' => 'required|uuid|exists:subprograms,id',
            'kegiatan_id' => 'required|uuid|exists:kegiatan,id', // Ubah ke 'kegiatan'
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
        ]);

        Anggaran::create([
            'program_id' => $request->program_id,
            'sub_program_id' => $request->sub_program_id,
            'kegiatan_id' => $request->kegiatan_id,
            'anggaran_murni' => $request->anggaran_murni,
            'pergeseran' => $request->pergeseran ?? 0,
            'perubahan' => $request->perubahan ?? 0,
        ]);

        return redirect()->back()->with('success', 'Anggaran berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'program_id' => 'required|uuid|exists:programs,id',
            'sub_program_id' => 'required|uuid|exists:subprograms,id',
            'kegiatan_id' => 'required|uuid|exists:kegiatan,id', // Ubah ke 'kegiatan'
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
        ]);

        $anggaran = Anggaran::findOrFail($id);
        $anggaran->update([
            'program_id' => $request->program_id,
            'sub_program_id' => $request->sub_program_id,
            'kegiatan_id' => $request->kegiatan_id,
            'anggaran_murni' => $request->anggaran_murni,
            'pergeseran' => $request->pergeseran ?? 0,
            'perubahan' => $request->perubahan ?? 0,
        ]);

        return redirect()->back()->with('success', 'Anggaran berhasil diperbarui!');
    }


public function destroy($id)
{
    try {
        // Cari anggaran berdasarkan ID
        $anggaran = Anggaran::findOrFail($id);
        
        // Hapus anggaran
        $anggaran->delete();

        // Berikan respons sukses setelah penghapusan
        return redirect()->back()->with('success', 'Anggaran berhasil dihapus!');
    } catch (\Exception $e) {
        // Berikan respons error jika ada masalah
        return redirect()->back()->with('error', 'Terjadi kesalahan saat menghapus anggaran: ' . $e->getMessage());
    }
}

}
