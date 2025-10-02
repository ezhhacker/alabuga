<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\ArtifactController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\RankController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

Route::middleware(['jwt.auth'])->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);

    Route::get('users/profile', [UserController::class, 'profile']);
    Route::put('users/profile', [UserController::class, 'updateProfile']);

    Route::get('missions', [MissionController::class, 'index']);
    Route::get('missions/{id}', [MissionController::class, 'show']);
    Route::post('missions/{id}/start', [MissionController::class, 'start']);
    Route::post('missions/{id}/complete', [MissionController::class, 'complete']);

    Route::get('artifacts', [ArtifactController::class, 'index']);

    Route::get('competences', [CompetenceController::class, 'index']);

    Route::get('ranks/{id}', [RankController::class, 'show']);

    Route::get('themes', [ThemeController::class, 'index']);
    Route::post('themes/{id}/activate', [ThemeController::class, 'activate']);

    Route::get('store/items', [StoreController::class, 'index']);

    Route::get('stats/user', [StatsController::class, 'user']);
    Route::get('stats/leaderboard', [StatsController::class, 'leaderboard']);

    Route::prefix('admin')->group(function () {
        Route::get('themes', [AdminController::class, 'themes']);
        Route::post('themes', [AdminController::class, 'createTheme']);
        Route::put('themes/{id}', [AdminController::class, 'updateTheme']);
        Route::delete('themes/{id}', [AdminController::class, 'deleteTheme']);
        Route::post('themes/{id}/activate', [AdminController::class, 'activateTheme']);
    });
});
