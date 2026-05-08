<?php

use App\Http\Controllers\WebAuthn\WebAuthnLoginController;
use App\Http\Controllers\WebAuthn\WebAuthnRegisterController;
use Illuminate\Support\Facades\Route;

// --- WEBAUTHN (antes do fallback SPA) ---
Route::post('/webauthn/register/options', [WebAuthnRegisterController::class, 'options']);
Route::post('/webauthn/register', [WebAuthnRegisterController::class, 'register']);
Route::post('/webauthn/login/options', [WebAuthnLoginController::class, 'options']);
Route::post('/webauthn/login', [WebAuthnLoginController::class, 'login']);

// --- FALLBACK SPA (sempre o último) ---
Route::get('/{any}', function () {
    return view('spa');
})->where('any', '.*');
