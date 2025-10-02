<?php

namespace Database\Seeders;

use App\Models\Mission;
use Illuminate\Database\Seeder;

class MissionSeeder extends Seeder
{
    public function run(): void
    {
        $missions = [
            [
                'title' => 'Первые шаги',
                'description' => 'Создайте свой первый проект и изучите основы разработки',
                'experience_reward' => 50,
                'mana_reward' => 25,
                'required_rank_id' => 1,
                'category' => 'Обучение',
                'branch' => 'Основы',
                'competence_rewards' => [1],
                'artifact_id' => 1,
                'requirements' => ['Базовые знания программирования'],
                'steps' => [
                    'Создайте новый проект',
                    'Напишите первую программу',
                    'Запустите и протестируйте'
                ]
            ],
            [
                'title' => 'React Мастер',
                'description' => 'Изучите React и создайте компонент',
                'experience_reward' => 100,
                'mana_reward' => 50,
                'required_rank_id' => 2,
                'category' => 'Frontend',
                'branch' => 'React',
                'competence_rewards' => [1, 2],
                'artifact_id' => 2,
                'requirements' => ['Знание JavaScript', 'Основы HTML/CSS'],
                'steps' => [
                    'Установите React',
                    'Создайте компонент',
                    'Добавьте стили'
                ]
            ],
            [
                'title' => 'Backend API',
                'description' => 'Создайте REST API на Laravel',
                'experience_reward' => 150,
                'mana_reward' => 75,
                'required_rank_id' => 2,
                'category' => 'Backend',
                'branch' => 'Laravel',
                'competence_rewards' => [1, 3],
                'artifact_id' => 3,
                'requirements' => ['Знание PHP', 'Основы Laravel'],
                'steps' => [
                    'Создайте контроллер',
                    'Настройте маршруты',
                    'Добавьте валидацию'
                ]
            ],
            [
                'title' => 'База данных',
                'description' => 'Спроектируйте и создайте базу данных',
                'experience_reward' => 120,
                'mana_reward' => 60,
                'required_rank_id' => 2,
                'category' => 'Database',
                'branch' => 'SQL',
                'competence_rewards' => [3],
                'artifact_id' => null,
                'requirements' => ['Основы SQL'],
                'steps' => [
                    'Спроектируйте схему',
                    'Создайте таблицы',
                    'Добавьте индексы'
                ]
            ],
            [
                'title' => 'Деплой',
                'description' => 'Разверните приложение на сервере',
                'experience_reward' => 200,
                'mana_reward' => 100,
                'required_rank_id' => 3,
                'category' => 'DevOps',
                'branch' => 'Deployment',
                'competence_rewards' => [1, 4],
                'artifact_id' => 4,
                'requirements' => ['Знание Docker', 'Основы Linux'],
                'steps' => [
                    'Настройте Docker',
                    'Создайте docker-compose',
                    'Разверните на сервере'
                ]
            ]
        ];

        foreach ($missions as $mission) {
            Mission::create($mission);
        }
    }
}
