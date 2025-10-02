<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * @group Миссии
 *
 * API для управления миссиями в системе геймификации
 */
class MissionController extends Controller
{
    /**
     * Список миссий
     *
     * Получение списка миссий с возможностью фильтрации и пагинации
     *
     * @authenticated
     *
     * @queryParam category string Фильтр по категории миссии. Example: Frontend
     * @queryParam branch string Фильтр по ветке миссии. Example: React
     * @queryParam status string Фильтр по статусу миссии (available, in_progress, completed). Example: available
     * @queryParam page integer Номер страницы. Example: 1
     * @queryParam limit integer Количество миссий на странице. Example: 20
     *
     * @response 200 scenario="success" {
     *   "success": true,
     *   "data": {
     *     "missions": [
     *       {
     *         "id": 1,
     *         "title": "Первые шаги",
     *         "description": "Создайте свой первый проект",
     *         "experience_reward": 50,
     *         "mana_reward": 25,
     *         "required_rank_id": 1,
     *         "category": "Обучение",
     *         "branch": "Основы",
     *         "competence_rewards": [1],
     *         "artifact_id": 4,
     *         "status": "available",
     *         "progress": 0,
     *         "required_rank": {
     *           "id": 1,
     *           "name": "Новичок",
     *           "min_experience": 0
     *         },
     *         "artifact": {
     *           "id": 4,
     *           "name": "Амулет тестирования",
     *           "rarity": "common"
     *         }
     *       }
     *     ],
     *     "pagination": {
     *       "total": 10,
     *       "page": 1,
     *       "limit": 20,
     *       "pages": 1
     *     }
     *   }
     * }
     *
     * @response 401 scenario="unauthorized" {
     *   "success": false,
     *   "error": {
     *     "code": "TOKEN_INVALID",
     *     "message": "Неверный токен"
     *   }
     * }
     */
    public function index(Request $request)
    {
        $query = Mission::with(['requiredRank', 'artifact', 'competences']);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('branch')) {
            $query->where('branch', $request->branch);
        }

        if ($request->has('status')) {
            $user = Auth::user();
            switch ($request->status) {
                case 'available':
                    $query->where('required_rank_id', '<=', $user->current_rank_id)
                          ->whereNotIn('id', $user->missions()->pluck('mission_id'));
                    break;
                case 'in_progress':
                    $query->whereIn('id', $user->missions()->wherePivot('status', 'in_progress')->pluck('mission_id'));
                    break;
                case 'completed':
                    $query->whereIn('id', $user->missions()->wherePivot('status', 'completed')->pluck('mission_id'));
                    break;
            }
        }

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        $missions = $query->paginate($limit, ['*'], 'page', $page);

        $user = Auth::user();
        $missions->getCollection()->transform(function ($mission) use ($user) {
            $userMission = $user->missions()->where('mission_id', $mission->id)->first();
            $mission->status = $userMission ? $userMission->pivot->status : 'available';
            $mission->progress = $userMission ? $userMission->pivot->progress : 0;
            return $mission;
        });

        return response()->json([
            'success' => true,
            'data' => [
                'missions' => $missions->items(),
                'pagination' => [
                    'total' => $missions->total(),
                    'page' => $missions->currentPage(),
                    'limit' => $missions->perPage(),
                    'pages' => $missions->lastPage()
                ]
            ]
        ]);
    }

    public function show($id)
    {
        $mission = Mission::with(['requiredRank', 'artifact', 'competences'])->findOrFail($id);
        $user = Auth::user();

        $userMission = $user->missions()->where('mission_id', $mission->id)->first();
        $mission->status = $userMission ? $userMission->pivot->status : 'available';
        $mission->progress = $userMission ? $userMission->pivot->progress : 0;

        return response()->json([
            'success' => true,
            'data' => $mission
        ]);
    }

    public function start($id)
    {
        $mission = Mission::findOrFail($id);
        $user = Auth::user();

        if ($user->current_rank_id < $mission->required_rank_id) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'INSUFFICIENT_RANK',
                    'message' => 'Недостаточный ранг для выполнения миссии'
                ]
            ], 403);
        }

        $existingMission = $user->missions()->where('mission_id', $mission->id)->first();
        if ($existingMission) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'MISSION_ALREADY_STARTED',
                    'message' => 'Миссия уже начата'
                ]
            ], 400);
        }

        $user->missions()->attach($mission->id, [
            'status' => 'in_progress',
            'started_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'mission_id' => $mission->id,
                'status' => 'in_progress',
                'started_at' => now()
            ],
            'message' => 'Миссия начата'
        ]);
    }

    public function complete(Request $request, $id)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'evidence' => 'required|string'
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

        $mission = Mission::findOrFail($id);
        $user = Auth::user();

        $userMission = $user->missions()->where('mission_id', $mission->id)->first();
        if (!$userMission || $userMission->pivot->status !== 'in_progress') {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'MISSION_NOT_IN_PROGRESS',
                    'message' => 'Миссия не в процессе выполнения'
                ]
            ], 400);
        }

        DB::transaction(function () use ($user, $mission, $request) {
            $user->missions()->updateExistingPivot($mission->id, [
                'status' => 'completed',
                'completed_at' => now(),
                'evidence' => $request->evidence
            ]);

            $user->increment('experience', $mission->experience_reward);
            $user->increment('mana', $mission->mana_reward);

            if ($mission->artifact_id) {
                $user->artifacts()->attach($mission->artifact_id, [
                    'obtained_at' => now()
                ]);
            }

            if ($mission->competence_rewards) {
                foreach ($mission->competence_rewards as $competenceId) {
                    $existingCompetence = $user->competences()->where('competence_id', $competenceId)->first();
                    if ($existingCompetence) {
                        $user->competences()->updateExistingPivot($competenceId, [
                            'experience' => $existingCompetence->pivot->experience + 10
                        ]);
                    } else {
                        $user->competences()->attach($competenceId, [
                            'level' => 1,
                            'experience' => 10
                        ]);
                    }
                }
            }

            $user->logs()->create([
                'event_type' => 'mission_completed',
                'description' => "Завершена миссия: {$mission->title}",
                'data' => [
                    'mission_id' => $mission->id,
                    'experience_gained' => $mission->experience_reward,
                    'mana_gained' => $mission->mana_reward
                ]
            ]);
        });

        return response()->json([
            'success' => true,
            'data' => [
                'mission_id' => $mission->id,
                'status' => 'completed',
                'completed_at' => now(),
                'rewards' => [
                    'experience' => $mission->experience_reward,
                    'mana' => $mission->mana_reward,
                    'artifacts' => $mission->artifact ? [$mission->artifact] : []
                ]
            ],
            'message' => 'Миссия успешно завершена'
        ]);
    }
}
