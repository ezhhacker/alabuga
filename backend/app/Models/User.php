<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'current_rank_id',
        'experience',
        'mana',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'experience' => 'integer',
            'mana' => 'integer',
        ];
    }

    public function rank()
    {
        return $this->belongsTo(Rank::class, 'current_rank_id');
    }

    public function missions()
    {
        return $this->belongsToMany(Mission::class, 'user_missions')
            ->withPivot(['status', 'started_at', 'completed_at', 'evidence'])
            ->withTimestamps();
    }

    public function artifacts()
    {
        return $this->belongsToMany(Artifact::class, 'user_artifacts')
            ->withPivot(['obtained_at'])
            ->withTimestamps();
    }

    public function competences()
    {
        return $this->belongsToMany(Competence::class, 'user_competences')
            ->withPivot(['level', 'experience'])
            ->withTimestamps();
    }

    public function logs()
    {
        return $this->hasMany(Log::class);
    }

    public function theme()
    {
        return $this->belongsTo(Theme::class, 'active_theme_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
