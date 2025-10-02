<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JWTMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => [
                        'code' => 'USER_NOT_FOUND',
                        'message' => 'Пользователь не найден'
                    ]
                ], 401);
            }
        } catch (TokenExpiredException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'TOKEN_EXPIRED',
                    'message' => 'Токен истек'
                ]
            ], 401);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'TOKEN_INVALID',
                    'message' => 'Неверный токен'
                ]
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'TOKEN_ABSENT',
                    'message' => 'Токен не предоставлен'
                ]
            ], 401);
        }

        return $next($request);
    }
}
