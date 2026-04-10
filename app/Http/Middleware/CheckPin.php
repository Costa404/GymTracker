<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPin
{
    public function handle(Request $request, Closure $next)
    {
        // Se a rota atual não for a de login e o PIN não estiver na sessão, bloqueia
        if (!$request->session()->get('pin_verified') && !$request->is('login-pin*')) {
            return redirect()->route('pin.show');
        }

        // ALTERAÇÃO AQUI: Passa o $request e não o $next
        return $next($request);
    }
}
