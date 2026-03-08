<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category_id',
        'address',
        'city',
        'state',
        'zip_code',
        'price',
        'bedrooms',
        'bathrooms',
        'size',
        'parking',
        'features',
        'images',
        'featured_image',
        'status',
        'featured',
        'views',
        'latitude',
        'longitude'
    ];

    protected $casts = [
        'features' => 'array',
        'images' => 'array',
        'featured' => 'boolean',
        'price' => 'decimal:2',
        'bedrooms' => 'integer',
        'bathrooms' => 'float',
        'size' => 'integer',
        'views' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($property) {
            if (empty($property->slug)) {
                $property->slug = Str::slug($property->title);
            }
        });

        static::updating(function ($property) {
            if ($property->isDirty('title') && !$property->isDirty('slug')) {
                $property->slug = Str::slug($property->title);
            }
        });
    }

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeInPriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeInCity($query, $city)
    {
        return $query->where('city', $city);
    }

    // Accessors
    public function getFeaturedImageUrlAttribute()
    {
        if ($this->featured_image) {
            return asset('storage/' . $this->featured_image);
        }

        // Return first image if no featured image
        if (!empty($this->images) && count($this->images) > 0) {
            return asset('storage/' . $this->images[0]);
        }

        return null;
    }

    public function getImagesUrlAttribute()
    {
        if (empty($this->images)) {
            return [];
        }

        return collect($this->images)->map(function ($image) {
            return asset('storage/' . $image);
        })->toArray();
    }

    public function getFormattedPriceAttribute()
    {
        return '$' . number_format($this->price, 0);
    }

    public function getFormattedSizeAttribute()
    {
        return number_format($this->size) . ' sq ft';
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
        'published' => 'green',
            'draft' => 'gray',
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

    public function updateCategoryCount()
    {
        if ($this->category) {
            $this->category->updatePropertyCount();
        }
    }
}
