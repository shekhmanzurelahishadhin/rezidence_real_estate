
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class ClientAuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'user_type' => 'required|in:buyer,seller,investor,agent',
            'phone' => 'nullable|string|max:20',
            'agree_terms' => 'required|accepted',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Create client
        $client = User::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'user_type' => $request->user_type,
            'is_active' => true,
            'agree_terms' => $request->agree_terms,
        ]);

        // Assign role based on user_type using Spatie
        $client->assignRole($request->user_type);

        // Create token with abilities based on permissions
        $permissions = $client->getAllPermissions()->pluck('name')->toArray();
        $token = $client->createToken('client_token', $permissions)->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Client registered successfully',
            'data' => [
                'client' => $client,
                'token' => $token,
                'token_type' => 'Bearer',
                'roles' => $client->getRoleNames(),
                'permissions' => $client->getAllPermissions()->pluck('name'),
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

        $client = User::where('email', $request->email)->first();

        if (!$client || !Hash::check($request->password, $client->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        if (!$client->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated'
            ], 403);
        }

        // Revoke old tokens
        $client->tokens()->delete();

        // Create new token with permissions as abilities
        $permissions = $client->getAllPermissions()->pluck('name')->toArray();
        $token = $client->createToken('client_token', $permissions)->plainTextToken;

        // Load roles and permissions
        $client->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'message' => 'Logged in successfully',
            'data' => [
                'client' => $client,
                'token' => $token,
                'token_type' => 'Bearer',
                'roles' => $client->getRoleNames(),
                'permissions' => $client->getAllPermissions()->pluck('name'),
            ]
        ]);
    }

    public function me(Request $request)
    {
        $client = $request->user();
        $client->load('roles', 'permissions');

        return response()->json([
            'success' => true,
            'data' => [
                'client' => $client,
                'roles' => $client->getRoleNames(),
                'permissions' => $client->getAllPermissions()->pluck('name'),
            ]
        ]);
    }
}
