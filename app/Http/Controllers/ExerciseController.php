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
            // Aqui vais buscar o nome do workout através da relação
            'workout_name' => $exercise->workout->name ?? 'Workout'
        ]);
    }

    public function ExerciseDisplay(Exercise $exercise, Request $request)
    {
        // Pegamos no workout_id que vem do link (?workout_id=84)
        $workoutId = $request->query('workout_id');

        // Usamos findOrFail para dar erro 404 se o workout não existir
        $workout = Workout::findOrFail($workoutId);

        return Inertia::render('Exercises/ExerciseDisplay', [ // Corrigido: Removida a quebra de linha
            'exercise' => $exercise,
            'workout' => $workout,

            // Sugestão: Histórico GLOBAL deste exercício para o utilizador atual
            // Assim ele vê as cargas de semanas passadas, não só de hoje.
            'history' => \App\Models\WorkoutLog::where('exercise_id', $exercise->id)
                ->where('user_id', auth()->id())
                ->orderBy('created_at', 'desc')
                ->take(10) // Pega os últimos 10 sets para não sobrecarregar
                ->get()
        ]);
    }
}
