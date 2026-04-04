<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExerciseLog extends Model
{
    // Define os campos que o sistema pode gravar
    protected $fillable = ['exercise_id', 'weight', 'reps', 'rir'];

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
