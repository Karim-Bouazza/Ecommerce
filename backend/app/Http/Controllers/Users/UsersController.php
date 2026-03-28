<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\ListUsersRequest;
use App\Http\Resources\UserListResource;
use App\Http\Resources\UserResource;
use App\Services\Users\UsersService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UsersController extends Controller
{
    public function __construct(
        private UsersService $usersService
    ) {}

    public function index(ListUsersRequest $request): AnonymousResourceCollection
    {
        $paginatedUsers = $this->usersService->paginateUsers($request->perPage());

        return UserListResource::collection(
            Collection::make($paginatedUsers->items())
        );
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
