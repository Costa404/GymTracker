<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Verificação de PIN para a API.
     */
    public function verifyPin(Request $request)
    {
        if ($request->input('pin') === config('app.pin_code')) {
            // Em SPA/API, usamos o login por sessão ou token
            $user = User::first();
            Auth::login($user, true);

            // Não fazemos redirect! Enviamos sinal de OK.
            return response()->json([
                'authenticated' => true,
                'user' => $user
            ], 200);
        }

        // Se falhar, enviamos o erro em formato JSON
        return response()->json([
            'errors' => ['pin' => 'PIN Incorreto']
        ], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['success' => true]);
    }
}
