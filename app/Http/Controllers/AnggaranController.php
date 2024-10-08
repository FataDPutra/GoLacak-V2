<?php

namespace App\Http\Controllers;

use App\Models\Anggaran;
use App\Models\Kegiatan;
use App\Models\Program;
use App\Models\Subprogram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggaranController extends Controller
{
    public function index()
    {
        // Ambil semua program, subprogram, kegiatan, dan anggaran
        $programs = Program::all();
        $subprograms = Subprogram::all();
        $kegiatans = Kegiatan::all();
        $anggarans = Anggaran::with('program', 'subprogram', 'kegiatan')->get();

        // Kirim data ke view Inertia
        return Inertia::render('Anggaran/Index', [
            'anggarans' => $anggarans,
            'programs' => $programs,
            'subprograms' => $subprograms,
            'kegiatans' => $kegiatans,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'program_id' => 'required|uuid|exists:programs,id',
            'sub_program_id' => 'required|uuid|exists:subprograms,id',
            'kegiatan_id' => 'required|uuid|exists:kegiatans,id',
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
        ]);

        Anggaran::create([
            'program_id' => $request->program_id,
            'sub_program_id' => $request->sub_program_id,
            'kegiatan_id' => $request->kegiatan_id,
            'anggaran_murni' => $request->anggaran_murni,
            'pergeseran' => $request->pergeseran ?? 0,
            'perubahan' => $request->perubahan ?? 0,
        ]);

        return redirect()->back()->with('success', 'Anggaran berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'program_id' => 'required|uuid|exists:programs,id',
            'sub_program_id' => 'required|uuid|exists:subprograms,id',
            'kegiatan_id' => 'required|uuid|exists:kegiatans,id',
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
        ]);

        $anggaran = Anggaran::findOrFail($id);
        $anggaran->update([
            'program_id' => $request->program_id,
            'sub_program_id' => $request->sub_program_id,
            'kegiatan_id' => $request->kegiatan_id,
            'anggaran_murni' => $request->anggaran_murni,
            'pergeseran' => $request->pergeseran ?? 0,
            'perubahan' => $request->perubahan ?? 0,
        ]);

        return redirect()->back()->with('success', 'Anggaran berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $anggaran = Anggaran::findOrFail($id);
        $anggaran->delete();

        return redirect()->back()->with('success', 'Anggaran berhasil dihapus!');
    }
}
