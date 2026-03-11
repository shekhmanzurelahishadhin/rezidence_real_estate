// app/(frontend)/properties/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PropertyCard from "@/app/(frontend)/components/PropertyCard";
import {
  FilterIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  ParkingIcon,
  TrendingUpIcon,
  StarIcon,
  XIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import { frontendPropertyService } from "@/app/(frontend)/services/propertyService";
import { frontendCategoryService } from "@/app/(frontend)/services/categoryService";
import { Property } from "@/app/(frontend)/types/property";
import { Category } from "@/app/(frontend)/types/category";
import toast from "react-hot-toast";

export default function PropertiesPage() {
  const { isDarkMode } = useTheme();
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage] = useState(9);

  // Price range from API
  const [globalMinPrice, setGlobalMinPrice] = useState(0);
  const [globalMaxPrice, setGlobalMaxPrice] = useState(10000000);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [activeCategory, sortBy, minPrice, maxPrice, bedrooms, bathrooms, city, searchQuery, currentPage]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesData = await frontendCategoryService.getActiveCategories({ per_page: 50 });
      setCategories(categoriesData.data || []);
      
      // Fetch cities for filter
      const citiesData = await frontendPropertyService.getCities();
      setCities(citiesData);
      
      // Fetch price range
      const priceRangeData = await frontendPropertyService.getPriceRange();
      setGlobalMinPrice(priceRangeData.min);
      setGlobalMaxPrice(priceRangeData.max);
      setMinPrice(priceRangeData.min);
      setMaxPrice(priceRangeData.max);
      setPriceRange([priceRangeData.min, priceRangeData.max]);
      
    } catch (err) {
      console.error('Error fetching initial data:', err);
      toast.error('Failed to load filters');
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      const params: any = {
        page: currentPage,
        per_page: perPage,
        sort_by: sortBy,
      };
      
      if (activeCategory !== 'all') {
        params.category = activeCategory;
      }
      
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      if (minPrice > globalMinPrice) {
        params.min_price = minPrice;
      }
      
      if (maxPrice < globalMaxPrice) {
        params.max_price = maxPrice;
      }
      
      if (bedrooms > 0) {
        params.bedrooms = bedrooms;
      }
      
      if (bathrooms > 0) {
        params.bathrooms = bathrooms;
      }
      
      if (city) {
        params.city = city;
      }
      
      const response = await frontendPropertyService.getProperties(params);
      
      setProperties(response.data);
      setTotalItems(response.meta.total);
      setTotalPages(response.meta.last_page);
      
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setMinPrice(globalMinPrice);
    setMaxPrice(globalMaxPrice);
    setPriceRange([globalMinPrice, globalMaxPrice]);
    setBedrooms(0);
    setBathrooms(0);
    setCity('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && properties.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-white to-gray-50"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Loading properties...
          </p>
        </div>
      </div>
    );
  }

  const filterOptions = [
    { id: 'all', name: 'All Properties', count: totalItems },
    ...categories.map(cat => ({ id: cat.slug, name: cat.name, count: cat.property_count }))
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 transition-all duration-500"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #111827 0%, #1e293b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #111827 0%, #111827 50%, #1e3a8a 100%)'
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isDarkMode ? 0.15 : 0.2
            }}
          />
          <div className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent" 
              : "bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"
          }`} />
        </div>

        {/* Animated Elements */}
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl animate-pulse transition-all duration-500 ${
          isDarkMode ? "bg-amber-400/10" : "bg-amber-500/10"
        }`} />
        <div className={`absolute bottom-10 left-10 w-48 h-48 rounded-full blur-3xl transition-all duration-500 ${
          isDarkMode ? "bg-blue-400/10" : "bg-blue-500/10"
        }`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border transition-all duration-500 ${
              isDarkMode 
                ? "bg-white/5 border-white/10" 
                : "bg-white/10 border-white/20"
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse transition-all duration-500 ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              <span className={`text-sm font-medium tracking-wide transition-all duration-500 ${
                isDarkMode ? "text-amber-300" : "text-amber-400"
              }`}>
                PREMIUM PROPERTIES
              </span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl font-bold mb-6 transition-all duration-500">
              Discover Your <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Dream Home</span>
            </h1>

            <p className={`text-lg max-w-2xl mx-auto mb-10 transition-all duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-300"
            }`}>
              Explore our exclusive collection of premium properties, meticulously curated for luxury living and smart investments.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className={`backdrop-blur-lg rounded-2xl p-1 border transition-all duration-500 ${
                isDarkMode 
                  ? "bg-white/5 border-white/10" 
                  : "bg-white/10 border-white/20"
              }`}>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <SearchIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-400"
                      }`} size={20} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Search by location, property type, or keyword..."
                        className={`w-full bg-transparent border-none placeholder-gray-400 pl-12 pr-4 py-4 focus:outline-none text-lg transition-all duration-500 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap`}
                  >
                    <FilterIcon size={20} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className={`rounded-2xl shadow-2xl p-6 border transition-all duration-500 ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-100"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  Price Range
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={globalMinPrice}
                      max={globalMaxPrice}
                      step="100000"
                      value={minPrice}
                      onChange={(e) => handlePriceRangeChange(parseInt(e.target.value), maxPrice)}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-500 ${
                        isDarkMode 
                          ? "bg-gray-700 [&::-webkit-slider-thumb]:bg-amber-400" 
                          : "bg-gray-200 [&::-webkit-slider-thumb]:bg-amber-500"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, maxPrice)}
                      className={`w-28 px-3 py-1.5 rounded-lg border text-sm ${
                        isDarkMode 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => handlePriceRangeChange(minPrice, parseInt(e.target.value) || 0)}
                      className={`w-28 px-3 py-1.5 rounded-lg border text-sm ${
                        isDarkMode 
                          ? "bg-gray-700 border-gray-600 text-white" 
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  Bedrooms
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setBedrooms(num);
                        setCurrentPage(1);
                      }}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        bedrooms === num
                          ? 'bg-amber-500 text-white'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  Bathrooms
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setBathrooms(num);
                        setCurrentPage(1);
                      }}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        bathrooms === num
                          ? 'bg-amber-500 text-white'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-gray-200" 
                      : "bg-gray-100 border-gray-300 text-gray-700"
                  }`}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>

              {/* View Mode */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  View Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-amber-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <GridIcon size={18} />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-amber-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ListIcon size={18} />
                    List
                  </button>
                </div>
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className={`w-full py-2.5 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400" 
                      : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  <XIcon size={18} />
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className={`mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {totalItems}
                </div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Total Properties
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  ${globalMinPrice.toLocaleString()}
                </div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Starting From
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {categories.length}
                </div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Property Types
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  98%
                </div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className={`text-2xl font-bold transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Browse by <span className="text-amber-500">Category</span>
            </h2>
            <p className={`mt-1 transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Found {properties.length} properties
            </p>
          </div>
          
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = activeCategory === option.id;
              
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveCategory(option.id);
                    setCurrentPage(1);
                  }}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg"
                      : isDarkMode
                        ? "bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:bg-gray-700"
                        : "bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <span className="font-medium text-sm">{option.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20' 
                      : isDarkMode
                        ? 'bg-gray-700 group-hover:bg-amber-900/30'
                        : 'bg-gray-100 group-hover:bg-amber-100'
                  }`}>
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
                : 'space-y-8'
            }`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} viewMode={viewMode} isDarkMode={isDarkMode} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode 
                      ? "border-gray-700 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  )
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return (
                        <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                          page === currentPage
                            ? 'bg-amber-500 text-white'
                            : isDarkMode
                              ? 'text-gray-400 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode 
                      ? "border-gray-700 text-gray-300 hover:bg-gray-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
                isDarkMode 
                  ? "bg-gradient-to-br from-amber-900/20 to-orange-900/20" 
                  : "bg-gradient-to-br from-amber-100 to-orange-100"
              }`}>
                <SearchIcon size={32} className="text-amber-500" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                No Properties Found
              </h3>
              <p className={`mb-8 transition-colors duration-500 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className={`py-16 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-r from-gray-800 to-gray-900" 
          : "bg-gradient-to-r from-gray-900 to-blue-900"
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className={`text-lg mb-10 max-w-2xl mx-auto transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-300"
          }`}>
            Our expert agents can help you find the perfect property that matches your exact requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Contact Our Agents
            </Link>
            <Link
              href="/valuation"
              className={`backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 hover:bg-white/10" 
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
            >
              Get Free Valuation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}