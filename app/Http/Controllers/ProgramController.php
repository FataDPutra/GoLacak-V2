<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Rekening;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::with('rekening')->get();
        return Inertia::render('Program/Index', ['programs' => $programs]);
    }

public function store(Request $request)
{
    $request->validate([
        'nama_program' => 'required|string',
        'no_rekening' => 'required|string',
    ]);

    try {
        // Buat rekening baru atau ambil yang sudah ada
        $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

        // Pastikan rekening ID adalah UUID yang valid
        if (!$rekening->id || !is_string($rekening->id)) {
            throw new \Exception('Rekening ID tidak valid');
        }

        // Simpan program dengan rekening_id yang valid
        Program::create([
            'nama_program' => $request->nama_program,
            'rekening_id' => $rekening->id, // Gunakan rekening_id yang valid dari rekening
        ]);

        return redirect()->back()->with('success', 'Program dan Rekening berhasil dibuat!');
    } catch (\Exception $e) {
        // \Log::error('Error saat menyimpan program: ' . $e->getMessage());
        return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
    }
}

public function update(Request $request, $id)
{
    // Validasi input
    $request->validate([
        'nama_program' => 'required|string',
        'no_rekening' => 'required|string',
    ]);

    try {
        // Temukan program berdasarkan ID
        $program = Program::findOrFail($id);

        // Temukan atau buat rekening baru berdasarkan no_rekening
        $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

        // Update program dengan rekening_id yang baru atau ditemukan
        $program->update([
            'nama_program' => $request->nama_program,
            'rekening_id' => $rekening->id,
        ]);

        return redirect()->back()->with('success', 'Program berhasil diperbarui!');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
    }
}
public function destroy($id)
{
    try {
        // Temukan program berdasarkan ID dan hapus
        $program = Program::findOrFail($id);
        $program->delete();

        return redirect()->back()->with('success', 'Program berhasil dihapus!');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
    }
}



}
