// app/components/home/Categories.tsx
"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import { frontendCategoryService, Category } from "@/app//(frontend)/services/categoryService";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export function Categories() {
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await frontendCategoryService.getActiveCategories({ 
        per_page: 12,
        sort_by: 'name_asc'
      });
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (categoryId: number) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }));
  };

  // Map categories to fallback images based on name or slug
  const getFallbackImage = (category: Category): string => {
    const name = category.name.toLowerCase();
    const imageMap: Record<string, string> = {
      'modern': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'luxury': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&q=80',
      'apartment': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'villa': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      'commercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'beach': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'urban': 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'investment': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'house': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'office': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    };
    
    for (const [key, url] of Object.entries(imageMap)) {
      if (name.includes(key)) {
        return url;
      }
    }
    
    return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
  };

  const getPriceRange = (category: Category): string => {
    const ranges = [
      '$200K - $500K',
      '$500K - $1M',
      '$1M - $3M',
      '$3M - $5M',
      '$5M+'
    ];
    
    const count = category.property_count || 0;
    const index = Math.min(Math.floor(count / 10), ranges.length - 1);
    
    return ranges[index] || '$250K+';
  };

  // Get the correct image URL
  const getImageUrl = (category: Category): string => {
    // If image has error, use fallback
    if (imageErrors[category.id]) {
      return getFallbackImage(category);
    }
    
    // If category has image_url, use it
    if (category.image_url) {
      // Make sure the URL is absolute
      if (category.image_url.startsWith('http')) {
        return category.image_url;
      } else {
        // If it's relative, prepend the backend URL
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
        return `${baseUrl}${category.image_url}`;
      }
    }
    
    // Otherwise use fallback
    return getFallbackImage(category);
  };

  if (loading) {
    return (
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-white to-gray-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className={`h-4 w-24 mx-auto mb-4 rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`} />
              <div className={`h-10 w-96 mx-auto mb-6 rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`} />
              <div className={`h-6 w-2/3 mx-auto rounded ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden animate-pulse ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className={`h-48 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                  <div className="p-5 space-y-3">
                    <div className={`h-4 w-3/4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                    <div className={`h-3 w-full rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                    <div className={`h-3 w-2/3 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                    <div className={`h-px w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                    <div className={`h-4 w-1/2 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-white to-gray-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`p-8 rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {error}
            </p>
            <button
              onClick={fetchCategories}
              className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 ${
            isDarkMode ? "text-amber-400" : "text-amber-600"
          }`}>
            <span className={`w-8 h-0.5 ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`} />
            EXPLORE PROPERTIES
          </span>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Find Your Perfect <span className="text-amber-500">Property Type</span>
          </h2>
          <p className={`text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Browse through our diverse collection of premium properties tailored to your lifestyle.
          </p>
        </div>

        {/* Swiper Carousel */}
        {categories.length > 0 ? (
          <div className="category-carousel relative">
            {/* Custom Navigation Arrows - Positioned at top right */}
            <div className="flex justify-end gap-2 mb-6">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gray-800 text-amber-400 hover:bg-gray-700 border border-gray-700" 
                    : "bg-white text-amber-600 hover:bg-gray-100 border border-gray-200"
                }`}
                aria-label="Previous slide"
              >
                <span className="text-2xl leading-none">‹</span>
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gray-800 text-amber-400 hover:bg-gray-700 border border-gray-700" 
                    : "bg-white text-amber-600 hover:bg-gray-100 border border-gray-200"
                }`}
                aria-label="Next slide"
              >
                <span className="text-2xl leading-none">›</span>
              </button>
            </div>

            <style jsx>{`
              .category-carousel :global(.swiper-pagination) {
                position: relative;
                margin-top: 30px;
              }
              
              .category-carousel :global(.swiper-pagination-bullet) {
                width: 10px;
                height: 10px;
                background: ${isDarkMode ? '#4b5563' : '#d1d5db'};
                opacity: 0.7;
                transition: all 0.3s ease;
              }
              
              .category-carousel :global(.swiper-pagination-bullet-active) {
                background: ${isDarkMode ? '#fbbf24' : '#f59e0b'};
                width: 30px;
                border-radius: 5px;
                opacity: 1;
              }
              
              .category-carousel :global(.swiper-slide) {
                height: auto;
              }
            `}</style>
            
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={categories.length > 4}
              speed={1000}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className="pb-12"
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link
                    href={`/properties?category=${category.slug}`}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 block h-full ${
                      isDarkMode 
                        ? "bg-gray-800 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-black/20" 
                        : "bg-white shadow-lg hover:shadow-2xl"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                      {/* Main Category Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{
                          backgroundImage: `url(${getImageUrl(category)})`
                        }}
                        onError={() => handleImageError(category.id)}
                      />

                      {/* Fallback background color while image loads */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                      {/* Category Icon */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                        <div className={`w-10 h-10 rounded-lg backdrop-blur-sm border flex items-center justify-center ${
                          isDarkMode 
                            ? "bg-white/20 border-white/30" 
                            : "bg-white/30 border-white/40"
                        }`}>
                          <span className="text-lg">{category.icon || '🏠'}</span>
                        </div>
                        <div className={`backdrop-blur-sm rounded-full px-3 py-1 ${
                          isDarkMode ? "bg-black/50" : "bg-white/50"
                        }`}>
                          <span className={`text-xs font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {category.property_count}+
                          </span>
                        </div>
                      </div>

                      {/* Category Title Over Image */}
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <h3 className="text-white text-lg font-bold">{category.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-amber-300 text-sm font-medium">
                            {getPriceRange(category)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className={`text-sm mb-4 line-clamp-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}>
                        {category.description || 'Explore our collection of premium properties in this category.'}
                      </p>

                      <div className={`flex items-center justify-between pt-3 border-t ${
                        isDarkMode ? "border-gray-700" : "border-gray-100"
                      }`}>
                        <span className={`flex items-center gap-1 text-sm font-semibold ${
                          isDarkMode ? "text-amber-400" : "text-amber-600"
                        }`}>
                          Browse Properties
                          <ChevronRightIcon 
                            size={16} 
                            className={`group-hover:translate-x-1 transition-transform duration-300 ${
                              isDarkMode ? "text-amber-400" : "text-amber-600"
                            }`} 
                          />
                        </span>
                        <span className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-400"
                        }`}>
                          Available now
                        </span>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className={`absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none ${
                      isDarkMode ? "" : ""
                    }`} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className={`text-center p-12 rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}