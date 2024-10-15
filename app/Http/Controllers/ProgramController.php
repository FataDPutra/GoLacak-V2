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
    // Ambil program beserta rekening, diurutkan berdasarkan updated_at atau created_at
    $programs = Program::with('rekening')
                        ->orderBy('updated_at', 'DESC') // Mengurutkan berdasarkan waktu update terakhir
                        ->get();

    return Inertia::render('Program/Index', [
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
            'nama_program' => 'required|string',
            'no_rekening' => 'required|string',
            'target' => 'nullable|integer',
            'satuan' => 'nullable|string',
            'indikator_kinerja' => 'nullable|string',
        ]);

        try {
            // Find or create the rekening based on no_rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Ensure rekening ID is a valid UUID
            if (!$rekening->id || !is_string($rekening->id)) {
                throw new \Exception('Rekening ID tidak valid');
            }

            // Create the program with rekening_id and the new fields
            Program::create([
                'nama_program' => $request->nama_program,
                'rekening_id' => $rekening->id,
                'target' => $request->target,
                'satuan' => $request->satuan,
                'indikator_kinerja' => $request->indikator_kinerja,
            ]);

            return redirect()->back()->with('success', 'Program dan Rekening berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        // Add validation for the new fields
        $request->validate([
            'nama_program' => 'required|string',
            'no_rekening' => 'required|string',
            'target' => 'nullable|integer',
            'satuan' => 'nullable|string',
            'indikator_kinerja' => 'nullable|string',
        ]);

        try {
            // Find the program by ID
            $program = Program::findOrFail($id);

            // Find or create the rekening based on no_rekening
            $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

            // Update the program with the new rekening_id and fields
            $program->update([
                'nama_program' => $request->nama_program,
                'rekening_id' => $rekening->id,
                'target' => $request->target,
                'satuan' => $request->satuan,
                'indikator_kinerja' => $request->indikator_kinerja,
            ]);

            return redirect()->back()->with('success', 'Program berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            // Find the program by ID and delete it
            $program = Program::findOrFail($id);
            $program->delete();

            return redirect()->back()->with('success', 'Program berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }
}
