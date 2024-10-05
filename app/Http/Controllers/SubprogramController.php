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
        $subprograms = Subprogram::with(['program', 'rekening'])->get();
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
            'program_id' => 'required|exists:programs,id',
            'no_rekening' => 'required|string',
        ]);

        // Cek apakah ada rekening yang sama
        $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

        Subprogram::create([
            'nama_subprogram' => $request->nama_subprogram,
            'program_id' => $request->program_id,
            'rekening_id' => $rekening->id,
        ]);

        return redirect()->back()->with('success', 'Subprogram created successfully');
    }

    public function edit($id)
    {
        $subprogram = Subprogram::with(['program', 'rekening'])->findOrFail($id);
        $programs = Program::all();
        return Inertia::render('Subprogram/Edit', [
            'subprogram' => $subprogram,
            'programs' => $programs,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_subprogram' => 'required|string',
            'program_id' => 'required|exists:programs,id',
            'no_rekening' => 'required|string',
        ]);

        $subprogram = Subprogram::findOrFail($id);

        // Temukan atau buat rekening baru berdasarkan no_rekening
        $rekening = Rekening::firstOrCreate(['no_rekening' => $request->no_rekening]);

        // Update subprogram
        $subprogram->update([
            'nama_subprogram' => $request->nama_subprogram,
            'program_id' => $request->program_id,
            'rekening_id' => $rekening->id,
        ]);

        return redirect()->back()->with('success', 'Subprogram updated successfully');
    }

    public function destroy($id)
    {
        $subprogram = Subprogram::findOrFail($id);
        $subprogram->delete();

        return redirect()->back()->with('success', 'Subprogram deleted successfully');
    }
}
