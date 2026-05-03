<?php

use App\Http\Controllers\Api\SyncController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WorkoutConfigController;


// Rota de exemplo do Laravel (podes deixar ou apagar, não nos afeta)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// 👇 AS TUAS ROTAS DA APLICAÇÃO 👇

// Rota para o React descarregar os dados (Pull)
Route::get('/sync/pull', [SyncController::class, 'pullFromPC']);

// Rota para o React enviar dados novos para o PC (Push)
Route::post('/sync/bulk', [SyncController::class, 'pushFromApp']);


Route::prefix('workout-config')->group(function () {
    Route::get('/templates', [WorkoutConfigController::class, 'index']);
    Route::post('/templates', [WorkoutConfigController::class, 'store']);
    Route::put('/templates/{workoutTemplate}', [WorkoutConfigController::class, 'update']);
    Route::delete('/templates/{workoutTemplate}', [WorkoutConfigController::class, 'destroy']);
});
