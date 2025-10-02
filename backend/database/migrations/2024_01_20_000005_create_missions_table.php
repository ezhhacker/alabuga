<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->integer('experience_reward')->default(0);
            $table->integer('mana_reward')->default(0);
            $table->foreignId('required_rank_id')->constrained('ranks');
            $table->string('category');
            $table->string('branch');
            $table->json('competence_rewards')->nullable();
            $table->foreignId('artifact_id')->nullable()->constrained('artifacts');
            $table->json('requirements')->nullable();
            $table->json('steps')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('missions');
    }
};
