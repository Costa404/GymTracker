<?php
// app/Http/Controllers/WebAuthn/WebAuthnLoginController.php
namespace App\Http\Controllers\WebAuthn;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Response;
use Laragear\WebAuthn\Http\Requests\AssertionRequest;
use Laragear\WebAuthn\Http\Requests\AssertedRequest;

class WebAuthnLoginController
{
    /**
     * Devolve o challenge para o dispositivo verificar.
     */
    public function options(AssertionRequest $request): Responsable
    {
        return $request
            ->fastLogin()
            ->toVerify();
    }

    /**
     * Verifica a assinatura e faz login do utilizador.
     */
    public function login(AssertedRequest $request): Response
    {
        $user = $request->login();

        if (! $user) {
            return response()->json([
                'message' => 'Autenticação biométrica falhou.'
            ], 401);
        }

        return response()->noContent(); // 204 — Inertia redireciona
    }
}
