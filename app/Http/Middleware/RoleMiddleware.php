<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // Pastikan pengguna sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu.');
        }

        // Dapatkan role user saat ini
        $user = Auth::user();

        // Jika user memiliki role yang sesuai atau role admin, lanjutkan
        if ($user->role === $role || $user->role === 'user' || $user->role === 'admin') {
            return $next($request);
        }

        // Jika role tidak sesuai, arahkan kembali ke dashboard atau halaman lain yang ditentukan
        return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki akses ke halaman ini.');
    }
}
