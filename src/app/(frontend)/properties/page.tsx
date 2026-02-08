"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { properties, categories } from "@/data";
import PropertyCard from "@/app/(frontend)/components/PropertyCard";
import {
  FilterIcon,
  GridIcon,
  ListIcon,
  ChevronDownIcon,
  SearchIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  ParkingIcon,
  TrendingUpIcon,
  StarIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

export default function PropertiesPage() {
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = ["All", ...categories.map((c) => c.label)];

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property) => {
      if (activeFilter !== "All" && property.category !== activeFilter) {
        return false;
      }
      if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }
      if (bedrooms > 0 && property.bedrooms < bedrooms) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return b.rating - a.rating;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Auto-scroll to top when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeFilter]);

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
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-500 ${
                        isDarkMode 
                          ? "bg-gray-700 [&::-webkit-slider-thumb]:bg-amber-400 [&::-moz-range-thumb]:bg-amber-400" 
                          : "bg-gray-200 [&::-webkit-slider-thumb]:bg-amber-500 [&::-moz-range-thumb]:bg-amber-500"
                      }`}
                    />
                  </div>
                  <div className={`text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
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
                      onClick={() => setBedrooms(num)}
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

              {/* Sort By */}
              <div>
                <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border-none focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 text-gray-200" 
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <option value="latest">Latest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
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
            </div>

            {/* Stats */}
            <div className={`mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}>
              <div className="text-center">
                <div className={`text-2xl font-bold transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {properties.length}
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
                  ${Math.min(...properties.map(p => p.price)).toLocaleString()}
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
                  {Math.round(properties.reduce((acc, p) => acc + p.rating, 0) / properties.length)}%
                </div>
                <div className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Avg. Satisfaction
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
              Found {filteredProperties.length} properties
            </p>
          </div>
          
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option;
              const count = option === "All" 
                ? properties.length 
                : properties.filter(p => p.category === option).length;
              
              return (
                <button
                  key={option}
                  onClick={() => setActiveFilter(option)}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg"
                      : isDarkMode
                        ? "bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:bg-gray-700"
                        : "bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <span className="font-medium text-sm">{option}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20' 
                      : isDarkMode
                        ? 'bg-gray-700 group-hover:bg-amber-900/30'
                        : 'bg-gray-100 group-hover:bg-amber-100'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredProperties.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
              : 'space-y-8'
          }`}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} viewMode={viewMode} isDarkMode={isDarkMode} />
            ))}
          </div>
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
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                  setPriceRange([0, 10000000]);
                  setBedrooms(0);
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Load More / Pagination */}
        {filteredProperties.length > 0 && (
          <div className="mt-12 text-center">
            <button className={`border-2 font-semibold px-8 py-3 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400" 
                : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
            }`}>
              Load More Properties
            </button>
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