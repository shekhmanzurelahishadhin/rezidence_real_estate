<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->string('image')->nullable();
            $table->enum('status', ['active', 'inactive', 'pending', 'archived'])->default('pending');
            $table->boolean('featured')->default(false);
            $table->integer('property_count')->default(0);
            $table->integer('views')->default(0);
            $table->timestamps();

            // Indexes for better performance
            $table->index('status');
            $table->index('featured');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
