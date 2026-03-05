<?php
// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Models\Category;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\ClientAuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Client\ClientController;

// Admin Auth Routes
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:admin')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', [AdminAuthController::class, 'me']);
    });
});

// Client Auth Routes
Route::prefix('client')->group(function () {
    Route::post('/register', [ClientAuthController::class, 'register']);
    Route::post('/login', [ClientAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [ClientAuthController::class, 'logout']);
        Route::get('/me', [ClientAuthController::class, 'me']);
    });
});

// Protected Admin Category Routes - Make sure these are NOT inside any other admin prefix
Route::middleware(['auth:admin'])->group(function () {
    // Category management routes
    Route::prefix('admin')->group(function () {
        // GET routes
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::get('/categories/stats', [CategoryController::class, 'getStats']);
        Route::get('/categories/dropdown', [CategoryController::class, 'getDropdown']);
        Route::get('/categories/{category}', [CategoryController::class, 'show']);

        // POST routes (for create)
        Route::post('/categories', [CategoryController::class, 'store']);

        // PUT/PATCH routes (for update)
        Route::put('/categories/{category}', [CategoryController::class, 'update']);
        Route::patch('/categories/{category}', [CategoryController::class, 'update']);

        // DELETE routes
        Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
        Route::delete('/categories/bulk', [CategoryController::class, 'bulkDestroy']);

        // Custom routes
        Route::post('/categories/{category}/toggle-featured', [CategoryController::class, 'toggleFeatured']);
        Route::patch('/categories/{category}/status', [CategoryController::class, 'updateStatus']);
    });
});

// Public routes (no auth required)
Route::prefix('public')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/featured', function () {
        return Category::featured()->active()->get();
    });
    Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
});
