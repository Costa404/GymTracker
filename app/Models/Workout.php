<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    /**
     * Campos que podem ser preenchidos em massa.
     * Importante para o WorkoutController::create funcionar.
     */
    protected $fillable = ['name', 'user_id', 'completed_at', 'duration_seconds'];
    /**
     * RELAÇÃO: Um treino (Workout) tem muitos registos (Logs).
     * Isto permite-te fazer $workout->logs na tua Dashboard ou History.
     */
    public function logs()
    {
        return $this->hasMany(WorkoutLog::class);
    }
}
