<?php

namespace App\Http\Controllers\Users;

use App\Enums\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\ListUsersRequest;
use App\Http\Resources\UserListResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Users\UsersService;
use App\Traits\HasPagination;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UsersController extends Controller
{
    use HasPagination;

    public function __construct(
        private UsersService $usersService
    ) {}

    public function index(ListUsersRequest $request): AnonymousResourceCollection
    {
        $query = User::query()
            ->with('roles:id,name')
            ->whereDoesntHave('roles', function ($query): void {
                $query->where('name', Role::CLIENT->value);
            })
            ->select(['id', 'name', 'email'])
            ->orderBy('id', 'desc');

        return UserListResource::collection($this->items($query, $request));
    }

    public function show(int $id): UserResource
    {
        $user = $this->usersService->findUserById($id);

        return new UserResource($user);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = $this->usersService->createUser($request->validated());

        return (new UserResource($user))
            ->response()
            ->setStatusCode(201);
    }
}
