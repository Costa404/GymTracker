<?php

// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class AuthorizeAccess
// {
//     public function handle(Request $request, Closure $next)
//     {
//         if (Auth::check()) {
//             $lastActivity = session('last_activity');

//             // Se passou mais de 3 horas, pede Face ID novamente
//             if ($lastActivity && now()->diffInMinutes($lastActivity) > 180) {
//                 Auth::logout();
//                 session()->flush();
//                 return redirect()->route('pin.show');
//             }

//             // Atualiza o timestamp de atividade
//             session(['last_activity' => now(), 'pin_verified' => true]);
//             return $next($request);
//         }

//         if (!$request->session()->get('pin_verified') && !$request->is('login-pin*')) {
//             return redirect()->route('pin.show');
//         }

//         return $next($request);
//     }
// }



namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthorizeAccess
{
    public function handle(Request $request, Closure $next)
    {
        // Se o utilizador NÃO estiver logado via Face ID (Auth)
        // E também NÃO tiver o PIN verificado na sessão atual
        if (!Auth::check() && !$request->session()->get('pin_verified')) {

            // Força a limpeza por segurança e redireciona para o bloqueio
            Auth::logout();
            $request->session()->flush();

            return redirect()->route('pin.show');
        }

        // Se passar na verificação, o Laravel renova o tempo da sessão automaticamente
        return $next($request);
    }
}
