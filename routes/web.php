<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutSessionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

// Forçar HTTPS se necessário
if (request()->isSecure() || str_contains(request()->getHost(), 'ngrok')) {
    URL::forceScheme('https');
}

// 1. DASHBOARD
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index']);

// 2. GESTÃO DE TREINOS (WorkoutController)
Route::controller(WorkoutController::class)->group(function () {
    // URL em minúsculas para evitar 404
    Route::get('/workouts/history', 'workoutsHistory')->name('workouts.history');
    Route::get('/workouts/setup', 'setup')->name('workouts.setup');
    Route::post('/workouts/start', 'start')->name('workouts.start');
    // No web.php, dentro do grupo do WorkoutController
    Route::get('/workouts/{workout}/history-detail', 'showHistoryDetail')->name('workouts.history.detail');
});
// 3. SESSÃO ATIVA (WorkoutSessionController)
Route::prefix('workouts/{workout}')->controller(WorkoutSessionController::class)->group(function () {
    // Mantive o nome e URL que o teu frontend já procura
    Route::get('/workoutSession', 'run')->name('workouts.workoutSession');
    Route::post('/apply-template/{template}', 'applyTemplate')->name('workouts.apply-template');

    // O Finish agora aponta para o controller de Sessão, mas mantém o nome
    Route::post('/finish', 'finish')->name('workouts.finish');
});


// 4. EXERCÍCIOS (ExerciseController)
Route::controller(ExerciseController::class)->group(function () {
    // Visualização geral
    Route::get('/exercises/{exercise}', 'ExerciseDisplay')->name('exercises.ExerciseDisplay');

    // Contexto de treino
    Route::get('/workout/{workout}/exercise/{exercise}', 'ExerciseDisplay')->name('exercises.workout.display');

    // Histórico (Botão Verde)
    Route::get('/workout/{workout}/exercise/{exercise}/history', 'ExerciseHistory')->name('exercises.ExerciseHistory');
    Route::get('/exercises/create', 'create')->name('exercises.create');
});
