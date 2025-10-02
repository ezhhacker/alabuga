<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'min_experience',
        'required_missions',
        'required_competences',
    ];

    protected function casts(): array
    {
        return [
            'min_experience' => 'integer',
            'required_missions' => 'array',
            'required_competences' => 'array',
        ];
    }

    public function users()
    {
        return $this->hasMany(User::class, 'current_rank_id');
    }
}
