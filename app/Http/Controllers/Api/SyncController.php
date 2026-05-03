<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // 👈 Importação obrigatória adicionada
use Illuminate\Http\Request;
use App\Models\Workout;
use App\Models\Exercise;

class SyncController extends Controller
{
    /**
     * Exporta todos os dados do PC para a SPA (Telemóvel/Browser)
     */
    public function pullFromPC()
    {
        // 1. Buscamos apenas os treinos que têm exercícios (limpeza automática)
        // Carregamos também os logs associados a cada treino
        $workouts = Workout::has('logs')
            ->with('logs')
            ->get();

        // 2. Buscamos a lista de exercícios para garantir que o Dexie está atualizado
        $exercises = Exercise::all();

        // 3. Retornamos tudo num pacote JSON estruturado
        return response()->json([
            'workouts' => $workouts,
            'exercises' => $exercises,
            'pulled_at' => now()->toISOString(),
        ], 200);
    }
}
