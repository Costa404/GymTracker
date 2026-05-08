<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SyncController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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


// Temporary route on your local machine
Route::get('/bootstrap-cloud', function () {
    $payload = [
        'workouts' => \App\Models\Workout::with('logs')->get(),
        'exercises' => \App\Models\Exercise::all(),
    ];

    // Send local SQLite data to Fly.io
    $response = Http::post('https://gymtracker799.fly.dev/api/sync/bulk', $payload);

    return $response->ok() ? "Cloud is primed!" : "Upload failed";
});
