<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RankSeeder::class,
            CompetenceSeeder::class,
            ArtifactSeeder::class,
            ThemeSeeder::class,
            MissionSeeder::class,
            StoreItemSeeder::class,
        ]);

        // Создаем тестовых пользователей
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'current_rank_id' => 1,
            'experience' => 0,
            'mana' => 100,
        ]);

        User::factory()->create([
            'name' => 'HR Manager',
            'email' => 'hr@example.com',
            'password' => bcrypt('password'),
            'role' => 'hr',
            'current_rank_id' => 3,
            'experience' => 500,
            'mana' => 200,
        ]);
    }
}
