<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'category',
        'is_active',
        'is_default',
        'is_custom',
        'user_categories',
        'created_by',
        'colors',
        'gradients',
        'effects',
        'icons',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_default' => 'boolean',
            'is_custom' => 'boolean',
            'user_categories' => 'array',
            'created_by' => 'integer',
            'colors' => 'array',
            'gradients' => 'array',
            'effects' => 'array',
            'icons' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'active_theme_id');
    }
}
