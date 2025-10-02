<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_artifacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('artifact_id')->constrained('artifacts');
            $table->timestamp('obtained_at');
            $table->timestamps();

            $table->unique(['user_id', 'artifact_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_artifacts');
    }
};
