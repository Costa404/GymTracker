<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Data e Hora para o Header
        $currentDate = now()->format('M d, Y');
        $currentTime = now()->format('H:i');

        // 2. Cálculo do Volume Semanal (Soma de peso * reps dos últimos 7 dias)
        $weeklyVolume = WorkoutLog::where('created_at', '>=', now()->subDays(7))
            // Filtramos por user se tiveres autenticação: ->where('user_id', auth()->id())
            ->select(DB::raw('SUM(weight * reps) as total'))
            ->first()->total ?? 0;
        // 3. Lista de Exercícios para o Quick Select
        $exercises = Exercise::all();

        // 4. Últimos 5 Treinos realizados para o "Past Workouts"
        $WorkoutsHistory = Workout::latest()->take(5)->get();

        return Inertia::render('Dashboard', [
            'currentDate' => $currentDate,
            'currentTime' => $currentTime,
            'weeklyVolume' => (int) $weeklyVolume, // Forçamos a número para o React não se queixar
            'exercises' => $exercises,
            'WorkoutsHistory' => $WorkoutsHistory
        ]);
    }

    public function verifyPin(Request $request)
    {
        if ($request->input('pin') === config('app.pin_code')) {
            session(['pin_verified' => true]);

            $user = User::first();
            Auth::login($user, remember: true);

            return redirect()->route('dashboard');
        }

        return back()->withErrors(['pin' => 'PIN Incorreto']);
    }
}
