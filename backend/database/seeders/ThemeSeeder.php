<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        $themes = [
            [
                'name' => 'space',
                'display_name' => 'Космическая Одиссея',
                'description' => 'Исследуйте бесконечные просторы вселенной',
                'category' => 'space',
                'is_active' => true,
                'is_default' => true,
                'is_custom' => false,
                'user_categories' => ['all'],
                'created_by' => null,
                'colors' => [
                    'primary' => '#4ecdc4',
                    'secondary' => '#667eea',
                    'accent' => '#ffd700',
                    'background' => '#0a0a0a',
                    'surface' => '#1a1a1a',
                    'text' => '#ffffff',
                    'textSecondary' => '#cccccc',
                    'border' => '#333333',
                    'success' => '#4caf50',
                    'warning' => '#ff9800',
                    'error' => '#f44336',
                    'info' => '#2196f3'
                ],
                'gradients' => [
                    'main' => 'linear-gradient(135deg, #4ecdc4 0%, #667eea 100%)',
                    'card' => 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    'button' => 'linear-gradient(45deg, #4ecdc4, #667eea)',
                    'header' => 'linear-gradient(90deg, rgba(78, 205, 196, 0.8), rgba(102, 126, 234, 0.8))'
                ],
                'effects' => [
                    'blur' => 'blur(10px)',
                    'shadow' => '0 8px 32px rgba(0, 0, 0, 0.3)',
                    'glow' => '0 0 20px rgba(78, 205, 196, 0.3)'
                ],
                'icons' => [
                    'primary' => '🚀',
                    'secondary' => '⭐',
                    'accent' => '🌟'
                ]
            ],
            [
                'name' => 'fantasy',
                'display_name' => 'Фэнтези Мир',
                'description' => 'Магический мир полный приключений',
                'category' => 'fantasy',
                'is_active' => false,
                'is_default' => true,
                'is_custom' => false,
                'user_categories' => ['all'],
                'created_by' => null,
                'colors' => [
                    'primary' => '#8b4513',
                    'secondary' => '#228b22',
                    'accent' => '#ffd700',
                    'background' => '#2d1810',
                    'surface' => '#3d2810',
                    'text' => '#f4e4bc',
                    'textSecondary' => '#d4c4ac',
                    'border' => '#5d3810',
                    'success' => '#4caf50',
                    'warning' => '#ff9800',
                    'error' => '#f44336',
                    'info' => '#2196f3'
                ],
                'gradients' => [
                    'main' => 'linear-gradient(135deg, #8b4513 0%, #228b22 100%)',
                    'card' => 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    'button' => 'linear-gradient(45deg, #8b4513, #228b22)',
                    'header' => 'linear-gradient(90deg, rgba(139, 69, 19, 0.8), rgba(34, 139, 34, 0.8))'
                ],
                'effects' => [
                    'blur' => 'blur(10px)',
                    'shadow' => '0 8px 32px rgba(0, 0, 0, 0.3)',
                    'glow' => '0 0 20px rgba(255, 215, 0, 0.3)'
                ],
                'icons' => [
                    'primary' => '⚔️',
                    'secondary' => '🛡️',
                    'accent' => '🏰'
                ]
            ]
        ];

        foreach ($themes as $theme) {
            Theme::create($theme);
        }
    }
}
