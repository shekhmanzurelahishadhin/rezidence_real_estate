
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AdminAuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'phone' => 'nullable|string|max:20',
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => 'sometimes|in:super-admin,admin,moderator',
            'agree_terms' => 'required|accepted',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Create admin
        $admin = Admin::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'admin',
            'is_active' => true,
        ]);

        // Assign role using Spatie
        $admin->assignRole($request->role ?? 'admin');

        // Create token with abilities based on permissions
        $permissions = $admin->getAllPermissions()->pluck('name')->toArray();
        $token = $admin->createToken('admin_token', $permissions)->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Admin registered successfully',
            'data' => [
                'admin' => $admin,
                'token' => $token,
                'token_type' => 'Bearer',
                'roles' => $admin->getRoleNames(),
                'permissions' => $admin->getAllPermissions()->pluck('name'),
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        if (!$admin->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated'
            ], 403);
        }

        // Revoke old tokens
        $admin->tokens()->delete();

        // Create new token with permissions as abilities
        $permissions = $admin->getAllPermissions()->pluck('name')->toArray();
        $token = $admin->createToken('admin_token', $permissions)->plainTextToken;

        // Load roles and permissions
        $admin->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'message' => 'Logged in successfully',
            'data' => [
                'admin' => $admin,
                'token' => $token,
                'token_type' => 'Bearer',
                'roles' => $admin->getRoleNames(),
                'permissions' => $admin->getAllPermissions()->pluck('name'),
            ]
        ]);
    }

    public function me(Request $request)
    {
        $admin = $request->user();
        $admin->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'data' => [
                'admin' => $admin,
                'roles' => $admin->getRoleNames(),
                'permissions' => $admin->getAllPermissions()->pluck('name'),
            ]
        ]);
    }
}
