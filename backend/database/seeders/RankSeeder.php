<?php

namespace Database\Seeders;

use App\Models\Rank;
use Illuminate\Database\Seeder;

class RankSeeder extends Seeder
{
    public function run(): void
    {
        $ranks = [
            [
                'name' => 'Новичок',
                'min_experience' => 0,
                'required_missions' => [],
                'required_competences' => []
            ],
            [
                'name' => 'Исследователь',
                'min_experience' => 100,
                'required_missions' => [1, 2],
                'required_competences' => [1]
            ],
            [
                'name' => 'Мастер',
                'min_experience' => 500,
                'required_missions' => [1, 2, 3, 4, 5],
                'required_competences' => [1, 2]
            ],
            [
                'name' => 'Легенда',
                'min_experience' => 1000,
                'required_missions' => [1, 2, 3, 4, 5, 6, 7, 8],
                'required_competences' => [1, 2, 3, 4]
            ]
        ];

        foreach ($ranks as $rank) {
            Rank::create($rank);
        }
    }
}
