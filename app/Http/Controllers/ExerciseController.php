<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    // Agora recebes os dois objetos diretamente nos parênteses
    public function ExerciseHistory(Workout $workout, Exercise $exercise)
    {
        $history = WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', 1)
            ->latest()
            ->get();

        return Inertia::render('Exercises/ExercisesHistory/ExerciseHistory', [
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

    public function create()
    {
        return Inertia::render('Exercises/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'muscle_group' => 'required|string',
        ]);

        Exercise::create($validated);

        return redirect()->route('dashboard')->with('success', 'Exercise created!');
    }
}
