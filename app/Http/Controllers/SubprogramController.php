<?php

namespace App\Http\Controllers;

use App\Models\Subprogram;
use App\Models\Program;
use App\Models\Rekening;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubprogramController extends Controller
{
    public function index()
    {
        // Ambil subprograms beserta program dan rekening yang terkait
        $subprograms = Subprogram::with('program', 'rekening')->get();
        // Ambil semua program untuk dropdown
        $programs = Program::all();

        return Inertia::render('Subprogram/Index', [
            'subprograms' => $subprograms,
            'programs' => $programs,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_subprogram' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
            'no_rekening' => 'required|string',
        ]);

        try {
            // Cek atau buat rekening berdasarkan no_rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Simpan subprogram
            Subprogram::create([
                'nama_subprogram' => $request->nama_subprogram,
                'program_id' => $request->program_id,
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
        'nama_subprogram' => 'required|string',
        'program_id' => 'required|uuid|exists:programs,id',
        'no_rekening' => 'required|string',
    ]);

    try {
        $subprogram = Subprogram::findOrFail($id);

        // Cek atau buat rekening berdasarkan no_rekening
        $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

        // Update subprogram dengan data baru
        $subprogram->update([
            'nama_subprogram' => $request->nama_subprogram,
            'program_id' => $request->program_id,
            'rekening_id' => $rekening->id,
        ]);

        return redirect()->back()->with('success', 'Subprogram berhasil diperbarui!');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
    }
}


    public function destroy($id)
    {
        try {
            $subprogram = Subprogram::findOrFail($id);
            $subprogram->delete();

            return redirect()->back()->with('success', 'Subprogram berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
