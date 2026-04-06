<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Workout;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    public function ExerciseHistory(Exercise $exercise)
    {
        $history = \App\Models\WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Exercises/ExerciseHistory', [
            'exercise' => $exercise,
            'history' => $history,

            'workout_name' => $exercise->workout->name ?? 'Workout'
        ]);
    }

    public function ExerciseDisplay(Exercise $exercise, Request $request)
    {
        $workoutId = $request->query('workout_id');
        $workout = Workout::findOrFail($workoutId);

        // 1. Procurar o ID do treino mais RECENTE onde este exercício foi feito
        // Importante: latest() sem argumentos usa 'created_at' por defeito
        $lastWorkoutId = \App\Models\WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', auth()->id())
            ->where('workout_id', '!=', $workoutId)
            ->latest()
            ->value('workout_id');

        // 2. Buscar as séries desse treino específico
        $lastSets = collect(); // Começa vazio
        if ($lastWorkoutId) {
            $lastSets = \App\Models\WorkoutLog::where('exercise_id', $exercise->id)
                ->where('workout_id', $lastWorkoutId)
                ->orderBy('id', 'asc') // Ordem cronológica: Set 1, Set 2, Set 3
                ->take(3)
                ->get();
        }

        return Inertia::render('Exercises/ExerciseDisplay', [
            'exercise' => $exercise,
            'workout' => $workout,
            'lastWeights' => $lastSets->pluck('weight')->toArray(),
            'lastReps' => $lastSets->pluck('reps')->toArray(),
        ]);
    }
}
