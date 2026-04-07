<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Workout;
use App\Models\WorkoutLog;

use Inertia\Inertia;

class ExerciseController extends Controller
{
    // Agora recebes os dois objetos diretamente nos parênteses
    public function ExerciseHistory(Workout $workout, Exercise $exercise)
    {
        // Procuramos os logs que pertencem a este EXERCÍCIO e a este TREINO
        $history = WorkoutLog::where('exercise_id', $exercise->id)
            ->where('workout_id', $workout->id)
            ->where('user_id', 1)
            ->with('workout') // Para teres a data, etc.
            ->latest()
            ->get();

        return Inertia::render('Exercises/ExerciseHistory', [
            'exercise' => $exercise,
            'workout' => $workout,
            'history' => $history
        ]);
    }
    public function ExerciseDisplay(Workout $workout, Exercise $exercise)
    {
        // 1. Procurar o ID do treino mais RECENTE onde este exercício foi feito (excluindo o atual)
        $lastWorkoutId = WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', 1)
            ->where('workout_id', '!=', $workout->id) // Usamos o objeto $workout injetado
            ->latest()
            ->value('workout_id');

        // 2. Buscar as séries desse treino anterior para as "badges" verdes
        $lastSets = collect();
        if ($lastWorkoutId) {
            $lastSets = WorkoutLog::where('exercise_id', $exercise->id)
                ->where('workout_id', $lastWorkoutId)
                ->orderBy('id', 'asc')
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
