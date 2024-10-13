<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Bidang;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        // Pastikan hanya admin yang bisa mengakses halaman ini
        if (Auth::user()->role !== 'admin') {
            return redirect('dashboard')->with('error', 'Anda tidak memiliki akses untuk melakukan registrasi.');
        }

        // Ambil data bidang dan roles
        $bidangs = Bidang::all();
        $roles = ['admin', 'user'];

        return Inertia::render('Auth/Register', [
            'bidangs' => $bidangs,
            'roles' => $roles,
        ]);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        // Hanya admin yang bisa melakukan registrasi
        if (Auth::user()->role !== 'admin') {
            abort(403, 'Anda tidak memiliki akses untuk melakukan registrasi.');
        }

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
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
            'bidang_id' => $request->role === 'user' ? $request->bidang_id : null, // Set bidang untuk user
        ]);

        event(new Registered($user));

        return redirect(RouteServiceProvider::HOME)->with('success', 'User berhasil diregistrasi.');
    }
}
