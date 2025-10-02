<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function user()
    {
        $user = Auth::user();
        $user->load(['rank']);

        $stats = [
            'total_experience' => $user->experience,
            'total_mana' => $user->mana,
            'missions_completed' => $user->missions()->wherePivot('status', 'completed')->count(),
            'artifacts_obtained' => $user->artifacts()->count(),
            'competences_maxed' => $user->competences()->wherePivot('level', '>=', 10)->count(),
            'current_rank_progress' => $user->rank ?
                (($user->experience - $user->rank->min_experience) /
                 (User::where('experience', '>', $user->rank->min_experience)
                     ->orderBy('experience')
                     ->first()->experience - $user->rank->min_experience)) * 100 : 0,
            'rank_history' => $user->logs()
                ->where('event_type', 'rank_up')
                ->orderBy('created_at')
                ->get()
                ->map(function ($log) {
                    return [
                        'rank' => $log->data['rank_name'] ?? 'Unknown',
                        'achieved_at' => $log->created_at
                    ];
                })
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function leaderboard(Request $request)
    {
        $period = $request->get('period', 'week');
        $limit = $request->get('limit', 10);

        $query = User::select('users.*', DB::raw('COUNT(user_missions.mission_id) as missions_completed'))
            ->leftJoin('user_missions', function($join) {
                $join->on('users.id', '=', 'user_missions.user_id')
                     ->where('user_missions.status', '=', 'completed');
            })
            ->groupBy('users.id')
            ->orderBy('users.experience', 'desc');

        if ($period === 'week') {
            $query->where('users.updated_at', '>=', now()->subWeek());
        } elseif ($period === 'month') {
            $query->where('users.updated_at', '>=', now()->subMonth());
        }

        $leaderboard = $query->limit($limit)->get()->map(function ($user, $index) {
            return [
                'position' => $index + 1,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'rank' => $user->rank ? $user->rank->name : 'Новичок'
                ],
                'experience' => $user->experience,
                'missions_completed' => $user->missions_completed
            ];
        });

        $user = Auth::user();
        $userPosition = User::where('experience', '>', $user->experience)->count() + 1;

        return response()->json([
            'success' => true,
            'data' => [
                'leaderboard' => $leaderboard,
                'user_position' => $userPosition,
                'period' => $period
            ]
        ]);
    }
}
