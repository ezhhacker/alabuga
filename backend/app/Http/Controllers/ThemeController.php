<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ThemeController extends Controller
{
    public function index()
    {
        $themes = Theme::where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'data' => $themes
        ]);
    }

    public function activate($id)
    {
        $theme = Theme::findOrFail($id);
        $user = Auth::user();

        $user->update(['active_theme_id' => $theme->id]);

        return response()->json([
            'success' => true,
            'data' => [
                'theme_id' => $theme->id,
                'activated_at' => now()
            ],
            'message' => 'Тема успешно активирована'
        ]);
    }
}
