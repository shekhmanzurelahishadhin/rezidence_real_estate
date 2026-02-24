<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions for admin guard
        $adminPermissions = [
            // Dashboard permissions
            'view admin dashboard',
            'view analytics',

            // Property management
            'view all properties',
            'create properties',
            'edit properties',
            'delete properties',
            'approve properties',
            'feature properties',

            // User management
            'view all clients',
            'manage clients',
            'block clients',

            // Admin management
            'view admins',
            'create admins',
            'edit admins',
            'delete admins',

            // Settings and configuration
            'manage settings',
            'view reports',
            'manage roles',
            'manage permissions',

            // Content management
            'manage blog',
            'manage testimonials',
            'manage FAQs',
        ];

        // Create permissions for web/client guard
        $clientPermissions = [
            // Property interactions
            'view properties',
            'search properties',
            'save favorites',
            'schedule viewings',
            'submit inquiries',

            // Profile management
            'manage profile',
            'change password',

            // Notifications
            'receive notifications',
            'manage alerts',

            // Buyer specific
            'make offers',
            'track offers',

            // Seller specific
            'list properties',
            'manage listings',
            'view inquiries',

            // Agent specific
            'manage appointments',
            'respond to inquiries',
            'view client requests',
        ];

        // Create permissions with guards
        foreach ($adminPermissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'admin']);
        }

        foreach ($clientPermissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles for admin guard
        $superAdminRole = Role::create(['name' => 'super-admin', 'guard_name' => 'admin']);
        $adminRole = Role::create(['name' => 'admin', 'guard_name' => 'admin']);
        $moderatorRole = Role::create(['name' => 'moderator', 'guard_name' => 'admin']);

        // Create roles for web/client guard
        $buyerRole = Role::create(['name' => 'buyer', 'guard_name' => 'web']);
        $sellerRole = Role::create(['name' => 'seller', 'guard_name' => 'web']);
        $investorRole = Role::create(['name' => 'investor', 'guard_name' => 'web']);
        $agentRole = Role::create(['name' => 'agent', 'guard_name' => 'web']);

        // Assign permissions to admin roles
        // Super Admin gets all admin permissions
        $superAdminRole->givePermissionTo(Permission::where('guard_name', 'admin')->get());

        // Admin permissions
        $adminRole->givePermissionTo([
            'view admin dashboard',
            'view analytics',
            'view all properties',
            'create properties',
            'edit properties',
            'approve properties',
            'view all clients',
            'manage clients',
            'view reports',
            'manage blog',
        ]);

        // Moderator permissions
        $moderatorRole->givePermissionTo([
            'view admin dashboard',
            'view all properties',
            'edit properties',
            'approve properties',
            'view all clients',
            'manage testimonials',
        ]);

        // Assign permissions to client roles
        // Buyer permissions
        $buyerRole->givePermissionTo([
            'view properties',
            'search properties',
            'save favorites',
            'schedule viewings',
            'submit inquiries',
            'manage profile',
            'change password',
            'receive notifications',
            'make offers',
            'track offers',
        ]);

        // Seller permissions
        $sellerRole->givePermissionTo([
            'view properties',
            'search properties',
            'list properties',
            'manage listings',
            'view inquiries',
            'manage profile',
            'change password',
            'receive notifications',
        ]);

        // Investor permissions
        $investorRole->givePermissionTo([
            'view properties',
            'search properties',
            'save favorites',
            'submit inquiries',
            'manage profile',
            'change password',
            'receive notifications',
        ]);

        // Agent permissions
        $agentRole->givePermissionTo([
            'view properties',
            'search properties',
            'list properties',
            'manage appointments',
            'respond to inquiries',
            'view client requests',
            'manage profile',
            'change password',
            'receive notifications',
        ]);
    }
}
