<?php

namespace App\Http\Controllers;

use App\Models\Anggaran;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggaranController extends Controller
{
public function index()
{
    $anggarans = Anggaran::with('kegiatan')->get();
    $kegiatans = Kegiatan::all(); // Fetch all kegiatan for the dropdown

    return Inertia::render('Anggaran/Index', [
        'anggarans' => $anggarans,
        'kegiatans' => $kegiatans,
    ]);
}


    public function create()
    {
        $kegiatans = Kegiatan::all(); // Ambil semua kegiatan untuk dropdown
        return Inertia::render('Anggaran/Create', [
            'kegiatans' => $kegiatans,
        ]);
    }

    public function store(Request $request)
    {
    $request->validate([
        'anggaran_murni' => 'required|numeric',
        'pergeseran' => 'nullable|numeric',
        'perubahan' => 'nullable|numeric',
        'kegiatan_id' => 'required|uuid|exists:kegiatan,id',
    ]);
    
    Anggaran::create([
        'anggaran_murni' => $request->anggaran_murni,
        'pergeseran' => $request->pergeseran ?? 0, // Default to 0 if not provided
        'perubahan' => $request->perubahan ?? 0, // Default to 0 if not provided
        'kegiatan_id' => $request->kegiatan_id,
    ]);

        return redirect()->route('anggaran.index')->with('success', 'Anggaran berhasil ditambahkan!');
    }

    public function edit($id)
    {
        $anggaran = Anggaran::with('kegiatan')->findOrFail($id);
        $kegiatans = Kegiatan::all(); // Ambil semua kegiatan untuk dropdown
        return Inertia::render('Anggaran/Edit', [
            'anggaran' => $anggaran,
            'kegiatans' => $kegiatans,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'anggaran_murni' => 'required|numeric',
            'pergeseran' => 'nullable|numeric',
            'perubahan' => 'nullable|numeric',
            'kegiatan_id' => 'required|uuid|exists:kegiatan,id',
        ]);

        $anggaran = Anggaran::findOrFail($id);
        $anggaran->update([
            'anggaran_murni' => $request->anggaran_murni,
            'pergeseran' => $request->pergeseran ?? 0,
            'perubahan' => $request->perubahan ?? 0,
            'kegiatan_id' => $request->kegiatan_id,
        ]);

        return redirect()->route('anggaran.index')->with('success', 'Anggaran berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $anggaran = Anggaran::findOrFail($id);
        $anggaran->delete();

        return redirect()->route('anggaran.index')->with('success', 'Anggaran berhasil dihapus!');
    }
}
