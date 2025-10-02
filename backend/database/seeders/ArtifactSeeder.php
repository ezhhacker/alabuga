<?php

namespace Database\Seeders;

use App\Models\Artifact;
use Illuminate\Database\Seeder;

class ArtifactSeeder extends Seeder
{
    public function run(): void
    {
        $artifacts = [
            [
                'name' => 'Амулет тестирования',
                'description' => 'Помогает находить ошибки в коде',
                'image' => '/images/artifacts/test-amulet.png',
                'rarity' => 'common'
            ],
            [
                'name' => 'Кольцо компиляции',
                'description' => 'Ускоряет процесс разработки',
                'image' => '/images/artifacts/compile-ring.png',
                'rarity' => 'rare'
            ],
            [
                'name' => 'Щит отладки',
                'description' => 'Защищает от багов и ошибок',
                'image' => '/images/artifacts/debug-shield.png',
                'rarity' => 'epic'
            ],
            [
                'name' => 'Код-меч',
                'description' => 'Легендарный меч из чистого кода',
                'image' => '/images/artifacts/code-sword.png',
                'rarity' => 'legendary'
            ]
        ];

        foreach ($artifacts as $artifact) {
            Artifact::create($artifact);
        }
    }
}
