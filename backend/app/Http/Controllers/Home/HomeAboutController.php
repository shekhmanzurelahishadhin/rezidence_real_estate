<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;

class HomeAboutController extends Controller
{
    /**
     * Get about us data for public frontend
     */
    public function index()
    {
        $aboutUs = AboutUs::latest()->first();

        if (!$aboutUs) {
            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'No about us data found'
            ]);
        }

        // Return only necessary fields for frontend
        return response()->json([
            'success' => true,
            'data' => [
                'hero' => $aboutUs->hero,
                'story' => $aboutUs->story,
                'mission' => $aboutUs->mission,
                'vision' => $aboutUs->vision,
                'values' => $aboutUs->values,
                'stats' => $aboutUs->stats,
                'updated_at' => $aboutUs->updated_at
            ],
            'message' => 'About us data retrieved successfully'
        ]);
    }
}
