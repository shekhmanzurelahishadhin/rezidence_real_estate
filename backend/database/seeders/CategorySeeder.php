<?php
// database/seeders/CategorySeeder.php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Modern Homes',
                'description' => 'Contemporary residential properties with modern amenities',
                'icon' => '🏠',
                'color' => '#3B82F6',
                'status' => 'active',
                'featured' => true,
                'property_count' => 42,
                'views' => 12500,
                'image' => 'categories/modern-homes.jpg'
            ],
            [
                'name' => 'Luxury Estates',
                'description' => 'Premium properties with exclusive features and high-end finishes',
                'icon' => '🏰',
                'color' => '#10B981',
                'status' => 'active',
                'featured' => true,
                'property_count' => 28,
                'views' => 8900,
                'image' => 'categories/luxury-estates.jpg'
            ],
            [
                'name' => 'Apartments',
                'description' => 'Multi-unit residential buildings in urban locations',
                'icon' => '🏢',
                'color' => '#F59E0B',
                'status' => 'active',
                'featured' => false,
                'property_count' => 156,
                'views' => 24500,
                'image' => 'categories/apartments.jpg'
            ],
            [
                'name' => 'Villas',
                'description' => 'Luxury single-family homes with spacious layouts',
                'icon' => '🏡',
                'color' => '#EF4444',
                'status' => 'active',
                'featured' => true,
                'property_count' => 35,
                'views' => 11200,
                'image' => 'categories/villas.jpg'
            ],
            [
                'name' => 'Commercial',
                'description' => 'Business properties including offices, retail, and industrial',
                'icon' => '🏪',
                'color' => '#8B5CF6',
                'status' => 'active',
                'featured' => false,
                'property_count' => 67,
                'views' => 7800,
                'image' => 'categories/commercial.jpg'
            ],
            [
                'name' => 'Beachfront',
                'description' => 'Properties with direct beach access and ocean views',
                'icon' => '🏖️',
                'color' => '#06B6D4',
                'status' => 'active',
                'featured' => true,
                'property_count' => 18,
                'views' => 15600,
                'image' => 'categories/beachfront.jpg'
            ],
            [
                'name' => 'Urban Living',
                'description' => 'Properties located in city centers with modern conveniences',
                'icon' => '🏙️',
                'color' => '#EC4899',
                'status' => 'inactive',
                'featured' => false,
                'property_count' => 89,
                'views' => 13400,
                'image' => 'categories/urban-living.jpg'
            ],
            [
                'name' => 'Investment',
                'description' => 'Properties with high rental yield and investment potential',
                'icon' => '💰',
                'color' => '#F97316',
                'status' => 'pending',
                'featured' => false,
                'property_count' => 54,
                'views' => 9200,
                'image' => 'categories/investment.jpg'
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
