<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'max_level',
    ];

    protected function casts(): array
    {
        return [
            'max_level' => 'integer',
        ];
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_competences')
            ->withPivot(['level', 'experience'])
            ->withTimestamps();
    }

    public function missions()
    {
        return $this->belongsToMany(Mission::class, 'mission_competences');
    }
}
