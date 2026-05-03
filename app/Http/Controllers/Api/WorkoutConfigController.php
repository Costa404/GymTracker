<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkoutTemplate;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WorkoutConfigController extends Controller
{
    /**
     * Get all workout templates from the Local Machine.
     */
    public function index(): JsonResponse
    {
        // Usamos o 'with' para evitar o problema de N+1 queries (Eager Loading)
        // E ordenamos pelos mais recentes antes de obter os resultados
        $templates = WorkoutTemplate::with('exercises')
            ->latest()
            ->get();

        return response()->json($templates);
    }
    /**
     * Store a new workout template.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'exercise_ids' => 'required|array',
            'exercise_ids.*' => 'integer|exists:exercises,id'
        ]);

        $template = WorkoutTemplate::create([
            'name' => $validated['name'],
            'type' => $validated['type'],
        ]);

        // Associa os exercícios na tabela intermédia
        $template->exercises()->attach($validated['exercise_ids']);

        return response()->json([
            'message' => 'Template successfully saved',
            'template' => $template
        ], 201);
    }

    /**
     * Update an existing workout template.
     */
    public function update(Request $request, WorkoutTemplate $workoutTemplate): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'exercise_ids' => 'required|array',
            'exercise_ids.*' => 'integer|exists:exercises,id'
        ]);

        $workoutTemplate->update($validated);

        return response()->json([
            'message' => 'Template updated on Local Machine',
            'template' => $workoutTemplate
        ]);
    }

    /**
     * Delete a template from the Local Machine.
     */
    public function destroy(WorkoutTemplate $workoutTemplate): JsonResponse
    {
        $workoutTemplate->delete();

        return response()->json([
            'message' => 'Template deleted successfully'
        ]);
    }
}
