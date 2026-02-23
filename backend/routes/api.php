<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use App\Models\Category;

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
