<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Subprogram;
use App\Models\Program;
use App\Models\Rekening;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
public function index()
{
    // Mengambil data kegiatan, subprogram, program, dan rekening
    $kegiatans = Kegiatan::with('subprogram.program', 'rekening')->get();
    $subprograms = Subprogram::with('program')->get(); // Untuk dropdown subprogram
    $programs = Program::all(); // Untuk dropdown program
    $rekenings = Rekening::all(); // Untuk dropdown rekening

    return Inertia::render('Kegiatan/Index', [
        'kegiatans' => $kegiatans,
        'subprograms' => $subprograms,
        'programs' => $programs,
        'rekenings' => $rekenings, // Kirim data rekening ke view
    ]);
}
public function store(Request $request)
{
        try {
            // Cek atau buat rekening berdasarkan no_rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Simpan subprogram
            Kegiatan::create([
                'nama_kegiatan' => $request->nama_kegiatan,
                'program_id' => $request->program_id,
                'subprogram_id' => $request->subprogram_id,
                'rekening_id' => $rekening->id, // Hubungkan dengan rekening yang valid
            ]);

            return redirect()->back()->with('success', 'Subprogram berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
public function update(Request $request, $id)
{
    $request->validate([
        'nama_kegiatan' => 'required|string',
        'program_id' => 'required|uuid|exists:programs,id',
        'subprogram_id' => 'required|uuid|exists:subprograms,id',
        'no_rekening' => 'required|string',
    ]);

    try {
        $kegiatan = Kegiatan::findOrFail($id);

        // Cek atau buat rekening berdasarkan no_rekening
        $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

        // Update subprogram dengan data baru
        $kegiatan->update([
            'nama_kegiatan' => $request->nama_kegiatan,
            'program_id' => $request->program_id,
            'subprogram_id' => $request->subprogram_id,
            'rekening_id' => $rekening->id,
        ]);

        return redirect()->back()->with('success', 'Kegiatan berhasil diperbarui!');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
    }
}


    public function destroy($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        $kegiatan->delete();

        return redirect()->back()->with('success', 'Kegiatan berhasil dihapus!');
    }
}
