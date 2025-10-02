<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_competences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('competence_id')->constrained('competences');
            $table->integer('level')->default(1);
            $table->integer('experience')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'competence_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_competences');
    }
};
