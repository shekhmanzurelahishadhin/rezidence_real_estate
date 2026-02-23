<?php
// database/factories/CategoryFactory.php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        $name = $this->faker->unique()->words(2, true);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'icon' => $this->faker->randomElement(['🏠', '🏢', '🏡', '🏰', '🏖️', '💰']),
            'color' => $this->faker->hexColor(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'pending', 'archived']),
            'featured' => $this->faker->boolean(20),
            'property_count' => $this->faker->numberBetween(0, 100),
            'views' => $this->faker->numberBetween(0, 10000),
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'updated_at' => now(),
        ];
    }

    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'active',
            ];
        });
    }

    public function featured()
    {
        return $this->state(function (array $attributes) {
            return [
                'featured' => true,
            ];
        });
    }
}
