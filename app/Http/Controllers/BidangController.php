<?php

namespace App\Http\Controllers;

use App\Models\Bidang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BidangController extends Controller
{
    // Menampilkan semua bidang
    public function index()
    {
        $bidangs = Bidang::all();

        return Inertia::render('Bidang/Index', [
            'bidangs' => $bidangs,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    // Menyimpan bidang baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_bidang' => 'required|string|max:255',
        ]);

        try {
            Bidang::create([
                'nama_bidang' => $request->nama_bidang,
            ]);

            return redirect()->route('bidang.index')->with('success', 'Bidang berhasil dibuat!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    // Mengedit bidang yang ada
    public function edit($id)
    {
        $bidang = Bidang::findOrFail($id);

        return Inertia::render('Bidang/Edit', [
            'bidang' => $bidang,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    // Memperbarui bidang
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_bidang' => 'required|string|max:255',
        ]);

        try {
            $bidang = Bidang::findOrFail($id);
            $bidang->update([
                'nama_bidang' => $request->nama_bidang,
            ]);

            return redirect()->route('bidang.index')->with('success', 'Bidang berhasil diperbarui!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    // Menghapus bidang
    public function destroy($id)
    {
        try {
            $bidang = Bidang::findOrFail($id);
            $bidang->delete();

            return redirect()->route('bidang.index')->with('success', 'Bidang berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
