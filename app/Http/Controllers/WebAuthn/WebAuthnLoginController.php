<?php
// app/Http/Controllers/WebAuthn/WebAuthnLoginController.php
namespace App\Http\Controllers\WebAuthn;

use Illuminate\Contracts\Support\Responsable;
use Laragear\WebAuthn\Http\Requests\AssertedRequest;
use Laragear\WebAuthn\Http\Requests\AssertionRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class WebAuthnLoginController
{
    public function options(AssertionRequest $request): Responsable
    {
        return $request->fastLogin()->toVerify();
    }

    public function login(AssertedRequest $request)
    {
        try {
            // 1. O "Segurança da Discoteca"
            // Deixamos o pacote fazer a matemática toda para garantir que a Apple aprovou a biometria.
            // Ignoramos se ele acha o utilizador ou não. Só queremos que não dê erro criptográfico.
            $request->login();

            // 2. "Da base de dados trato eu"
            // A biometria é verdadeira? Então entra direto no teu utilizador Admin (ID 1).
            $user = \App\Models\User::find(1);

            if ($user) {
                Auth::login($user, remember: true);
                session(['pin_verified' => true]);
                return response()->noContent();
            }

            return response()->json(['message' => 'Admin não encontrado na BD.'], 401);
        } catch (\Exception $e) {
            // Se a cara for falsa ou o iPhone cancelar, o código cai logo aqui.
            Log::error('WebAuthn Segurança Falhou: ' . $e->getMessage());
            return response()->json(['message' => 'Biometria rejeitada.'], 401);
        }
    }
}
