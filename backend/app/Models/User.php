<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Traits\HasPermissions;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, HasPermissions;

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'user_type', // buyer, seller, investor, agent
        'phone',
        'is_active',
        'agree_terms',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
        'agree_terms' => 'boolean',
    ];

    /**
     * Spatie: Set the guard name for the model
     */
    protected $guard_name = 'web';

    /**
     * Assign role based on user type
     */
    public function assignRoleFromUserType()
    {
        $this->assignRole($this->user_type);
    }

    /**
     * Check if client has specific permission
     */
    public function hasClientPermission(string $permission): bool
    {
        return $this->hasPermissionTo($permission, 'web');
    }
}
