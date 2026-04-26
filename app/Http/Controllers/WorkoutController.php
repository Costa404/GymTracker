<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutController extends Controller
{
    // Ver treinos passados
    public function workoutsHistory(Request $request)
    {
        $query = Workout::query()->whereNotNull('completed_at');

        if ($request->filled('type')) {
            $primeiraPalavra = explode(' ', $request->type)[0];
            $query->where('name', 'like', '%' . $primeiraPalavra . '%');
        }

        return Inertia::render('WorkoutsHistory/WorkoutsHistory', [
            'workouts' => $query->latest()->get(),
            'filters' => ['type' => $request->type]
        ]);
    }

    // Ecrã de preparação (Escolher template ou continuar ativo)
    public function setup()
    {
        $templates = [
            ['id' => 1, 'name' => 'Push Day'],
            ['id' => 2, 'name' => 'Pull Day'],
            ['id' => 3, 'name' => 'Legs Day'],
            ['id' => 4, 'name' => 'Upper Day'],
            ['id' => 5, 'name' => 'Full Body Day'],
        ];


        $active = Workout::whereNull('completed_at')->latest()->first();


        return Inertia::render('WorkoutsSetup/WorkoutSetup', [
            'templates' => $templates,
            'active' => $active,
        ]);
    }

    // Criar a entidade de treino e saltar para a sessão
    public function start(Request $request)
    {
        $type = $request->input('type', 'Custom');
        $workout = Workout::create([
            'name' => $type . ' - ' . now()->format('d M'),
        ]);

        return redirect()->route('workouts.workoutSession', $workout->id);
    }

    public function showHistoryDetail(Workout $workout)
    {

        $workoutData = $workout->logs()
            ->with('exercise')
            ->get()
            ->groupBy(fn($log) => $log->exercise->name);

        return Inertia::render('WorkoutsHistory/DetailsWorkoutsHistory', [
            'workout' => $workout,
            'workoutData' => $workoutData
        ]);
    }

    public function destroy(Workout $workout)
    {


        // 2. Apagar o registo
        $workout->delete();

        // 3. Redirecionar de volta para o histórico com uma mensagem
        return redirect()->route('workouts.history')->with('message', 'Workout deleted successfully');
    }
}
