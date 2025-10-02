<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArtifactController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $artifacts = $user->artifacts()->withPivot('obtained_at')->get();

        return response()->json([
            'success' => true,
            'data' => $artifacts
        ]);
    }
}
