<?php

namespace App\Actions\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginUserAction
{
    public function execute(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages(
                [
                    'email' => ['The provided credentials are incorrect.'],
                ]
            );
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $token = $user->createToken("user-login")->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }
}
