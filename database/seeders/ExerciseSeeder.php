<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $exercises = [
            // PUSH + UPPER
            ['name' => 'Flat Bench Press', 'muscle_group' => 'Upper, Push'],
            ['name' => 'Incline Dumbbell Press', 'muscle_group' => 'Upper, Push'],
            ['name' => 'Military Press', 'muscle_group' => 'Upper, Push'],
            ['name' => 'Dips', 'muscle_group' => 'Upper, Push'],
            ['name' => 'Triceps Rope Pushdown', 'muscle_group' => 'Upper, Push'],
            ['name' => 'Lateral Raises', 'muscle_group' => 'Upper, Push'],

            // PULL + UPPER
            ['name' => 'Lat Pulldown', 'muscle_group' => 'Upper, Pull'],
            ['name' => 'Barbell Row', 'muscle_group' => 'Upper, Pull'],
            ['name' => 'Pull-ups', 'muscle_group' => 'Upper, Pull'],
            ['name' => 'Bicep Curl', 'muscle_group' => 'Upper, Pull'],
            ['name' => 'Face Pulls', 'muscle_group' => 'Upper, Pull'],
            ['name' => 'Dumbbell Row', 'muscle_group' => 'Upper, Pull'],

            // LEGS
            ['name' => 'Back Squat', 'muscle_group' => 'Legs'],
            ['name' => 'Leg Press', 'muscle_group' => 'Legs'],
            ['name' => 'Romanian Deadlift', 'muscle_group' => 'Legs'],
            ['name' => 'Leg Extensions', 'muscle_group' => 'Legs'],
            ['name' => 'Leg Curl', 'muscle_group' => 'Legs'],
            ['name' => 'Standing Calf Raises', 'muscle_group' => 'Legs'],
        ];

        foreach ($exercises as $ex) {
            Exercise::updateOrCreate(
                ['name' => $ex['name']],
                ['muscle_group' => $ex['muscle_group']]
            );
        }
    }
}
