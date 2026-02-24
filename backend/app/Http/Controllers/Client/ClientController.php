
<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class ClientController extends Controller
{
    /**
     * Display a listing of clients
     */
    public function index(Request $request)
    {
        $clients = User::with('roles', 'permissions')
            ->where('user_type', '!=', 'admin')
            ->when($request->search, function($query, $search) {
                $query->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->when($request->user_type, function($query, $userType) {
                $query->where('user_type', $userType);
            })
            ->when($request->role, function($query, $role) {
                $query->role($role);
            })
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }

    /**
     * Display the specified client
     */
    public function show($id)
    {
        $client = User::with('roles', 'permissions')->find($id);

        if (!$client || $client->user_type === 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $client
        ]);
    }

    /**
     * Update the specified client
     */
    public function update(Request $request, $id)
    {
        $client = User::find($id);

        if (!$client || $client->user_type === 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'user_type' => 'sometimes|in:buyer,seller,investor,agent',
            'is_active' => 'sometimes|boolean',
            'preferences' => 'sometimes|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $client->update($request->only([
            'full_name',
            'email',
            'phone',
            'user_type',
            'is_active',
            'preferences'
        ]));

        // Update role if user_type changed
        if ($request->has('user_type') && $request->user_type !== $client->user_type) {
            $client->syncRoles([$request->user_type]);
        }

        // Load relationships
        $client->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'message' => 'Client updated successfully',
            'data' => $client
        ]);
    }

    /**
     * Remove the specified client
     */
    public function destroy($id)
    {
        $client = User::find($id);

        if (!$client || $client->user_type === 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }

        // Soft delete or hard delete based on your preference
        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully'
        ]);
    }

    /**
     * Add to favorites
     */
    public function addFavorite(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        // Assuming you have a favorites relationship
        $user->favorites()->syncWithoutDetaching([$request->property_id]);

        return response()->json([
            'success' => true,
            'message' => 'Property added to favorites'
        ]);
    }

    /**
     * Remove from favorites
     */
    public function removeFavorite(Request $request, $propertyId)
    {
        $user = $request->user();

        $user->favorites()->detach($propertyId);

        return response()->json([
            'success' => true,
            'message' => 'Property removed from favorites'
        ]);
    }

    /**
     * Get user favorites
     */
    public function getFavorites(Request $request)
    {
        $user = $request->user();

        $favorites = $user->favorites()
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $favorites
        ]);
    }

    /**
     * Schedule a viewing
     */
    public function scheduleViewing(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'scheduled_at' => 'required|date|after:now',
            'notes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        // Create viewing appointment
        $viewing = $user->viewings()->create([
            'property_id' => $request->property_id,
            'scheduled_at' => $request->scheduled_at,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Viewing scheduled successfully',
            'data' => $viewing
        ], 201);
    }

    /**
     * Submit inquiry
     */
    public function submitInquiry(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'message' => 'required|string|max:1000',
            'inquiry_type' => 'required|in:general,price,details,schedule',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        $inquiry = $user->inquiries()->create([
            'property_id' => $request->property_id,
            'message' => $request->message,
            'inquiry_type' => $request->inquiry_type,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inquiry submitted successfully',
            'data' => $inquiry
        ], 201);
    }

    /**
     * Get user inquiries
     */
    public function getInquiries(Request $request)
    {
        $user = $request->user();

        $inquiries = $user->inquiries()
            ->with('property')
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $inquiries
        ]);
    }

    /**
     * Get user viewings
     */
    public function getViewings(Request $request)
    {
        $user = $request->user();

        $viewings = $user->viewings()
            ->with('property')
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $viewings
        ]);
    }

    /**
     * Update client profile
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'full_name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'preferences' => 'sometimes|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user->update($request->only([
            'full_name',
            'phone',
            'preferences'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully'
        ]);
    }

    /**
     * Get client dashboard data
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();

        $data = [
            'profile' => $user,
            'recent_activity' => [
                'favorites_count' => $user->favorites()->count(),
                'inquiries_count' => $user->inquiries()->count(),
                'viewings_count' => $user->viewings()->count(),
                'recent_inquiries' => $user->inquiries()->with('property')->latest()->take(5)->get(),
                'upcoming_viewings' => $user->viewings()->with('property')->where('scheduled_at', '>', now())->get(),
            ],
            'recommendations' => [], // Add property recommendations logic
            'notifications' => [], // Add notifications
        ];

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
