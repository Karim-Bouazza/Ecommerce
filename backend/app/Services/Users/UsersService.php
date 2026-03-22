<?php

namespace App\Services\Users;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UsersService
{
    public function paginateUsers(int $perPage = 15): LengthAwarePaginator
    {
        return User::query()
            ->select(['id', 'name', 'email'])
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }
}
