<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * @group Аутентификация
 *
 * API для аутентификации пользователей в системе геймификации
 */
class AuthController extends Controller
{
    /**
     * Вход в систему
     *
     * Аутентификация пользователя по email и паролю
     *
     * @param \Illuminate\Http\Request $request
     * @bodyParam email string required Email пользователя. Example: user@example.com
     * @bodyParam password string required Пароль пользователя. Example: password123
     *
     * @response 200 scenario="success" {
     *   "success": true,
     *   "data": {
     *     "user": {
     *       "id": 1,
     *       "name": "Иван Разработчик",
     *       "email": "user@example.com",
     *       "current_rank_id": 2,
     *       "experience": 250,
     *       "mana": 500,
     *       "created_at": "2024-01-15T10:00:00Z",
     *       "rank": {
     *         "id": 2,
     *         "name": "Исследователь",
     *         "min_experience": 100
     *       },
     *       "theme": {
     *         "id": 1,
     *         "name": "space",
     *         "display_name": "Космическая Одиссея"
     *       }
     *     },
     *     "token": "jwt_token_here"
     *   },
     *   "message": "Успешный вход в систему"
     * }
     *
     * @response 400 scenario="validation_error" {
     *   "success": false,
     *   "error": {
     *     "code": "VALIDATION_ERROR",
     *     "message": "Неверные данные",
     *     "details": {
     *       "email": ["Поле email обязательно для заполнения"]
     *     }
     *   }
     * }
     *
     * @response 401 scenario="invalid_credentials" {
     *   "success": false,
     *   "error": {
     *     "code": "INVALID_CREDENTIALS",
     *     "message": "Неверный email или пароль"
     *   }
     * }
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
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

        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'INVALID_CREDENTIALS',
                    'message' => 'Неверный email или пароль'
                ]
            ], 401);
        }

        $user = Auth::user();
        $user->load(['rank', 'theme']);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'token' => $token
            ],
            'message' => 'Успешный вход в систему'
        ]);
    }

    /**
     * Регистрация пользователя
     *
     * Создание нового пользователя в системе
     *
     * @param \Illuminate\Http\Request $request
     * @bodyParam name string required Имя пользователя. Example: Иван Разработчик
     * @bodyParam email string required Email пользователя. Example: user@example.com
     * @bodyParam password string required Пароль пользователя (минимум 6 символов). Example: password123
     *
     * @response 201 scenario="success" {
     *   "success": true,
     *   "data": {
     *     "user": {
     *       "id": 2,
     *       "name": "Новый Пользователь",
     *       "email": "new@example.com",
     *       "current_rank_id": 1,
     *       "experience": 0,
     *       "mana": 100,
     *       "created_at": "2024-01-20T12:00:00Z",
     *       "rank": {
     *         "id": 1,
     *         "name": "Новичок",
     *         "min_experience": 0
     *       }
     *     },
     *     "token": "jwt_token_here"
     *   },
     *   "message": "Пользователь успешно зарегистрирован"
     * }
     *
     * @response 400 scenario="validation_error" {
     *   "success": false,
     *   "error": {
     *     "code": "VALIDATION_ERROR",
     *     "message": "Неверные данные",
     *     "details": {
     *       "email": ["Поле email уже занято"]
     *     }
     *   }
     * }
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
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

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'current_rank_id' => 1,
            'experience' => 0,
            'mana' => 100,
        ]);

        $user->load(['rank', 'theme']);
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'token' => $token
            ],
            'message' => 'Пользователь успешно зарегистрирован'
        ], 201);
    }

    /**
     * Выход из системы
     *
     * Инвалидация JWT токена пользователя
     *
     * @authenticated
     *
     * @response 200 scenario="success" {
     *   "success": true,
     *   "message": "Успешный выход из системы"
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
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'success' => true,
            'message' => 'Успешный выход из системы'
        ]);
    }

    /**
     * Получение текущего пользователя
     *
     * Возвращает информацию о текущем авторизованном пользователе с полной статистикой
     *
     * @authenticated
     *
     * @response 200 scenario="success" {
     *   "success": true,
     *   "data": {
     *     "id": 1,
     *     "name": "Иван Разработчик",
     *     "email": "user@example.com",
     *     "current_rank_id": 2,
     *     "experience": 250,
     *     "mana": 500,
     *     "created_at": "2024-01-15T10:00:00Z",
     *     "rank": {
     *       "id": 2,
     *       "name": "Исследователь",
     *       "min_experience": 100
     *     },
     *     "theme": {
     *       "id": 1,
     *       "name": "space",
     *       "display_name": "Космическая Одиссея"
     *     },
     *     "stats": {
     *       "total_experience": 250,
     *       "total_mana": 500,
     *       "missions_completed": 3,
     *       "artifacts_obtained": 2,
     *       "competences_maxed": 0,
     *       "current_rank_progress": 25.0
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
    public function me()
    {
        $user = Auth::user();
        $user->load(['rank', 'theme']);

        $stats = [
            'total_experience' => $user->experience,
            'total_mana' => $user->mana,
            'missions_completed' => $user->missions()->wherePivot('status', 'completed')->count(),
            'artifacts_obtained' => $user->artifacts()->count(),
            'competences_maxed' => $user->competences()->wherePivot('level', '>=', 10)->count(),
            'current_rank_progress' => $this->calculateRankProgress($user)
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'stats' => $stats
            ]
        ]);
    }

    private function calculateRankProgress($user)
    {
        if (!$user->rank) {
            return 0;
        }

        $currentRank = $user->rank;
        $nextRank = \App\Models\Rank::where('min_experience', '>', $currentRank->min_experience)
            ->orderBy('min_experience')
            ->first();

        // Если нет следующего ранга, прогресс 100%
        if (!$nextRank) {
            return 100;
        }

        $currentExp = $user->experience;
        $currentRankExp = $currentRank->min_experience;
        $nextRankExp = $nextRank->min_experience;

        // Если опыт меньше текущего ранга, прогресс 0%
        if ($currentExp < $currentRankExp) {
            return 0;
        }

        // Если опыт больше следующего ранга, прогресс 100%
        if ($currentExp >= $nextRankExp) {
            return 100;
        }

        // Расчет прогресса между рангами
        $progress = (($currentExp - $currentRankExp) / ($nextRankExp - $currentRankExp)) * 100;

        // Ограничиваем прогресс от 0 до 100
        return max(0, min(100, round($progress, 1)));
    }
}
