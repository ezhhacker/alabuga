<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mission_competences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mission_id')->constrained('missions');
            $table->foreignId('competence_id')->constrained('competences');
            $table->timestamps();

            $table->unique(['mission_id', 'competence_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mission_competences');
    }
};
