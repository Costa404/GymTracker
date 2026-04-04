<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Models\ExerciseLog;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    /**
     * Show the dashboard with all exercises.
     */
    public function index()
    {
        $exercises = Exercise::all();
        return view('dashboard', compact('exercises'));
    }

    /**
     * Show the form to create a new exercise.
     */
    public function create()
    {
        return view('exercises.create');
    }

    /**
     * Store a newly created exercise in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Exercise::create([
            'name' => $request->name,
        ]);

        return redirect()->route('dashboard')->with('status', 'Exercise Protocol Initialized.');
    }

    /**
     * Show a specific exercise with its full performance history.
     */
    public function show(Exercise $exercise)
    {
        // Group logs by date for the "Timeline" view
        $history = $exercise->logs()
            ->get()
            ->groupBy(function ($log) {
                return $log->created_at->format('d M Y');
            });

        return view('exercises.show', compact('exercise', 'history'));
    }
}
