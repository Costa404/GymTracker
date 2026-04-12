<?php

namespace App\Models;

use App\Models\WorkoutLog;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'muscle_group', 'category'];

    /**
     * O "cérebro" do Model: executa antes de salvar na base de dados.
     */
    protected static function booted()
    {
        static::saving(function ($exercise) {
            $mapping = [
                // PUSH
                'Chest'     => 'Upper Push',
                'Shoulders' => 'Upper Push',
                'Triceps'   => 'Upper Push',

                // PULL
                'Back'      => 'Upper Pull',
                'Biceps'    => 'Upper Pull',

                'Legs'      => 'Lower',
                'Forearm'   => 'Lower',

                // OTHERS
                'Core'          => 'Full Body',
            ];

            $exercise->category = $mapping[$exercise->muscle_group] ?? 'Full Body';
        });
    } // <-- Esta chaveta estava a faltar!

    /**
     * Relação: Um exercício pode estar em muitos logs de treino.
     */
    public function logs()
    {
        return $this->hasMany(WorkoutLog::class);
    }
}
