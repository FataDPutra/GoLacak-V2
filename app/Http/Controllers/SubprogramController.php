<?php

namespace App\Http\Controllers;

use App\Models\Program;
use App\Models\Rekening;
use App\Models\Subprogram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubprogramController extends Controller
{
    public function index()
    {
        $subprograms = Subprogram::with('program', 'rekening')->get();
        $programs = Program::all();
        return Inertia::render('Subprogram/Index', ['subprograms' => $subprograms, 'programs' => $programs]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_subprogram' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
        ]);

        try {
            Subprogram::create([
                'nama_subprogram' => $request->nama_subprogram,
                'program_id' => $request->program_id,
            ]);

            return redirect()->back()->with('success', 'Subprogram berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_subprogram' => 'required|string',
            'program_id' => 'required|uuid|exists:programs,id',
        ]);

        try {
            $subprogram = Subprogram::findOrFail($id);
            $subprogram->update([
                'nama_subprogram' => $request->nama_subprogram,
                'program_id' => $request->program_id,
            ]);

            return redirect()->back()->with('success', 'Subprogram berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $subprogram = Subprogram::findOrFail($id);
            $subprogram->delete();

            return redirect()->back()->with('success', 'Subprogram berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error: ' . $e->getMessage());
        }
    }
}
