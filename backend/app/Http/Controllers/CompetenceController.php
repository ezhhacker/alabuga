<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Competence;

class CompetenceController extends Controller
{
    /**
     * Список компетенций
     *
     * Получение списка всех доступных компетенций
     *
     * @authenticated
     *
     * @response 200 scenario="success" {
     *   "success": true,
     *   "data": [
     *     {
     *       "id": 1,
     *       "name": "Вера в дело",
     *       "description": "Умение верить в успех проекта",
     *       "max_level": 5
     *     }
     *   ]
     * }
     */
    public function index()
    {
        try {
            $competences = Competence::all();

            return response()->json([
                'success' => true,
                'data' => $competences
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'COMPETENCES_ERROR',
                    'message' => 'Ошибка загрузки компетенций'
                ]
            ], 500);
        }
    }
}
