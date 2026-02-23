<?php
// app/Http/Resources/CategoryResource.php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'icon' => $this->icon,
            'color' => $this->color,
            'image' => $this->image_url,
            'status' => $this->status,
            'status_color' => $this->status_color,
            'featured' => $this->featured,
            'property_count' => $this->property_count,
            'views' => $this->views,
            'created_at' => $this->created_at->toISOString(),
            'created_at_formatted' => $this->created_at->format('M d, Y'),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
