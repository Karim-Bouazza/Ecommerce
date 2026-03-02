<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\LoginUserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request, LoginUserAction $action)
    {
        $user = $action->execute($request->validated());

        $request->session()->regenerate();

        return response()->json(
            [
                'message' => 'User logged in successfully',
                'user' => $user
            ],
            200
        );
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'User logged out successfully'
        ], 200)->cookie('token', null, -1);
    }
}
