<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Catalog\CategoriesController;
use App\Http\Controllers\Catalog\ProductsController;
use App\Http\Controllers\Orders\OrdersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Users\UsersController;
use Laravel\Sanctum\Sanctum;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// Users
Route::get('/users', [UsersController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::post('/users', [UsersController::class, 'store'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/users/{id}', [UsersController::class, 'show'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);

// Categories
Route::get('/categories', [CategoriesController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::post('/categories', [CategoriesController::class, 'store'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/categories/{id}', [CategoriesController::class, 'show'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);
Route::patch('/categories/{id}', [CategoriesController::class, 'update'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);
Route::delete('/categories/{id}', [CategoriesController::class, 'destroy'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);

// Products
Route::get('/products', [ProductsController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/products/filters', [ProductsController::class, 'filters'])->middleware(['auth:sanctum', 'role:admin']);
Route::post('/products', [ProductsController::class, 'store'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/products/{id}', [ProductsController::class, 'show'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);
Route::patch('/products/{id}', [ProductsController::class, 'update'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);
Route::delete('/products/{id}', [ProductsController::class, 'destroy'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);

// Orders
Route::get('/orders', [OrdersController::class, 'index'])->middleware(['auth:sanctum', 'role:admin']);
Route::get('/orders/{id}', [OrdersController::class, 'show'])
    ->whereNumber('id')
    ->middleware(['auth:sanctum', 'role:admin']);


// Public shop catalog
Route::get('/shop/products', [ProductsController::class, 'index']);
Route::get('/shop/products/filters', [ProductsController::class, 'filters']);
Route::get('/shop/products/{id}', [ProductsController::class, 'show'])
    ->whereNumber('id');
Route::get('/shop/categories', [CategoriesController::class, 'index']);

// Public shop orders
Route::post('/shop/orders', [OrdersController::class, 'store']);
