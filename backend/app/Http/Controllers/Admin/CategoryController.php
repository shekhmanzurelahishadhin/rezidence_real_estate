<?php
// app/Http/Controllers/Admin/CategoryController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

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
            'data' => $categories,
            'message' => 'Categories retrieved successfully'
        ]);
    }

    /**
     * Store a newly created category.
     */
    public function store(Request $request)
    {
        try {
            // Log the request data for debugging
            \Log::info('Category store request', [
                'all' => $request->all(),
                'files' => $request->allFiles(),
                'method' => $request->method(),
                'content_type' => $request->header('Content-Type')
            ]);

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:categories',
                'description' => 'nullable|string',
                'icon' => 'nullable|string|max:50',
                'color' => 'nullable|string|max:50',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'required|in:active,inactive,pending,archived',
                'featured' => 'boolean'
            ]);

            // Handle boolean conversion
            $validated['featured'] = filter_var($request->input('featured', false), FILTER_VALIDATE_BOOLEAN);

            // Handle image upload
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('categories', 'public');
                $validated['image'] = $path;
            }

            // Auto-generate slug
            $validated['slug'] = Str::slug($validated['name']);

            $category = Category::create($validated);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category created successfully'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed', $e->errors());

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Category creation failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        $category->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Category retrieved successfully'
        ]);
    }

    /**
     * Update the specified category.
     */
    public function update(Request $request, Category $category)
    {
        try {
            \Log::info('Category update request', [
                'id' => $category->id,
                'all' => $request->all(),
                'files' => $request->allFiles(),
                'method' => $request->method()
            ]);

            $validated = $request->validate([
                'name' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('categories')->ignore($category->id)],
                'description' => 'nullable|string',
                'icon' => 'nullable|string|max:50',
                'color' => 'nullable|string|max:50',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'sometimes|required|in:active,inactive,pending,archived',
                'featured' => 'boolean'
            ]);

            // Handle boolean conversion
            if ($request->has('featured')) {
                $validated['featured'] = filter_var($request->input('featured'), FILTER_VALIDATE_BOOLEAN);
            }

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }

                $path = $request->file('image')->store('categories', 'public');
                $validated['image'] = $path;
            }

            // Update slug if name changed
            if (isset($validated['name']) && $validated['name'] !== $category->name) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $category->update($validated);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category updated successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Update validation failed', $e->errors());

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Category update failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        try {
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

        } catch (\Exception $e) {
            \Log::error('Category deletion failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete category: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk delete categories.
     */
    public function bulkDestroy(Request $request)
    {
        try {
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

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Bulk deletion failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete categories: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(Category $category)
    {
        try {
            $category->update([
                'featured' => !$category->featured
            ]);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => $category->featured ? 'Category featured' : 'Category unfeatured'
            ]);

        } catch (\Exception $e) {
            \Log::error('Toggle featured failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to toggle featured status: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update category status.
     */
    public function updateStatus(Request $request, Category $category)
    {
        try {
            $request->validate([
                'status' => 'required|in:active,inactive,pending,archived'
            ]);

            $category->update([
                'status' => $request->status
            ]);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category status updated successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Status update failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update status: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categories for dropdown.
     */
    public function getDropdown()
    {
        try {
            $categories = Category::active()
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'property_count']);

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories retrieved successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Dropdown fetch failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch categories: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get stats for dashboard.
     */
    public function getStats()
    {
        try {
            $stats = [
                'total' => Category::count(),
                'active' => Category::where('status', 'active')->count(),
                'featured' => Category::where('featured', true)->count(),
                'pending' => Category::where('status', 'pending')->count(),
                'total_properties' => Category::sum('property_count')
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Stats retrieved successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Stats fetch failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch stats: ' . $e->getMessage()
            ], 500);
        }
    }
}
