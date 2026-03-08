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
use App\Http\Controllers\Home\HomeCategoryController;
use App\Http\Controllers\Home\HomePropertyController;
use App\Http\Controllers\Admin\PropertyController;

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

        // Property routes
        Route::get('/properties/stats', [PropertyController::class, 'getStats']);
        Route::delete('/properties/bulk', [PropertyController::class, 'bulkDestroy']);
        Route::post('/properties/{property}/toggle-featured', [PropertyController::class, 'toggleFeatured']);
        Route::patch('/properties/{property}/status', [PropertyController::class, 'updateStatus']);
        Route::post('/properties/{property}/remove-image', [PropertyController::class, 'removeImage']);
        Route::apiResource('properties', PropertyController::class);
    });
});

// Public routes (no auth required)
// Public routes (no auth required)
Route::prefix('public')->group(function () {
    Route::get('/categories', [HomeCategoryController::class, 'index']);
    Route::get('/categories/featured', [HomeCategoryController::class, 'featured']);
    Route::get('/categories/{category:slug}', [HomeCategoryController::class, 'show']);

    Route::get('/properties', [HomePropertyController::class, 'index']);
    Route::get('/properties/featured', [HomePropertyController::class, 'featured']);
    Route::get('/properties/homepage', [HomePropertyController::class, 'homepage']);
    Route::get('/properties/cities', [HomePropertyController::class, 'cities']);
    Route::get('/properties/price-range', [HomePropertyController::class, 'priceRange']);
    Route::get('/properties/{slug}', [HomePropertyController::class, 'show']);
    Route::get('/properties/{property}/similar', [HomePropertyController::class, 'similar']);
});
