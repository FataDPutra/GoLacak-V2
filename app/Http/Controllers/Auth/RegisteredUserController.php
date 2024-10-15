<?php

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use App\Models\Bidang;
// use App\Providers\RouteServiceProvider;
// use Illuminate\Auth\Events\Registered;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\Rules;
// use Inertia\Inertia;
// use Inertia\Response;

// class RegisteredUserController extends Controller
// {
//     /**
//      * Display the registration view.
//      */


//      public function create()
// {
//     $bidangs = Bidang::all(); // Ambil data bidang dari database
//     $roles = ['user', 'admin']; // Role yang tersedia

//     return Inertia::render('Auth/Register', [
//         'bidangs' => $bidangs,
//         'roles' => $roles,
//     ]);
// }
//     /**
//      * Handle an incoming registration request.
//      */

//      public function store(Request $request)
// {
//     $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|string|email|max:255|unique:users',
//         'password' => ['required', 'confirmed', Rules\Password::defaults()],
//         'role' => 'required|string|in:user,admin',
//         'bidang_id' => 'nullable|exists:bidang,id',
//     ]);

//     $user = new User([
//         'name' => $request->name,
//         'email' => $request->email,
//         'password' => Hash::make($request->password),
//         'role' => $request->role,
//         'bidang_id' => $request->bidang_id,
//     ]);

//     $user->save();

//     return redirect()->route('user.index')->with('success', 'Pengguna berhasil ditambahkan!');
// }

// }
