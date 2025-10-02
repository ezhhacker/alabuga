<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StoreItem;

class StoreItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Усилитель опыта',
                'description' => 'Увеличивает получаемый опыт на 50% на 1 час',
                'price' => 100,
                'category' => 'booster',
                'image' => 'exp_booster.png'
            ],
            [
                'name' => 'Усилитель маны',
                'description' => 'Увеличивает получаемую ману на 50% на 1 час',
                'price' => 80,
                'category' => 'booster',
                'image' => 'mana_booster.png'
            ],
            [
                'name' => 'Золотая тема',
                'description' => 'Эксклюзивная золотая тема для интерфейса',
                'price' => 200,
                'category' => 'theme',
                'image' => 'gold_theme.png'
            ],
            [
                'name' => 'Космическая тема',
                'description' => 'Тема в космическом стиле с анимациями',
                'price' => 150,
                'category' => 'theme',
                'image' => 'space_theme.png'
            ],
            [
                'name' => 'Пропуск миссии',
                'description' => 'Позволяет пропустить любую миссию',
                'price' => 300,
                'category' => 'utility',
                'image' => 'mission_skip.png'
            ]
        ];

        foreach ($items as $item) {
            StoreItem::create($item);
        }
    }
}
