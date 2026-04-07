<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutSessionController;
use Illuminate\Support\Facades\Route;

// Forçar HTTPS se necessário
if (request()->isSecure() || str_contains(request()->getHost(), 'ngrok')) {
    \Illuminate\Support\Facades\URL::forceScheme('https');
}

// 1. DASHBOARD
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index']);

// 2. GESTÃO DE TREINOS (History, Setup, Start)
Route::controller(WorkoutController::class)->group(function () {
    // Nota: Mudei para /workouts/history para não colidir com o setup
    Route::get('/workouts/history', 'WorkoutsHistory')->name('workouts.history');
    Route::get('/workouts/setup', 'setup')->name('workouts.setup');
    Route::post('/workouts/start', 'start')->name('workouts.start');
});

// 3. SESSÃO ATIVA (Treino em curso)
Route::prefix('workouts/{workout}')->controller(WorkoutSessionController::class)->group(function () {
    Route::get('/', 'show')->name('workouts.show');

    // MUDA DE '/session' PARA '/workoutSession'
    Route::get('/workoutSession', 'run')->name('workouts.workoutSession');

    Route::post('/apply-template/{template}', 'applyTemplate')->name('workouts.apply-template');

});
Route::post('/workouts/finish/{workout}', [WorkoutController::class, 'finish'])->name('workouts.finish');

// 4. EXERCÍCIOS (Display & History)
Route::controller(ExerciseController::class)->group(function () {
    // Visualização geral do exercício
    Route::get('/exercises/{exercise}', 'ExerciseDisplay')->name('exercises.ExerciseDisplay');

    // Contexto específico de um treino (Registo de Stats)
    Route::get('/workout/{workout}/exercise/{exercise}', 'ExerciseDisplay')->name('exercises.workout.display');

    // Histórico específico do exercício (O botão verde/glass)
    Route::get('/workout/{workout}/exercise/{exercise}/history', 'ExerciseHistory')->name('exercises.ExerciseHistory');
});
