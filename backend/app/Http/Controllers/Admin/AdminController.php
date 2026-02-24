
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminController extends Controller
{
    /**
     * Display a listing of admins
     */
    public function index(Request $request)
    {
        $admins = Admin::with('roles', 'permissions')
            ->when($request->search, function($query, $search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($request->role, function($query, $role) {
                $query->role($role);
            })
            ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $admins
        ]);
    }

    /**
     * Store a newly created admin
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|string|exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_active' => true,
        ]);

        // Assign role
        $admin->assignRole($request->role);

        // Load relationships
        $admin->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'message' => 'Admin created successfully',
            'data' => $admin
        ], 201);
    }

    /**
     * Display the specified admin
     */
    public function show($id)
    {
        $admin = Admin::with('roles', 'permissions')->find($id);

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $admin
        ]);
    }

    /**
     * Update the specified admin
     */
    public function update(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:admins,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'role' => 'sometimes|string|exists:roles,name',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $admin->update($request->only([
            'first_name',
            'last_name',
            'email',
            'phone',
            'is_active'
        ]));

        // Update role if provided
        if ($request->has('role')) {
            $admin->syncRoles([$request->role]);
            $admin->update(['role' => $request->role]);
        }

        // Load relationships
        $admin->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'message' => 'Admin updated successfully',
            'data' => $admin
        ]);
    }

    /**
     * Remove the specified admin
     */
    public function destroy($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin not found'
            ], 404);
        }

        // Prevent deleting super admin
        if ($admin->hasRole('super-admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete super admin'
            ], 403);
        }

        $admin->delete();

        return response()->json([
            'success' => true,
            'message' => 'Admin deleted successfully'
        ]);
    }

    /**
     * Update admin password
     */
    public function updatePassword(Request $request, $id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin not found'
            ], 404);
        }

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

        if (!Hash::check($request->current_password, $admin->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $admin->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully'
        ]);
    }

    /**
     * Toggle admin status
     */
    public function toggleStatus($id)
    {
        $admin = Admin::find($id);

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin not found'
            ], 404);
        }

        // Prevent deactivating super admin
        if ($admin->hasRole('super-admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot deactivate super admin'
            ], 403);
        }

        $admin->update([
            'is_active' => !$admin->is_active
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Admin status updated successfully',
            'data' => ['is_active' => $admin->is_active]
        ]);
    }

    /**
     * Get admin roles and permissions
     */
    public function getRolesAndPermissions($id)
    {
        $admin = Admin::with('roles', 'permissions')->find($id);

        if (!$admin) {
            return response()->json([
                'success' => false,
                'message' => 'Admin not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'roles' => $admin->getRoleNames(),
                'permissions' => $admin->getAllPermissions()->pluck('name'),
                'direct_permissions' => $admin->getDirectPermissions()->pluck('name'),
            ]
        ]);
    }
}
