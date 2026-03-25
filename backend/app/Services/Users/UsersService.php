<?php

namespace App\Services\Users;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UsersService
{
    public function paginateUsers(int $perPage = 15): LengthAwarePaginator
    {
        return User::query()
            ->with('roles:id,name')
            ->whereDoesntHave('roles', function ($query): void {
                $query->where('name', Role::CLIENT->value);
            })
            ->select(['id', 'name', 'email'])
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    /**
     * @throws ModelNotFoundException
     */
    public function findUserById(int $id): User
    {
        return User::query()
            ->with('roles:id,name')
            ->select([
                'id',
                'name',
                'email',
                'first_name',
                'last_name',
                'phone_number',
                'province',
                'city',
                'email_verified_at',
                'created_at',
                'updated_at',
            ])
            ->findOrFail($id);
    }
}
