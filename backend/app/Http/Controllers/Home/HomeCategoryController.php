<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class HomeCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::query()
            ->where('status', 'active');
//            ->withCount('properties');

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter featured
        if ($request->has('featured') && $request->featured) {
            $query->where('featured', true);
        }

        // Sorting
        switch ($request->get('sort_by', 'name_asc')) {
            case 'name_desc':
                $query->orderBy('name', 'desc');
                break;
            case 'popular':
                $query->orderBy('property_count', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'name_asc':
            default:
                $query->orderBy('name', 'asc');
                break;
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $categories = $query->paginate($perPage);

        // Add full image URL
        $categories->getCollection()->transform(function ($category) {
            $category->image_url = $category->image
                ? url('storage/' . $category->image)
                : null;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Categories retrieved successfully'
        ]);
    }

    /**
     * Display the specified category by slug.
     */
    public function show(Category $category)
    {
        // Ensure only active categories are shown
        if ($category->status !== 'active') {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $category->incrementViews();
        $category->image_url = $category->image
            ? url('storage/' . $category->image)
            : null;

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Category retrieved successfully'
        ]);
    }

    /**
     * Get featured categories.
     */
    public function featured(Request $request)
    {
        $limit = $request->get('limit', 6);

        $categories = Category::where('status', 'active')
            ->where('featured', true)
//            ->withCount('properties')
            ->orderBy('name')
            ->limit($limit)
            ->get();

        $categories->transform(function ($category) {
            $category->image_url = $category->image
                ? url('storage/' . $category->image)
                : null;
            return $category;
        });

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Featured categories retrieved successfully'
        ]);
    }
}
