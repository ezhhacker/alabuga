<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'experience_reward',
        'mana_reward',
        'required_rank_id',
        'category',
        'branch',
        'competence_rewards',
        'artifact_id',
        'requirements',
        'steps',
    ];

    protected function casts(): array
    {
        return [
            'experience_reward' => 'integer',
            'mana_reward' => 'integer',
            'required_rank_id' => 'integer',
            'competence_rewards' => 'array',
            'artifact_id' => 'integer',
            'requirements' => 'array',
            'steps' => 'array',
        ];
    }

    public function requiredRank()
    {
        return $this->belongsTo(Rank::class, 'required_rank_id');
    }

    public function artifact()
    {
        return $this->belongsTo(Artifact::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_missions')
            ->withPivot(['status', 'started_at', 'completed_at', 'evidence'])
            ->withTimestamps();
    }

    public function competences()
    {
        return $this->belongsToMany(Competence::class, 'mission_competences');
    }
}
