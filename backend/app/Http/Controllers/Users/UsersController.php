<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\Users\UsersService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UsersController extends Controller
{
    public function __construct(
        private UsersService $usersService
    ) {}

    public function index(): AnonymousResourceCollection
    {

        return UserResource::collection($this->usersService->getAllAdministrativeUsers());
    }
}
