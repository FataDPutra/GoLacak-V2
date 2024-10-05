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
        $kegiatans = Kegiatan::with(['subprogram', 'program', 'rekening'])->get();
        $subprograms = Subprogram::all();
        $rekens = Rekening::all();
        return Inertia::render('Kegiatan/Index', [
            'kegiatans' => $kegiatans,
            'subprograms' => $subprograms,
            'rekens' => $rekens,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'subprogram_id' => 'required|uuid|exists:subprogram,id',
            'program_id' => 'required|uuid|exists:program,id',
            'rekening_id' => 'required|uuid|exists:rekening,id',
        ]);

        Kegiatan::create([
            'nama_kegiatan' => $request->nama,
            'subprogram_id' => $request->subprogram_id,
            'program_id' => $request->program_id,
            'rekening_id' => $request->rekening_id,
        ]);

        return redirect()->route('kegiatan.index')->with('success', 'Kegiatan created successfully.');
    }
}
