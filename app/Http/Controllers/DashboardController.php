<?php

namespace App\Http\Controllers;


use App\Models\Exercise;
use Illuminate\Http\Request;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DashboardController extends Controller
{
    /**
     * Fornece os dados globais para o Dashboard.
     * Agora o React chama isto via Axios para atualizar as stats do PC.
     */
    public function index()
    {
        // 1. Cálculo do Volume Semanal (Baseado no que já sincronizaste para o PC)
        $weeklyVolume = WorkoutLog::where('created_at', '>=', now()->subDays(7))
            ->select(DB::raw('SUM(weight * reps) as total'))
            ->first()->total ?? 0;

        // 2. Lista de Exercícios (Útil para o telemóvel saber o que existe no arquivo)
        $exercises = Exercise::all();

        // 3. Últimos 5 Treinos realizados
        $WorkoutHistory = Workout::latest()->with('logs')->take(5)->get();

        // Retornamos JSON. O React (SPA) recebe isto e decide como desenhar.
        return response()->json([
            'weeklyVolume' => (int) $weeklyVolume,
            'exercises' => $exercises,
            'WorkoutHistory' => $WorkoutHistory,
            // Nota: Data e Hora já não enviamos, o React faz isso localmente.
        ]);
    }

    /**
     * Verificação de PIN para a API.
     */
    public function verifyPin(Request $request)
    {
        if ($request->input('pin') === config('app.pin_code')) {
            // Em SPA/API, usamos o login por sessão ou token
            $user = User::first();
            Auth::login($user, true);

            // Não fazemos redirect! Enviamos sinal de OK.
            return response()->json([
                'authenticated' => true,
                'user' => $user
            ], 200);
        }

        // Se falhar, enviamos o erro em formato JSON
        return response()->json([
            'errors' => ['pin' => 'PIN Incorreto']
        ], 401);
    }
}
