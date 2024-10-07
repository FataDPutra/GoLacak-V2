<?php

namespace App\Http\Controllers;

use App\Models\Anggaran;
use App\Models\Kegiatan; // Pastikan model Kegiatan diimport
use App\Models\Program; // Import model Program
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggaranController extends Controller
{
public function index()
{
    // Ambil anggaran beserta kegiatan yang terkait
    $anggarans = Anggaran::with('kegiatan')->get();

    // Ambil semua program dengan subprogram dan kegiatan yang terkait
    $programs = Program::with('subprograms.kegiatan')->get();

    return Inertia::render('Anggaran/Index', [
        'anggarans' => $anggarans,
        'programs' => $programs, // Kirim data program
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
            'kegiatan_id' => 'required|uuid|exists:kegiatan,id',
            'subprogram_id' => 'required|uuid|exists:subprograms,id', // Validasi subprogram
            'program_id' => 'required|uuid|exists:programs,id', // Validasi program
        ]);

        try {
            Anggaran::create([
                'anggaran_murni' => $request->anggaran_murni,
                'pergeseran' => $request->pergeseran ?? 0,
                'perubahan' => $request->perubahan ?? 0,
                'kegiatan_id' => $request->kegiatan_id,
                'subprogram_id' => $request->subprogram_id, // Tambahkan subprogram_id
                'program_id' => $request->program_id, // Tambahkan program_id
            ]);

            return redirect()->back()->with('success', 'Anggaran berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
            'kegiatan_id' => 'required|uuid|exists:kegiatan,id',
            'subprogram_id' => 'required|uuid|exists:subprograms,id', // Validasi subprogram
            'program_id' => 'required|uuid|exists:programs,id', // Validasi program
        ]);

        try {
            $anggaran = Anggaran::findOrFail($id);

            // Update anggaran dengan data baru
            $anggaran->update([
                'anggaran_murni' => $request->anggaran_murni,
                'pergeseran' => $request->pergeseran ?? 0,
                'perubahan' => $request->perubahan ?? 0,
                'kegiatan_id' => $request->kegiatan_id,
                'subprogram_id' => $request->subprogram_id, // Update subprogram_id
                'program_id' => $request->program_id, // Update program_id
            ]);

            return redirect()->back()->with('success', 'Anggaran berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $anggaran = Anggaran::findOrFail($id);
            $anggaran->delete();

            return redirect()->back()->with('success', 'Anggaran berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
