<?php
// app/Http/Controllers/Auth/Register.php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class Register extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        // Hanya admin yang bisa mengakses halaman ini
        if (Auth::user()->role !== 'admin') {
            return redirect('dashboard')->with('error', 'Anda tidak memiliki akses untuk melakukan registrasi.');
        }

        // Ambil data bidang dan roles
        $bidangs = Bidang::all();
        $roles = ['admin', 'user'];

        return Inertia::render('Register/Register', [
            'bidangs' => $bidangs,
            'roles' => $roles,
        ]);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        // Hanya admin yang bisa melakukan registrasi
        if (Auth::user()->role !== 'admin') {
            return redirect('dashboard')->with('error', 'Anda tidak memiliki akses untuk melakukan registrasi.');
        }

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,user',
            'bidang_id' => 'nullable|exists:bidang,id', // Bidang hanya diperlukan untuk role user
        ]);

        // Buat user baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'bidang_id' => $request->role === 'user' ? $request->bidang_id : null,
        ]);

        return redirect()->route('dashboard')->with('success', 'User berhasil diregistrasi.');
    }
}
