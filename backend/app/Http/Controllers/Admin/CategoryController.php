<?php
// app/Http/Controllers/Admin/CategoryController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index(Request $request)
    {
        $query = Category::query();

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'featured') {
                $query->where('featured', true);
            } else {
                $query->where('status', $request->status);
            }
        }

        // Sorting
        switch ($request->get('sort_by', 'newest')) {
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            case 'count_high':
                $query->orderBy('property_count', 'desc');
                break;
            case 'count_low':
                $query->orderBy('property_count', 'asc');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        // Pagination
        $perPage = $request->get('per_page', 10);
        $categories = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => CategoryResource::collection($categories),
            'message' => 'Categories retrieved successfully'
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:active,inactive,pending,archived',
            'featured' => 'boolean'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $validated['image'] = $path;
        }

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'data' => new CategoryResource($category),
            'message' => 'Category created successfully'
        ], 201);
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        $category->incrementViews();

        return response()->json([
            'success' => true,
            'data' => new CategoryResource($category),
            'message' => 'Category retrieved successfully'
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'sometimes|required|in:active,inactive,pending,archived',
            'featured' => 'boolean'
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $path = $request->file('image')->store('categories', 'public');
            $validated['image'] = $path;
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'data' => new CategoryResource($category),
            'message' => 'Category updated successfully'
        ]);
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        // Check if category has properties
        if ($category->property_count > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category with associated properties'
            ], 422);
        }

        // Delete image
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }

    /**
     * Bulk delete categories.
     */
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:categories,id'
        ]);

        // Check if any category has properties
        $categoriesWithProperties = Category::whereIn('id', $request->ids)
            ->where('property_count', '>', 0)
            ->count();

        if ($categoriesWithProperties > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete categories with associated properties'
            ], 422);
        }

        // Delete images
        $categories = Category::whereIn('id', $request->ids)->get();
        foreach ($categories as $category) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
        }

        Category::whereIn('id', $request->ids)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Categories deleted successfully'
        ]);
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(Category $category)
    {
        $category->update([
            'featured' => !$category->featured
        ]);

        return response()->json([
            'success' => true,
            'data' => new CategoryResource($category),
            'message' => $category->featured ? 'Category featured' : 'Category unfeatured'
        ]);
    }

    /**
     * Update category status.
     */
    public function updateStatus(Request $request, Category $category)
    {
        $request->validate([
            'status' => 'required|in:active,inactive,pending,archived'
        ]);

        $category->update([
            'status' => $request->status
        ]);

        return response()->json([
            'success' => true,
            'data' => new CategoryResource($category),
            'message' => 'Category status updated successfully'
        ]);
    }

    /**
     * Get categories for dropdown.
     */
    public function getDropdown()
    {
        $categories = Category::active()
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'property_count']);

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    /**
     * Get stats for dashboard.
     */
    public function getStats()
    {
        $stats = [
            'total' => Category::count(),
            'active' => Category::where('status', 'active')->count(),
            'featured' => Category::where('featured', true)->count(),
            'pending' => Category::where('status', 'pending')->count(),
            'total_properties' => Category::sum('property_count')
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
