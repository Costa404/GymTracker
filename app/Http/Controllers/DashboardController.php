<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\ExerciseLog;
use App\Models\Workout;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Data e Hora para o Header
        $currentDate = now()->format('M d, Y');
        $currentTime = now()->format('H:i');

        // 2. Cálculo do Volume Semanal (Soma de peso * reps dos últimos 7 dias)
        $weeklyVolume = ExerciseLog::where('created_at', '>=', now()->subDays(7))
            ->select(DB::raw('SUM(weight * reps) as total'))
            ->first()->total ?? 0;

        // 3. Lista de Exercícios para o Quick Select
        $exercises = Exercise::all();

        // 4. Últimos 5 Treinos realizados para o "Past Workouts"
        $pastWorkouts = Workout::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'currentDate'  => $currentDate,
            'currentTime'  => $currentTime,
            'weeklyVolume' => (int) $weeklyVolume, // Forçamos a número para o React não se queixar
            'exercises'    => $exercises,
            'pastWorkouts' => $pastWorkouts
        ]);
    }
}
