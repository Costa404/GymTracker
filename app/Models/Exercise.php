<?php

namespace App\Models;

use App\Models\WorkoutLog;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'muscle_group'];

    // Relação opcional: Um exercício pode estar em muitos logs de treino
    public function logs()
    {
        return $this->hasMany(WorkoutLog::class);
    }
}
