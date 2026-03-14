<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AboutUs extends Model
{
    use HasFactory;


    protected $fillable = [
        'hero',
        'story',
        'mission',
        'vision',
        'values',
        'stats',
        'created_by'
    ];

    protected $casts = [
        'hero' => 'array',
        'story' => 'array',
        'values' => 'array',
        'stats' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function creator()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }

    public static function getLatest()
    {
        return self::with('creator')
            ->latest()
            ->first();
    }
}
