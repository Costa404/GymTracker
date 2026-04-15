<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutSessionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Inertia\Inertia;

// Forçar HTTPS se necessário
if (request()->isSecure() || str_contains(request()->getHost(), 'ngrok')) {
    URL::forceScheme('https');
}

// --- ROTAS DO PIN (PÚBLICAS) ---

Route::get('/login-pin', function () {
    return Inertia::render('PinLogin');
})->name('pin.show');

Route::post('/login-pin', [DashboardController::class, 'verifyPin'])->name('pin.verify');


// --- TODAS AS TUAS ROTAS ORIGINAIS (PROTEGIDAS) ---
Route::middleware([App\Http\Middleware\CheckPin::class])->group(function () {

    // 1. DASHBOARD
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // 2. GESTÃO DE TREINOS (WorkoutController)
    Route::controller(WorkoutController::class)->group(function () {
        Route::get('/workouts/history', 'workoutsHistory')->name('workouts.history');
        Route::get('/workouts/setup', 'setup')->name('workouts.setup');
        Route::post('/workouts/start', 'start')->name('workouts.start');
        Route::get('/workouts/{workout}/history-detail', 'showHistoryDetail')->name('workouts.history.detail');
        Route::delete('/workouts/{workout}', 'destroy')->name('workouts.destroy');
    });

    // 3. SESSÃO ATIVA (WorkoutSessionController)
    Route::prefix('workouts/{workout}')->controller(WorkoutSessionController::class)->group(function () {
        Route::get('/workoutSession', 'run')->name('workouts.workoutSession');
        Route::post('/apply-template/{template}', 'applyTemplate')->name('workouts.apply-template');
        Route::post('/finish', 'finish')->name('workouts.finish');
    });

    // 4. EXERCÍCIOS (ExerciseController)
    Route::controller(ExerciseController::class)->group(function () {
        Route::get('/exercises/create', 'create')->name('exercises.create');
        Route::post('/exercises', 'store')->name('exercises.store');
        Route::get('/exercises/{exercise}', 'ExerciseDisplay')->name('exercises.ExerciseDisplay');
        Route::get('/workout/{workout}/exercise/{exercise}', 'ExerciseDisplay')->name('exercises.workout.display');
        Route::get('/workout/{workout}/exercise/{exercise}/history', 'ExerciseHistory')->name('exercises.ExerciseHistory');
        Route::get('/exercise/{exercise}/history', 'ExerciseHistory')
            ->name('exercises.IndividualHistory');
    });



});
use App\Models\Exercise;

Route::get('/exercicios-lista', function () {
    // Seleciona apenas as colunas id e name da tabela exercises
    return Exercise::select('id', 'name')->get();
});
