<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'color',
        'image',
        'status',
        'featured',
        'property_count',
        'views'
    ];

    protected $casts = [
        'featured' => 'boolean',
        'property_count' => 'integer',
        'views' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Auto-generate slug from name
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });

        static::updating(function ($category) {
            if ($category->isDirty('name') && !$category->isDirty('slug')) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    // Relationships
    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopePublished($query)
    {
        return $query->whereIn('status', ['active', 'pending']);
    }

    // Accessors
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
        'active' => 'green',
            'inactive' => 'gray',
            'pending' => 'yellow',
            'archived' => 'red',
            default => 'gray'
        };
    }

    // Methods
    public function incrementViews()
    {
        $this->increment('views');
    }

    public function updatePropertyCount()
    {
        $this->property_count = $this->properties()->count();
        $this->save();
    }
}
