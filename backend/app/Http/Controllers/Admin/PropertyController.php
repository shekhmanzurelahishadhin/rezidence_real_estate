<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with('category');

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

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'featured') {
                $query->where('featured', true);
            } else {
                $query->where('status', $request->status);
            }
        }

        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by price range
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        switch ($request->get('sort_by', 'newest')) {
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'name_asc':
                $query->orderBy('title', 'asc');
                break;
            case 'name_desc':
                $query->orderBy('title', 'desc');
                break;
            case 'views':
                $query->orderBy('views', 'desc');
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
        $properties = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $properties,
            'message' => 'Properties retrieved successfully'
        ]);
    }

    /**
     * Store a newly created property.
     */
    public function store(Request $request)
    {
        try {
            \Log::info('Property store request', [
                'all' => $request->all(),
                'files' => $request->allFiles(),
                'method' => $request->method()
            ]);

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'category_id' => 'required|exists:categories,id',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:100',
                'state' => 'required|string|max:100',
                'zip_code' => 'required|string|max:20',
                'price' => 'required|numeric|min:0',
                'bedrooms' => 'nullable|integer|min:0',
                'bathrooms' => 'nullable|numeric|min:0',
                'size' => 'nullable|integer|min:0',
                'parking' => 'nullable|string|max:100',
                'features' => 'nullable|array',
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'required|in:draft,pending,published,archived',
                'featured' => 'boolean',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric'
            ]);

            // Handle featured image upload
            if ($request->hasFile('featured_image')) {
                $path = $request->file('featured_image')->store('properties', 'public');
                $validated['featured_image'] = $path;
            }

            // Handle multiple images upload
            if ($request->hasFile('images')) {
                $images = [];
                foreach ($request->file('images') as $image) {
                    $path = $image->store('properties', 'public');
                    $images[] = $path;
                }
                $validated['images'] = $images;
            }

            // Handle boolean conversion
            $validated['featured'] = filter_var($request->input('featured', false), FILTER_VALIDATE_BOOLEAN);

            // Auto-generate slug
            $validated['slug'] = Str::slug($validated['title']);

            $property = Property::create($validated);

            // Update category property count
            $property->updateCategoryCount();

            return response()->json([
                'success' => true,
                'data' => $property->load('category'),
                'message' => 'Property created successfully'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Property validation failed', $e->errors());

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Property creation failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create property: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified property.
     */
    public function show(Property $property)
    {
        $property->load('category');
        $property->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $property,
            'message' => 'Property retrieved successfully'
        ]);
    }

    /**
     * Update the specified property.
     */
    public function update(Request $request, Property $property)
    {
        try {
            \Log::info('Property update request', [
                'id' => $property->id,
                'all' => $request->all(),
                'files' => $request->allFiles(),
                'method' => $request->method()
            ]);

            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'category_id' => 'sometimes|required|exists:categories,id',
                'address' => 'sometimes|required|string|max:255',
                'city' => 'sometimes|required|string|max:100',
                'state' => 'sometimes|required|string|max:100',
                'zip_code' => 'sometimes|required|string|max:20',
                'price' => 'sometimes|required|numeric|min:0',
                'bedrooms' => 'nullable|integer|min:0',
                'bathrooms' => 'nullable|numeric|min:0',
                'size' => 'nullable|integer|min:0',
                'parking' => 'nullable|string|max:100',
                'features' => 'nullable|array',
                'images' => 'nullable|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'sometimes|required|in:draft,pending,published,archived',
                'featured' => 'boolean',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric'
            ]);

            // Handle featured image upload
            if ($request->hasFile('featured_image')) {
                // Delete old image
                if ($property->featured_image) {
                    Storage::disk('public')->delete($property->featured_image);
                }

                $path = $request->file('featured_image')->store('properties', 'public');
                $validated['featured_image'] = $path;
            }

            // Handle multiple images upload
            if ($request->hasFile('images')) {
                // Get existing images
                $existingImages = $property->images ?? [];

                // Upload new images
                $newImages = [];
                foreach ($request->file('images') as $image) {
                    $path = $image->store('properties', 'public');
                    $newImages[] = $path;
                }

                // Merge with existing images
                $validated['images'] = array_merge($existingImages, $newImages);
            }

            // Handle boolean conversion
            if ($request->has('featured')) {
                $validated['featured'] = filter_var($request->input('featured'), FILTER_VALIDATE_BOOLEAN);
            }

            // Update slug if title changed
            if (isset($validated['title']) && $validated['title'] !== $property->title) {
                $validated['slug'] = Str::slug($validated['title']);
            }

            $property->update($validated);

            // Update category property count
            $property->updateCategoryCount();

            return response()->json([
                'success' => true,
                'data' => $property->load('category'),
                'message' => 'Property updated successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Update validation failed', $e->errors());

            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Property update failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update property: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified property.
     */
    public function destroy(Property $property)
    {
        try {
            // Delete images
            if ($property->featured_image) {
                Storage::disk('public')->delete($property->featured_image);
            }

            if ($property->images) {
                foreach ($property->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            $categoryId = $property->category_id;
            $property->delete();

            // Update category property count
            if ($categoryId) {
                $category = Category::find($categoryId);
                if ($category) {
                    $category->updatePropertyCount();
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Property deleted successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Property deletion failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete property: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Bulk delete properties.
     */
    public function bulkDestroy(Request $request)
    {
        try {
            $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'exists:properties,id'
            ]);

            $properties = Property::whereIn('id', $request->ids)->get();

            foreach ($properties as $property) {
                // Delete images
                if ($property->featured_image) {
                    Storage::disk('public')->delete($property->featured_image);
                }

                if ($property->images) {
                    foreach ($property->images as $image) {
                        Storage::disk('public')->delete($image);
                    }
                }

                $property->delete();
            }

            // Update category counts
            foreach ($properties as $property) {
                if ($property->category_id) {
                    $category = Category::find($property->category_id);
                    if ($category) {
                        $category->updatePropertyCount();
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'Properties deleted successfully'
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
                'message' => 'Failed to delete properties: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Toggle featured status.
     */
    public function toggleFeatured(Property $property)
    {
        try {
            $property->update([
                'featured' => !$property->featured
            ]);

            return response()->json([
                'success' => true,
                'data' => $property,
                'message' => $property->featured ? 'Property featured' : 'Property unfeatured'
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
     * Update property status.
     */
    public function updateStatus(Request $request, Property $property)
    {
        try {
            $request->validate([
                'status' => 'required|in:draft,pending,published,archived'
            ]);

            $property->update([
                'status' => $request->status
            ]);

            return response()->json([
                'success' => true,
                'data' => $property,
                'message' => 'Property status updated successfully'
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
     * Get stats for dashboard.
     */
    public function getStats()
    {
        try {
            $stats = [
                'total' => Property::count(),
                'published' => Property::where('status', 'published')->count(),
                'featured' => Property::where('featured', true)->count(),
                'pending' => Property::where('status', 'pending')->count(),
                'draft' => Property::where('status', 'draft')->count(),
                'archived' => Property::where('status', 'archived')->count(),
                'total_views' => Property::sum('views'),
                'average_price' => Property::where('status', 'published')->avg('price'),
                'total_value' => Property::where('status', 'published')->sum('price')
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

    /**
     * Remove image from property.
     */
    public function removeImage(Request $request, Property $property)
    {
        try {
            $request->validate([
                'image' => 'required|string'
            ]);

            $imagePath = $request->image;
            $images = $property->images ?? [];

            // Remove from array
            $images = array_filter($images, function ($img) use ($imagePath) {
                return $img !== $imagePath;
            });

            // Delete file
            Storage::disk('public')->delete($imagePath);

            // Update property
            $property->update(['images' => array_values($images)]);

            return response()->json([
                'success' => true,
                'data' => $property,
                'message' => 'Image removed successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Image removal failed', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to remove image: ' . $e->getMessage()
            ], 500);
        }
    }
}
