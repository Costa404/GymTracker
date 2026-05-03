<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutTemplate extends Model
{
    protected $fillable = ['name', 'type'];

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class);
    }
}
