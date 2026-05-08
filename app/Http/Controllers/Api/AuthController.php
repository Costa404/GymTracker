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
        // Verifica se o PIN bate certo com o que tens no .env
        // Nota: Se não mapeaste o APP_PIN no ficheiro config/app.php, usa env('APP_PIN')
        if ((string) $request->input('pin') === env('APP_PIN')) {

            // Em vez do Auth::login, dizemos à sessão que estás autorizado
            session(['is_authenticated' => true]);

            // Retornamos apenas o sinal de OK, sem tentar enviar um "User" que não existe
            return response()->json([
                'authenticated' => true
            ], 200);
        }

        // Se falhar, enviamos o erro
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
