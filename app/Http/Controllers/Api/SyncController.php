<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller; // 👈 Importação obrigatória adicionada
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class SyncController extends Controller
{
    /**
     * Exporta todos os dados do PC para a SPA (Telemóvel/Browser)
     */
    // SyncController.php (Server-side)
    public function pushFromApp(Request $request)
    {
        // Save the payload into the Cache forever
        // We use Cache instead of Database to avoid SQLite issues on Fly.io
        Cache::forever('sync_package', $request->all());

        return response()->json(['status' => 'Data cached successfully']);
    }

    public function pullFromPC()
    {
        $workouts = \App\Models\Workout::with('logs')->get();
        $exercises = \App\Models\Exercise::all();

        return response()->json([
            'workouts' => $workouts,
            'exercises' => $exercises,
        ]);
    }
}
