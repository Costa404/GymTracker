<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\WorkoutSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

if (request()->isSecure() || str_contains(request()->getHost(), 'ngrok')) {
    \Illuminate\Support\Facades\URL::forceScheme('https');
}

// 1. DASHBOARD ()
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index']);

// 2. WORKOUT SETUP

Route::controller(WorkoutController::class)->group(function () {
    Route::get('/workouts', 'index')->name('workouts.index');
    Route::get('/workouts/setup', 'setup')->name('workouts.setup');
    Route::post('/workouts/start', 'start')->name('workouts.start');

    Route::get('/workouts', [WorkoutController::class, 'PastWorkouts'])->name('workouts.index');
});
// 3. SESSÃO ATIVA
Route::prefix('workouts/{workout}')->controller(WorkoutSessionController::class)->group(function () {
    Route::get('/', 'show')->name('workouts.show');
    Route::get('/workoutSession', 'run')->name('workouts.workoutSession');
    Route::post('/apply-template/{template}', 'applyTemplate')->name('workouts.apply-template');
    Route::post('/finish', 'finish')->name('workouts.finish');
});

Route::post('/workouts/finish/{workout}', [WorkoutSessionController::class, 'finish'])->name('workouts.finish');
