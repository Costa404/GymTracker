<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutLog extends Model
{
    protected $fillable = [
        'workout_id',
        'exercise_id',
        'user_id',
        'set_number',
        'weight',
        'reps',
        'rir',
        'type'
    ];

    // Saber a que treino pertence este log
    public function workout()
    {
        return $this->belongsTo(Workout::class);
    }

    // Saber qual é o exercício deste log
    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
