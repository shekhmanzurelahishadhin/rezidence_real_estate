<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Category;

class HomePropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with('category')
            ->where('status', 'published');

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by bedrooms
        if ($request->has('bedrooms')) {
            $query->where('bedrooms', '>=', $request->bedrooms);
        }

        // Filter by city
        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        // Featured only
        if ($request->has('featured') && $request->featured) {
            $query->where('featured', true);
        }

        // Sorting
        switch ($request->get('sort_by', 'newest')) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
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
        $perPage = $request->get('per_page', 12);
        $properties = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $properties,
            'message' => 'Properties retrieved successfully'
        ]);
    }

    /**
     * Display the specified property by slug.
     */
    public function show($slug)
    {
        $property = Property::with('category')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->first();

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found'
            ], 404);
        }

        $property->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $property,
            'message' => 'Property retrieved successfully'
        ]);
    }

    /**
     * Get featured properties.
     */
    public function featured(Request $request)
    {
        $limit = $request->get('limit', 6);

        $properties = Property::with('category')
            ->where('status', 'published')
            ->where('featured', true)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $properties,
            'message' => 'Featured properties retrieved successfully'
        ]);
    }

    /**
     * Get properties for homepage.
     */
    public function homepage(Request $request)
    {
        $limit = $request->get('limit', 8);

        $properties = Property::with('category')
            ->where('status', 'published')
            ->where('featured', true)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $properties,
            'message' => 'Homepage properties retrieved successfully'
        ]);
    }

    /**
     * Get unique cities for filter.
     */
    public function cities()
    {
        $cities = Property::where('status', 'published')
            ->distinct()
            ->orderBy('city')
            ->pluck('city');

        return response()->json([
            'success' => true,
            'data' => $cities,
            'message' => 'Cities retrieved successfully'
        ]);
    }

    /**
     * Get price range for properties.
     */
    public function priceRange()
    {
        $min = Property::where('status', 'published')->min('price');
        $max = Property::where('status', 'published')->max('price');

        return response()->json([
            'success' => true,
            'data' => [
                'min' => $min,
                'max' => $max
            ],
            'message' => 'Price range retrieved successfully'
        ]);
    }

    /**
     * Get similar properties.
     */
    public function similar(Property $property)
    {
        $limit = request()->get('limit', 4);

        $properties = Property::with('category')
            ->where('status', 'published')
            ->where('id', '!=', $property->id)
            ->where('category_id', $property->category_id)
            ->whereBetween('price', [$property->price * 0.7, $property->price * 1.3])
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $properties,
            'message' => 'Similar properties retrieved successfully'
        ]);
    }
}
