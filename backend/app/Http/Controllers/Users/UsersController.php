<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Services\Users\UsersService;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    public function __construct(
        private UsersService $usersService
    ) {}

    public function index(): JsonResponse
    {
        $users = $this->usersService->getAllAdminstrativeUsers();

        return response()->json($users);
    }
}
