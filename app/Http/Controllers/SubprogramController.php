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
        // Ambil subprogram beserta program dan rekening, diurutkan berdasarkan updated_at atau created_at
        $subprograms = Subprogram::with('program', 'rekening')
                                 ->orderBy('updated_at', 'DESC') // Mengurutkan berdasarkan waktu update terakhir
                                 ->get();

        // Ambil semua program untuk dropdown
        $programs = Program::all();

        return Inertia::render('Subprogram/Index', [
            'subprograms' => $subprograms,
            'programs' => $programs,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Add validation for the new fields
        $request->validate([
            'nama_subprogram' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
            'no_rekening' => 'required|string',
            'target' => 'nullable|integer',
            'satuan' => 'nullable|string',
            'indikator_kinerja' => 'nullable|string',
        ]);

        try {
            // Check or create rekening based on no_rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Save subprogram
            Subprogram::create([
                'nama_subprogram' => $request->nama_subprogram,
                'program_id' => $request->program_id,
                'rekening_id' => $rekening->id, // Link to valid rekening
                'target' => $request->target,
                'satuan' => $request->satuan,
                'indikator_kinerja' => $request->indikator_kinerja, // Ensure this matches the database column
            ]);

            return redirect()->back()->with('success', 'Subprogram berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        // Add validation for the new fields
        $request->validate([
            'nama_subprogram' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
            'no_rekening' => 'required|string',
            'target' => 'nullable|integer',
            'satuan' => 'nullable|string',
            'indikator_kinerja' => 'nullable|string',
        ]);

        try {
            // Find the subprogram by ID
            $subprogram = Subprogram::findOrFail($id);

            // Check or create rekening based on no_rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Update subprogram with new data
            $subprogram->update([
                'nama_subprogram' => $request->nama_subprogram,
                'program_id' => $request->program_id,
                'rekening_id' => $rekening->id,
                'target' => $request->target,
                'satuan' => $request->satuan,
                'indikator_kinerja' => $request->indikator_kinerja, // Ensure this matches the database column
            ]);

            return redirect()->back()->with('success', 'Subprogram berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            // Find subprogram by ID and delete it
            $subprogram = Subprogram::findOrFail($id);
            $subprogram->delete();

            return redirect()->back()->with('success', 'Subprogram berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
