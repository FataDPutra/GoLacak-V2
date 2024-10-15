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
    // Menampilkan halaman index kegiatan
    public function index()
    {
        // Ambil kegiatan beserta program, subprogram, dan rekening, diurutkan berdasarkan updated_at atau created_at
        $kegiatans = Kegiatan::with('program', 'subprogram.program', 'rekening')
                          ->orderBy('updated_at', 'DESC') // Mengurutkan berdasarkan waktu update terakhir
                          ->get();
        
        // Ambil subprogram, program, dan rekening untuk dropdown
        $subprograms = Subprogram::with('program')->get();
        $programs = Program::with('subprograms')->get();
        $rekenings = Rekening::all();

        // Kirim data ke view Inertia
        return Inertia::render('Kegiatan/Index', [
            'kegiatans' => $kegiatans,
            'subprograms' => $subprograms,
            'programs' => $programs,
            'rekenings' => $rekenings,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    // Menyimpan kegiatan baru
    public function store(Request $request)
    {
        // Validasi input, termasuk field baru
        $request->validate([
            'nama_kegiatan' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
            'subprogram_id' => 'required|uuid|exists:subprograms,id',
            'no_rekening' => 'required|string',
            'target' => 'nullable|integer',
            'satuan' => 'nullable|string',
            'indikator_kinerja' => 'nullable|string',
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
                'target' => $request->target,
                'satuan' => $request->satuan,
                'indikator_kinerja' => $request->indikator_kinerja,
            ]);

            return redirect()->back()->with('success', 'Kegiatan berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    // Memperbarui kegiatan yang sudah ada
    public function update(Request $request, $id)
    {
        // Validasi input, termasuk field baru
        $request->validate([
            'nama_kegiatan' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
            'subprogram_id' => 'required|uuid|exists:subprograms,id',
            'no_rekening' => 'required|string',
            'target' => 'nullable|integer',
            'satuan' => 'nullable|string',
            'indikator_kinerja' => 'nullable|string',
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
                'target' => $request->target,
                'satuan' => $request->satuan,
                'indikator_kinerja' => $request->indikator_kinerja,
            ]);

            return redirect()->back()->with('success', 'Kegiatan berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    // Menghapus kegiatan
    public function destroy($id)
    {
        try {
            // Temukan kegiatan dan hapus
            $kegiatan = Kegiatan::findOrFail($id);
            $kegiatan->delete();

            return redirect()->back()->with('success', 'Kegiatan berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
