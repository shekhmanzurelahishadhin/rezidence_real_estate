<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Model
{
    use HasApiTokens, Notifiable, HasRoles, HasPermissions;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Spatie: Set the guard name for the model
     */
    protected $guard_name = 'admin';

    /**
     * Get the default role for new admins
     */
    public function assignDefaultRole()
    {
        $this->assignRole($this->role ?? 'admin');
    }

    /**
     * Check if admin has specific permission
     */
    public function hasAdminPermission(string $permission): bool
    {
        return $this->hasPermissionTo($permission, 'admin');
    }
}
