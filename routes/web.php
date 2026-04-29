<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WebAuthn\WebAuthnLoginController;
use App\Http\Controllers\WebAuthn\WebAuthnRegisterController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutSessionController;
use App\Models\Exercise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

// Forçar HTTPS se necessário
if (request()->isSecure() || str_contains(request()->getHost(), 'ngrok')) {
    URL::forceScheme('https');
}

// --- ROTAS DO PIN (PÚBLICAS) ---

Route::get('/auth', function () {
    return Inertia::render('Auth/Auth');
})->name('pin.show');

Route::post('/auth', [DashboardController::class, 'verifyPin'])->name('pin.verify');


// --- TODAS AS TUAS ROTAS ORIGINAIS (PROTEGIDAS) ---
Route::middleware([App\Http\Middleware\AuthorizeAccess::class])->group(function () {

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

    // --- ROTAS PARA REGISTAR O FACE ID ---

});
// routes/web.php
Route::middleware('auth')->group(function () {
    Route::get('webauthn/register/options', [WebAuthnRegisterController::class, 'options'])
        ->name('webauthn.register.options');
    Route::post('webauthn/register', [WebAuthnRegisterController::class, 'register'])
        ->name('webauthn.register');
});
// --- ROTAS DE AUTENTICAÇÃO (PÚBLICAS) ---

Route::post('/webauthn/login/options', [WebAuthnLoginController::class, 'options'])
    ->name('webauthn.login.options');

Route::post('/webauthn/login', [WebAuthnLoginController::class, 'login'])
    ->name('webauthn.login');
Route::post('/logout', function () {
    Auth::logout();
    session()->invalidate();
    session()->regenerateToken();
    return redirect('/auth');
})->name('logout');
