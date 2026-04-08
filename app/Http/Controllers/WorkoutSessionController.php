<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Exercise;
use App\Models\WorkoutLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutSessionController extends Controller
{
    // Ecrã principal do treino a decorrer
    public function run(Workout $workout)
    {
        $workoutData = $workout->logs()
            ->with('exercise')
            ->get()
            ->groupBy(fn($log) => $log->exercise->name);

        return Inertia::render('Workouts/WorkoutSession', [
            'workout' => $workout,
            'workoutData' => $workoutData,
            'exercises' => Exercise::all()
        ]);
    }

    // O método "Finish" final: Recebe o payload do Zustand e grava tudo
    public function finish(Request $request, Workout $workout)
    {
        $exercises = $request->input('exercises');

        if (empty($exercises)) {
            // Se não houve exercício nenhum, apaga o treino fantasma
            $workout->delete();
            return redirect()->route('workouts.setup');
        }

        // Gravação em massa dos logs enviados pelo frontend
        foreach ($exercises as $exerciseData) {
            foreach ($exerciseData['sets'] as $index => $setData) {
                WorkoutLog::create([
                    'user_id' => auth()->id() ?? 1, // Usa o user logado
                    'workout_id' => $workout->id,
                    'exercise_id' => $exerciseData['exercise_id'],
                    'weight' => $setData['weight'],
                    'reps' => $setData['reps'],
                    'rir' => $setData['rir'] ?? null,
                    'set_number' => $index + 1,
                    'type' => 'normal',
                ]);
            }
        }

        $workout->update(['completed_at' => now()]);

        return redirect()->route('workouts.setup');
    }
}
