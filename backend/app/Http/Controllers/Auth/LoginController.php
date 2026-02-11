<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\LoginUserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(LoginRequest $request, LoginUserAction $action)
    {
        $result = $action->execute($request->validated());

        return response()->json([
            'message' => 'User logged in successfully',
            'user' => $result['user'],
            'token' => $result['token'],
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'User logged out successfully'
        ], 200);
    }
}
