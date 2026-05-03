<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Workout;
use App\Models\WorkoutLog;
use Illuminate\Support\Facades\DB;

class WorkoutSessionController extends Controller
{
    /**
     * SYNC / FINISH: Receives the payload from the device and persists it.
     */
    public function finish(Request $request): JsonResponse
    {
        $exercises = $request->input('exercises');
        $duration = $request->input('duration_seconds');
        $workoutName = $request->input('name', 'Synced Workout');

        // Validation: If the device sends an empty payload, return an error.
        if (empty($exercises)) {
            return response()->json(['message' => 'No data to synchronize'], 400);
        }

        return DB::transaction(function () use ($exercises, $duration, $workoutName) {
            // 1. Create the Workout master record
            $workout = Workout::create([
                'name' => $workoutName,
                'completed_at' => now(), // Or use a timestamp from the request
                'duration_seconds' => $duration,
            ]);

            $logs = [];

            // 2. Prepare data for Bulk Insert
            foreach ($exercises as $exerciseData) {
                foreach ($exerciseData['sets'] as $index => $setData) {
                    $logs[] = [
                        'user_id'     => auth()->id() ?? 1,
                        'workout_id'  => $workout->id,
                        'exercise_id' => $exerciseData['exercise_id'],
                        'weight'      => $setData['weight'],
                        'reps'        => $setData['reps'],
                        'rir'         => $setData['rir'] ?? null,
                        'set_number'  => $index + 1,
                        'type'        => 'normal',
                        'created_at'  => now(),
                        'updated_at'  => now(),
                    ];
                }
            }

            // 3. Execute Bulk Insert for performance
            WorkoutLog::insert($logs);

            return response()->json([
                'status' => 'success',
                'message' => 'Workout archived successfully',
                'workout_id' => $workout->id
            ], 201);
        });
    }
}
