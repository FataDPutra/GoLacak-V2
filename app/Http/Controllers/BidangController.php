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
        if (auth()->user()->role === 'admin') {
            // Jika admin, tampilkan semua bidang
            $bidangs = Bidang::all();
            return Inertia::render('Bidang/Index', [
                'bidangs' => $bidangs,
                'auth' => [
                    'user' => auth()->user(),
                ],
            ]);
        } elseif (auth()->user()->role === 'user') {
            // Jika user, tampilkan bidang milik mereka dan arahkan ke Page/User/Bidang
            $bidangs = Bidang::where('id', auth()->user()->bidang_id)->get();
            return Inertia::render('Users/Bidang/Index', [
                'bidangs' => $bidangs,
                'auth' => [
                    'user' => auth()->user(),
                ],
            ]);
        }

        // Jika role lain, arahkan ke dashboard
        return redirect('/dashboard');
    }

    // Menyimpan bidang baru (hanya admin yang bisa menyimpan)
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

    // Mengedit bidang (hanya admin yang bisa mengedit)
    public function edit($id)
    {
        if (auth()->user()->role !== 'admin') {
            return redirect()->route('bidang.index')->with('error', 'Anda tidak memiliki akses untuk mengedit.');
        }

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
        if (auth()->user()->role !== 'admin') {
            return redirect()->route('bidang.index')->with('error', 'Anda tidak memiliki akses untuk memperbarui.');
        }

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
        if (auth()->user()->role !== 'admin') {
            return redirect()->route('bidang.index')->with('error', 'Anda tidak memiliki akses untuk menghapus.');
        }

        try {
            $bidang = Bidang::findOrFail($id);
            $bidang->delete();

            return redirect()->route('bidang.index')->with('success', 'Bidang berhasil dihapus!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
