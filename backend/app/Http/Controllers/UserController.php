<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function profile()
    {
        $user = Auth::user();
        $user->load(['rank', 'theme']);

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
                     ->first()->experience - $user->rank->min_experience)) * 100 : 0
        ];

        return response()->json([
            'success' => true,
            'data' => array_merge($user->toArray(), [
                'stats' => $stats
            ])
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . Auth::id(),
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'VALIDATION_ERROR',
                    'message' => 'Неверные данные',
                    'details' => $validator->errors()
                ]
            ], 400);
        }

        $user = Auth::user();
        $user->update($request->only(['name', 'email']));

        return response()->json([
            'success' => true,
            'data' => $user,
            'message' => 'Профиль успешно обновлен'
        ]);
    }
}
