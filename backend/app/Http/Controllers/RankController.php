<?php

namespace App\Http\Controllers;

use App\Models\Rank;
use Illuminate\Http\Request;

class RankController extends Controller
{
    /**
     * @OA\Get(
     *     path="/ranks/{id}",
     *     summary="Получить информацию о ранге",
     *     tags={"Ranks"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID ранга",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успешный ответ",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/Rank"),
     *             @OA\Property(property="message", type="string", example="Ранг успешно получен")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Ранг не найден"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Неавторизованный доступ"
     *     )
     * )
     */
    public function show($id)
    {
        $rank = Rank::find($id);

        if (!$rank) {
            return response()->json([
                'success' => false,
                'message' => 'Ранг не найден'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $rank,
            'message' => 'Ранг успешно получен'
        ]);
    }
}
