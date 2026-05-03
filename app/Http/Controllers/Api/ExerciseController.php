<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller; // 👈 Importação obrigatória adicionada
use App\Models\Exercise;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    /**
     * Retorna o histórico de um exercício específico num treino.
     * Útil para quando queres consultar o "Porto Seguro" via API.
     */
    public function ExerciseHistory(Workout $workout, Exercise $exercise)
    {
        $history = WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', 1) // Podes manter o ID 1 ou usar auth()->id()
            ->latest()
            ->get();

        return response()->json([
            'exercise' => $exercise,
            'workout' => $workout,
            'history' => $history
        ]);
    }

    /**
     * Retorna os dados para exibir o exercício e as marcas do treino anterior.
     */
    public function ExercisesPage(Workout $workout, Exercise $exercise)
    {
        $lastWorkoutId = WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', 1)
            ->where('workout_id', '!=', $workout->id)
            ->latest()
            ->value('workout_id');

        $lastSets = collect();
        if ($lastWorkoutId) {
            $lastSets = WorkoutLog::where('exercise_id', $exercise->id)
                ->where('workout_id', $lastWorkoutId)
                ->orderBy('id', 'asc')
                ->take(3)
                ->get();
        }

        return response()->json([
            'exercise' => $exercise,
            'workout' => $workout,
            'lastWeights' => $lastSets->pluck('weight')->toArray(),
            'lastReps' => $lastSets->pluck('reps')->toArray(),
        ]);
    }

    // O método create() FOI APAGADO. O React Router trata da página.

    /**
     * Grava um novo exercício no SQLite do PC.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'muscle_group' => 'required|string',
        ]);

        // Transformamos o nome em uppercase aqui se quiseres manter o padrão
        $validated['name'] = strtoupper($validated['name']);

        $exercise = Exercise::create($validated);

        // Retornamos JSON com status 201 (Created)
        return response()->json([
            'message' => 'Exercise saved on HomePc',
            'exercise' => $exercise
        ], 201);
    }

    /**
     * Histórico completo de um exercício (para gráficos ou listagens longas).
     */
    public function showIndividualHistory(Exercise $exercise)
    {
        $history = WorkoutLog::where('exercise_id', $exercise->id)
            ->where('user_id', auth()->id() ?? 1)
            ->with('workout')
            ->orderBy('created_at', 'desc')
            ->get();

        $lastWorkout = $history->first()?->workout;

        return response()->json([
            'exercise' => $exercise,
            'history' => $history,
            'workout' => $lastWorkout ?? [
                'id' => null,
                'name' => 'General History'
            ]
        ]);
    }


    public function index()
    {
        // O PC entrega todos os exercícios que tem no SQLite para o telemóvel guardar no Dexie
        return response()->json(Exercise::all());
    }

    // No teu Controller do PC
    public function syncExercises(Request $request)
    {
        $exercises = $request->input('exercises');

        foreach ($exercises as $eData) {
            // "Procura um exercício que tenha este REMOTE_ID.
            // Se encontrares, atualiza o nome. Se não, cria um novo."
            Exercise::updateOrCreate(
                ['remote_id' => $eData['id']], // A chave de busca é o ID que veio do telemóvel
                [
                    'name' => $eData['name'],
                    'muscle_group' => $eData['muscle_group'],
                    // O 'id' interno do SQLite do PC será gerado automaticamente e não choca
                ]
            );
        }

        return response()->json(['status' => 'Exercícios sincronizados com sucesso']);
    }
}
