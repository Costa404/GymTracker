<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutSessionController extends Controller
{
    public function run(Workout $workout)
    {
        // 1. Vai buscar os logs reais deste workout (se for manual, estará vazio)
        // 2. Agrupa por exercício para o frontend conseguir iterar
        $workoutData = $workout->logs()
            ->with('exercise')
            ->get()
            ->groupBy(function ($log) {
                return $log->exercise->name;
            });

        // Se o workout for novo e manual, $workoutData virá vazio []

        $exercises = Exercise::all(); // Para a lista de seleção em baixo

        return Inertia::render('Workouts/WorkoutSession', [
            'workout' => $workout,
            'workoutData' => $workoutData,
            'exercises' => $exercises
        ]);
    }

    public function applyTemplate(Workout $workout, $templateId)
    {
        // Simulação de gravação
        return redirect()->route('workouts.workoutSession', $workout->id)
            ->with('selected_template', $templateId);
    }


    public function finish(Workout $workout)
    {
        if ($workout->logs()->count() === 0) {
            $workout->delete();
            return redirect()->route('dashboard');
        }

        $workout->update(['completed_at' => now()]);
        return redirect()->route('workouts.setup');
    }
}
