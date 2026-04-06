<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Inertia\Inertia; // Não te esqueças do import!

class WorkoutController extends Controller
{
    public function PastWorkouts(Request $request)
    {
        // 1. Iniciamos a query (filtramos apenas treinos finalizados)
        $query = Workout::query()->whereNotNull('completed_at');

        // 2. FILTRO DE CATEGORIA: Se houver um 'type' no URL, filtramos o nome
        if ($request->has('type')) {
            $query->where('name', 'like', '%' . $request->type . '%');
        }

        // 3. Pegamos nos resultados ordenados pelos mais recentes
        $workouts = $query->latest()->get();

        // 4. Enviamos para o React
        return Inertia::render('Workouts/PastWorkouts', [
            'workouts' => $workouts,
            'filters' => [
                'type' => $request->type // Importante para o React saber qual botão "acender"
            ]
        ]);
    }

    public function setup()
    {
        $templates = [
            ['id' => 1, 'name' => 'Push Alpha'],
            ['id' => 2, 'name' => 'Pull Heavy'],
            ['id' => 3, 'name' => 'Legs Destruction']
        ];

        // Aponta para resources/js/Pages/Workouts/Setup.jsx
        $active = Workout::whereNull('completed_at')->latest()->first();

        return Inertia::render('Workouts/WorkoutSetup', [
            'templates' => $templates,
            'workout' => $active
        ]);
    }

    public function start(Request $request)
    {
        // 1. Força o Laravel a parar aqui e mostrar o que recebeu
        // Se clicares no botão e aparecer uma página preta com dados, o React está OK.
        // dd($request->all());

        $type = $request->input('type', 'Custom');

        $workout = Workout::create([
            'name' => $type . ' - ' . now()->format('d M'),
            // 'completed_at' => null, // Garante que a tua migration tem esta coluna
        ]);

        // 2. Verifica se o workout foi mesmo criado
        if (!$workout) {
            dd("Erro: O Workout não foi gravado na DB!");
        }

        return redirect()->route('workouts.workoutSession', $workout->id);
    }

    // Adiciona este método ANTES do último } do teu WorkoutController
    public function finish(Request $request, Workout $workout)
    {

        // dd($request->all());
        // 1. O React enviou { payload: ... }. Temos de usar 'payload'!
        $exercises = $request->input('exercises');

        // DEBUG RÁPIDO: Se quiseres ter a certeza absoluta do que está a chegar,
        // tira o comentário da linha abaixo e clica em Finish no browser:
        // dd($exercises);

        if (empty($exercises)) {
            return back()->with('error', 'Sem dados para gravar.');
        }

        foreach ($exercises as $exerciseData) {
            // Para cada exercício, percorremos as séries (sets)
            foreach ($exerciseData['sets'] as $index => $setData) {
                \App\Models\WorkoutLog::create([
                    'user_id'     => auth()->id(),
                    'workout_id'  => $workout->id,
                    'exercise_id' => $exerciseData['exercise_id'],
                    'weight'      => $setData['weight'],
                    'reps'        => $setData['reps'],
                    'rir'         => $setData['rir'] ?? null,
                    // O teu model pede 'set_number', vamos usar o índice do array + 1
                    'set_number'  => $index + 1,
                    'type'        => 'normal', // Valor padrão para o teu campo 'type'
                ]);
            }
        }

        // Marca o treino como finalizado (para aparecer no PastWorkouts)
        $workout->update([
            'completed_at' => now()
        ]);

        return redirect()->route('workouts.setup');
    }
}
