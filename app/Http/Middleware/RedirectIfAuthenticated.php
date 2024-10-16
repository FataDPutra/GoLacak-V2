<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $user = Auth::guard($guard)->user();

                // Cek role pengguna
                if ($user->role === 'admin') {
                    return redirect(RouteServiceProvider::HOME);  // Redirect untuk admin
                } elseif ($user->role === 'user') {
                    return redirect(RouteServiceProvider::USER);  // Redirect untuk user
                }
            }
        }

        return $next($request);
    }
}
