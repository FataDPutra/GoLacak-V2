<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Ambil semua user dengan relasi ke bidang
        $users = User::with('bidang')->get();

        // Ambil semua bidang untuk dropdown
        $bidangList = Bidang::all();

        // Kirim data ke view Inertia
        return Inertia::render('User/Index', [
            'users' => $users,
            'bidangList' => $bidangList, // Kirim data bidang ke view
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    // Simpan User baru
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|string|in:user,admin',
            'bidang_id' => 'required|uuid|exists:bidang,id', // Validasi bidang_id
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'bidang_id' => $request->bidang_id, // Simpan bidang_id
        ]);

        return redirect()->back()->with('success', 'User berhasil dibuat!');
    }

    // Update User
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|string|in:user,admin',
            'bidang_id' => 'required|uuid|exists:bidang,id', // Validasi bidang_id
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'bidang_id' => $request->bidang_id, // Update bidang_id
        ]);

        return redirect()->back()->with('success', 'User berhasil diperbarui!');
    }

    // ...

public function destroy(Request $request, $id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return redirect()->back()->with('success', 'User  berhasil dihapus!');
}
}

