<?php

namespace App\Services\Users;

use Illuminate\Support\Collection;
use App\Models\User;

class UsersService
{
    public function getAllAdminstrativeUsers(): Collection
    {
        return User::query()->whereDoesntHave('roles', function ($query) {
            $query->where('name', 'client');
        })->with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ];
        });
    }
}
