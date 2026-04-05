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
        Schema::create('workout_logs', function (Blueprint $table) {
            $table->id();

            // Ligações (Foreign Keys)
            $table->foreignId('workout_id')->constrained()->onDelete('cascade');
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Dados da Performance
            $table->integer('set_number');
            $table->decimal('weight', 8, 2);
            $table->integer('reps');

            /** * RIR (Reps in Reserve)
             * Usamos integer para ser 0, 1, 2...
             * nullable() porque podes esquecer-te de anotar ou ir à falha total (RIR 0)
             */
            $table->integer('rir')->nullable();

            // Tipo de série
            $table->string('type')->default('normal');

            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_logs');
    }
};
