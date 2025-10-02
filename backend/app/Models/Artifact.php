<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artifact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'rarity',
    ];

    protected function casts(): array
    {
        return [
            'rarity' => 'string',
        ];
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_artifacts')
            ->withPivot(['obtained_at'])
            ->withTimestamps();
    }

    public function missions()
    {
        return $this->hasMany(Mission::class);
    }
}
