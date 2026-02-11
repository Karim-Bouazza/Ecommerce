<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\RegisterUserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;

class RegisterController extends Controller
{
    public function register(RegisterRequest $request, RegisterUserAction $action)
    {
        $data = $action->execute($request->validated());

        return response()->json([
            'message' => 'User registered successfully',
            'data' => [
                'user' => $data['user'],
                'token' => $data['token'],
            ]
        ], 201);
    }
}
