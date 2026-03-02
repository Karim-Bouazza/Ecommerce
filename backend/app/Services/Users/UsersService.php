<?php

namespace App\Services\Users;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UsersService
{
    public function getAllAdministrativeUsers(): Collection
    {
        return User::role('admin')->with('roles:id,name')->get();
    }
}
