<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercise_logs', function (Blueprint $table) {
            $table->id();
            // Liga este log a um exercício específico
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');

            $table->float('weight'); // Carga (80, 82.5, etc)
            $table->integer('reps'); // Repetições feitas
            $table->integer('rir')->nullable(); // Reps in Reserve (o teu cansaço)

            $table->timestamps(); // Criado em (será a tua data de treino)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_logs');
    }
};
