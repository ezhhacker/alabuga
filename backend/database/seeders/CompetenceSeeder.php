<?php

namespace Database\Seeders;

use App\Models\Competence;
use Illuminate\Database\Seeder;

class CompetenceSeeder extends Seeder
{
    public function run(): void
    {
        $competences = [
            [
                'name' => 'Программирование',
                'description' => 'Навыки разработки программного обеспечения',
                'max_level' => 10
            ],
            [
                'name' => 'Дизайн',
                'description' => 'Создание пользовательских интерфейсов',
                'max_level' => 10
            ],
            [
                'name' => 'Аналитика',
                'description' => 'Анализ данных и принятие решений',
                'max_level' => 10
            ],
            [
                'name' => 'Коммуникация',
                'description' => 'Навыки общения и работы в команде',
                'max_level' => 10
            ]
        ];

        foreach ($competences as $competence) {
            Competence::create($competence);
        }
    }
}
