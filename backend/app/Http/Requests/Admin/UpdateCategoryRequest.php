<?php
// app/Http/Requests/Admin/UpdateCategoryRequest.php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Add your authorization logic here
    }

    public function rules()
    {
        $categoryId = $this->route('category')->id ?? $this->route('category');

        return [
            'name' => 'sometimes|required|string|max:255|unique:categories,name,' . $categoryId,
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'sometimes|required|in:active,inactive,pending,archived',
            'featured' => 'boolean'
        ];
    }
}
