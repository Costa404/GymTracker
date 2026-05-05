<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SyncController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// Rota de exemplo do Laravel (podes deixar ou apagar, não nos afeta)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// 👇 AS TUAS ROTAS DA APLICAÇÃO 👇

// Rota para o React descarregar os dados (Pull)
Route::get('/sync/pull', [SyncController::class, 'pullFromPC']);

// Rota para o React enviar dados novos para o PC (Push)
Route::post('/sync/bulk', [SyncController::class, 'pushFromApp']);

// Auth
Route::post('/auth', [AuthController::class, 'verifyPin']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
    