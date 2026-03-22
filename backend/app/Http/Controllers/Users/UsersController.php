<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ListUsersRequest;
use App\Http\Resources\UserListResource;
use App\Services\Users\UsersService;
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
}
