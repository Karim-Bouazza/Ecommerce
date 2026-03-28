<?php

namespace App\Services\Users;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    public function createUser(array $data): User
    {
        return DB::transaction(function () use ($data): User {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'first_name' => $data['first_name'] ?? null,
                'last_name' => $data['last_name'] ?? null,
                'phone_number' => $data['phone_number'] ?? null,
                'province' => $data['province'] ?? null,
                'city' => $data['city'] ?? null,
            ]);

            $user->assignRole($data['role']);

            return $user->load('roles:id,name');
        });
    }
}
