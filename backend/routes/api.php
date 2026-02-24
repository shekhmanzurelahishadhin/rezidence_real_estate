<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Models\Category;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\ClientAuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Client\ClientController;

// Admin Auth Routes (using admin guard)
Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware('auth:admin')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', [AdminAuthController::class, 'me']);

//        // Protected admin routes with permission checks
//        Route::middleware('permission:view admins')->get('/list', [AdminController::class, 'index']);
//        Route::middleware('permission:create admins')->post('/create', [AdminController::class, 'store']);
    });
});

// Client Auth Routes (using web/api guard)
Route::prefix('client')->group(function () {
    Route::post('/register', [ClientAuthController::class, 'register']);
    Route::post('/login', [ClientAuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [ClientAuthController::class, 'logout']);
        Route::get('/me', [ClientAuthController::class, 'me']);

//        // Protected client routes with permission checks
//        Route::middleware('permission:save favorites')->post('/favorites', [ClientController::class, 'addFavorite']);
//        Route::middleware('permission:schedule viewings')->post('/viewings', [ClientController::class, 'scheduleViewing']);
    });
});

Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    // Category stats
    Route::get('/categories/stats', [CategoryController::class, 'getStats']);

    // Category dropdown (for forms)
    Route::get('/categories/dropdown', [CategoryController::class, 'getDropdown']);

    // Bulk operations
    Route::delete('/categories/bulk', [CategoryController::class, 'bulkDestroy']);

    // Single category operations
    Route::post('/categories/{category}/toggle-featured', [CategoryController::class, 'toggleFeatured']);
    Route::patch('/categories/{category}/status', [CategoryController::class, 'updateStatus']);

    // Resource routes
    Route::apiResource('categories', CategoryController::class);
});

// Public routes (no auth required)
Route::prefix('public')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category:slug}', [CategoryController::class, 'show']);
    Route::get('/categories/featured', function () {
        return Category::featured()->active()->get();
    });
});
