<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Subprogram;
use App\Models\Program;
use App\Models\Rekening;
use App\Models\Bidang; // Import Bidang model
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index()
    {
        // Ambil kegiatan dengan program, subprogram, rekening, dan bidang
        $kegiatans = Kegiatan::with('program', 'subprogram.program', 'rekening', 'bidang')->get();
        
        // Ambil subprogram, program, rekening, dan bidang untuk dropdown
        $subprograms = Subprogram::with('program')->get();
        $programs = Program::with('subprograms')->get();
        $rekenings = Rekening::all();
        $bidangs = Bidang::all(); // Ambil semua bidang untuk dropdown

        // Kirim data ke view Inertia
        return Inertia::render('Kegiatan/Index', [
            'kegiatans' => $kegiatans,
            'subprograms' => $subprograms,
            'programs' => $programs,
            'rekenings' => $rekenings,
            'bidangs' => $bidangs, // Kirim data bidang
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kegiatan' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
            'subprogram_id' => 'required|uuid|exists:subprograms,id',
            'no_rekening' => 'required|string',
            'bidang_id' => 'required|uuid|exists:bidang,id', // Validasi bidang_id
        ]);

        try {
            // Cari atau buat rekening berdasarkan nomor rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Buat kegiatan baru
            Kegiatan::create([
                'nama_kegiatan' => $request->nama_kegiatan,
                'program_id' => $request->program_id,
                'subprogram_id' => $request->subprogram_id,
                'rekening_id' => $rekening->id,
                'bidang_id' => $request->bidang_id, // Simpan bidang_id
            ]);

            return redirect()->back()->with('success', 'Kegiatan berhasil dibuat!');
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
            'bidang_id' => 'required|uuid|exists:bidang,id', // Validasi bidang_id
        ]);

        try {
            // Temukan kegiatan dan update datanya
            $kegiatan = Kegiatan::findOrFail($id);
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            $kegiatan->update([
                'nama_kegiatan' => $request->nama_kegiatan,
                'program_id' => $request->program_id,
                'subprogram_id' => $request->subprogram_id,
                'rekening_id' => $rekening->id,
                'bidang_id' => $request->bidang_id, // Update bidang_id
            ]);

            return redirect()->back()->with('success', 'Kegiatan berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        // Temukan kegiatan dan hapus
        $kegiatan = Kegiatan::findOrFail($id);
        $kegiatan->delete();

        return redirect()->back()->with('success', 'Kegiatan berhasil dihapus!');
    }
}
