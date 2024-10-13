<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        // Cek apakah user memiliki role admin atau role yang diberikan
        if (auth()->check() && (auth()->user()->role === $role || auth()->user()->role === 'admin')) {
            return $next($request);
        }

        return redirect()->route('dashboard')->with('error', 'You do not have access to this resource');
    }
}
