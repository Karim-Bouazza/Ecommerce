<?php

namespace App\Actions\Auth;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class RegisterUserAction
{
    public function execute(array $data): array
    {

        return DB::transaction(function () use ($data) {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $user->assignRole(Role::CLIENT->value);

            $token = $user->createToken("auth-token")->plainTextToken;

            return [
                'user' => $user,
                'token' => $token,
            ];
        });
    }
}
