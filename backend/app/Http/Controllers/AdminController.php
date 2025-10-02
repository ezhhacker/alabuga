<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function themes()
    {
        $themes = Theme::all();

        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    public function createTheme(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:themes',
            'displayName' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'userCategories' => 'required|array',
            'colors' => 'required|array',
            'gradients' => 'required|array',
            'effects' => 'required|array',
            'icons' => 'required|array',
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

        $theme = Theme::create([
            'name' => $request->name,
            'display_name' => $request->displayName,
            'description' => $request->description,
            'category' => $request->category,
            'is_active' => false,
            'is_default' => false,
            'is_custom' => true,
            'user_categories' => $request->userCategories,
            'created_by' => Auth::id(),
            'colors' => $request->colors,
            'gradients' => $request->gradients,
            'effects' => $request->effects,
            'icons' => $request->icons,
        ]);

        return response()->json([
            'success' => true,
            'data' => $theme,
            'message' => 'Тема успешно создана'
        ], 201);
    }

    public function updateTheme(Request $request, $id)
    {
        $theme = Theme::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|unique:themes,name,' . $id,
            'displayName' => 'sometimes|string',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string',
            'userCategories' => 'sometimes|array',
            'colors' => 'sometimes|array',
            'gradients' => 'sometimes|array',
            'effects' => 'sometimes|array',
            'icons' => 'sometimes|array',
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

        $updateData = [];
        if ($request->has('name')) $updateData['name'] = $request->name;
        if ($request->has('displayName')) $updateData['display_name'] = $request->displayName;
        if ($request->has('description')) $updateData['description'] = $request->description;
        if ($request->has('category')) $updateData['category'] = $request->category;
        if ($request->has('userCategories')) $updateData['user_categories'] = $request->userCategories;
        if ($request->has('colors')) $updateData['colors'] = $request->colors;
        if ($request->has('gradients')) $updateData['gradients'] = $request->gradients;
        if ($request->has('effects')) $updateData['effects'] = $request->effects;
        if ($request->has('icons')) $updateData['icons'] = $request->icons;

        $theme->update($updateData);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $theme->id,
                'updatedAt' => $theme->updated_at
            ],
            'message' => 'Тема успешно обновлена'
        ]);
    }

    public function deleteTheme($id)
    {
        $theme = Theme::findOrFail($id);

        if ($theme->is_default) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'CANNOT_DELETE_DEFAULT',
                    'message' => 'Нельзя удалить системную тему'
                ]
            ], 403);
        }

        $theme->delete();

        return response()->json([
            'success' => true,
            'message' => 'Тема успешно удалена'
        ]);
    }

    public function activateTheme($id)
    {
        $theme = Theme::findOrFail($id);

        Theme::where('is_active', true)->update(['is_active' => false]);
        $theme->update(['is_active' => true]);

        return response()->json([
            'success' => true,
            'data' => [
                'theme_id' => $theme->id,
                'activated_at' => now()
            ],
            'message' => 'Тема активирована для всех пользователей'
        ]);
    }
}
