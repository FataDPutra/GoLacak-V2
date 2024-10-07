<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\Subprogram;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    public function index()
    {
        $kegiatans = Kegiatan::with('subprogram.program')->get();
        $subprograms = Subprogram::with('program')->get(); // Untuk dropdown
        $programs = Program::all(); // Mengambil program untuk dropdown
        return Inertia::render('Kegiatan/Index', ['kegiatans' => $kegiatans, 'subprograms' => $subprograms, 'programs' => $programs]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kegiatan' => 'required|string',
            'subprogram_id' => 'required|string|exists:subprograms,id',
            'program_id' => 'required|string|exists:programs,id',
        ]);

        Kegiatan::create($request->only(['nama_kegiatan', 'subprogram_id', 'program_id']));

        return redirect()->back()->with('success', 'Kegiatan berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_kegiatan' => 'required|string',
            'subprogram_id' => 'required|string|exists:subprograms,id',
            'program_id' => 'required|string|exists:programs,id',
        ]);

        $kegiatan = Kegiatan::findOrFail($id);
        $kegiatan->update($request->only(['nama_kegiatan', 'subprogram_id', 'program_id']));

        return redirect()->back()->with('success', 'Kegiatan berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        $kegiatan->delete();

        return redirect()->back()->with('success', 'Kegiatan berhasil dihapus!');
    }
}
