<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoreItem;

class StoreController extends Controller
{
    /**
     * Список товаров в магазине
     *
     * Получение списка всех товаров доступных для покупки
     *
     * @authenticated
     *
     * @response 200 scenario="success" {
     *   "success": true,
     *   "data": {
     *     "items": [
     *       {
     *         "id": 1,
     *         "name": "Усилитель опыта",
     *         "description": "Увеличивает получаемый опыт на 50%",
     *         "price": 100,
     *         "category": "booster",
     *         "image": "exp_booster.png"
     *       }
     *     ]
     *   }
     * }
     */
    public function index()
    {
        try {
            $items = StoreItem::all();

            return response()->json([
                'success' => true,
                'data' => [
                    'items' => $items
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'STORE_ERROR',
                    'message' => 'Ошибка загрузки товаров'
                ]
            ], 500);
        }
    }
}
