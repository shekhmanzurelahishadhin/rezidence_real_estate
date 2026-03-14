<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AboutUsController extends Controller
{
    public function index()
    {
        $aboutUs = AboutUs::with('creator:id,name,email')
            ->latest()
            ->first();

        if (!$aboutUs) {
            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'No about us data found'
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $aboutUs,
            'message' => 'About us data retrieved successfully'
        ]);
    }

    /**
     * Get about us history (all versions)
     */
    public function history()
    {
        $history = AboutUs::with('creator:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $history,
            'message' => 'History retrieved successfully'
        ]);
    }

    /**
     * Get specific version by ID
     */
    public function show($id)
    {
        $aboutUs = AboutUs::with('creator:id,name,email')
            ->find($id);

        if (!$aboutUs) {
            return response()->json([
                'success' => false,
                'message' => 'Version not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $aboutUs,
            'message' => 'Version retrieved successfully'
        ]);
    }

    /**
     * Store or update about us data
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hero' => 'required|array',
            'hero.title' => 'required|string|max:255',
            'hero.subtitle' => 'required|string',
            'story' => 'required|array',
            'story.title' => 'required|string|max:255',
            'story.content' => 'required|array',
            'story.content.*' => 'required|string',
            'mission' => 'required|string',
            'vision' => 'required|string',
            'values' => 'required|array|min:1',
            'values.*.title' => 'required|string|max:255',
            'values.*.description' => 'required|string',
            'stats' => 'required|array|min:1',
            'stats.*.value' => 'required|string|max:50',
            'stats.*.label' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Create new version
        $aboutUs = AboutUs::create([
            'hero' => $request->hero,
            'story' => $request->story,
            'mission' => $request->mission,
            'vision' => $request->vision,
            'values' => $request->values,
            'stats' => $request->stats,
//            'created_by' => auth('admin')->id()
        ]);

        return response()->json([
            'success' => true,
            'data' => $aboutUs->load('creator:id,name,email'),
            'message' => 'About us data saved successfully'
        ], 201);
    }

    /**
     * Get stats for dashboard
     */
    public function getStats()
    {
        $latest = AboutUs::latest()->first();
        $totalVersions = AboutUs::count();
        $lastUpdated = AboutUs::latest()->first()?->updated_at;

        return response()->json([
            'success' => true,
            'data' => [
                'total_versions' => $totalVersions,
                'last_updated' => $lastUpdated,
                'current_version_id' => $latest?->id,
                'has_data' => $latest !== null
            ]
        ]);
    }
}
