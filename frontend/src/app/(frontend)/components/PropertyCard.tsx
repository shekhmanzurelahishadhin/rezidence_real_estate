// app/(frontend)/components/PropertyCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BedIcon, 
  BathIcon, 
  ParkingIcon, 
  MapPinIcon, 
  StarIcon,
  HeartIcon,
  EyeIcon,
  AreaIcon 
} from "@/assets/icons";

// Define the property type based on your API data
interface ApiProperty {
  id: number;
  title: string;
  slug: string;
  description: string;
  category_id: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number | string;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  parking: string | null;
  features: string[] | null;
  images: string[] | null;
  featured_image: string | null;
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

interface PropertyCardProps {
  property: ApiProperty;
  viewMode?: 'grid' | 'list';
  isDarkMode?: boolean;
}

export default function PropertyCard({ property, viewMode = 'grid', isDarkMode = false }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Get property image
  const getPropertyImage = () => {
    if (imageError) {
      return `https://placehold.co/600x400/3b82f6/white?text=${encodeURIComponent(property.title || 'Property')}`;
    }
    
    if (property.featured_image) {
      return `${baseUrl}/storage/${property.featured_image}`;
    }
    
    if (property.images && property.images.length > 0) {
      return `${baseUrl}/storage/${property.images[0]}`;
    }
    
    // Fallback images based on category
    const fallbackImages: Record<string, string> = {
      'Apartments': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'Modern Homes': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      'Villas': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    };
    
    const categoryName = property.category?.name || '';
    return fallbackImages[categoryName] || 'https://placehold.co/600x400/3b82f6/white?text=Property';
  };

  // Get property icon based on category
  const getPropertyIcon = () => {
    const categoryName = property.category?.name || '';
    const icons: Record<string, string> = {
      'Modern Homes': '🏠',
      'Luxury Estates': '🏰',
      'Apartments': '🏢',
      'Villas': '🏡',
      'Commercial': '🏪',
      'Beachfront': '🏖️',
      'Urban Living': '🏙️',
      'Investment': '💰',
    };
    return icons[categoryName] || '🏠';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, { light: string; dark: string }> = {
      'published': { light: 'from-emerald-500 to-green-600', dark: 'from-emerald-400 to-green-500' },
      'pending': { light: 'from-yellow-500 to-amber-600', dark: 'from-yellow-400 to-amber-500' },
      'draft': { light: 'from-gray-500 to-gray-700', dark: 'from-gray-400 to-gray-600' },
      'archived': { light: 'from-gray-600 to-gray-800', dark: 'from-gray-500 to-gray-700' },
    };
    return colors[status] || colors['published'];
  };

  // Get status display text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'For Sale';
      case 'pending': return 'Pending';
      case 'draft': return 'Draft';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  const propertyImage = getPropertyImage();
  const statusColors = getStatusColor(property.status);
  const statusText = getStatusText(property.status);

  // Format price
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toLocaleString();
  };

  if (viewMode === 'list') {
    return (
      <div className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        isDarkMode 
          ? "bg-gray-800 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-black/20" 
          : "bg-white shadow-lg hover:shadow-2xl"
      }`}>
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative lg:w-1/3 h-64 lg:h-auto overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url(${propertyImage})`,
              }}
              onError={() => setImageError(true)}
            >
              <div className={`absolute inset-0 transition-all duration-500 ${
                isDarkMode 
                  ? "bg-gradient-to-t from-black/50 via-black/30 to-transparent" 
                  : "bg-gradient-to-t from-black/40 via-black/20 to-transparent"
              }`} />
            </div>
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className={`bg-gradient-to-r ${statusColors.light} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                {statusText}
              </div>
              {property.featured && (
                <div className={`bg-gradient-to-r ${isDarkMode ? 'from-pink-400 to-purple-400' : 'from-pink-500 to-purple-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                  FEATURED
                </div>
              )}
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4">
              <div className="text-2xl font-bold text-white drop-shadow-lg">
                ${formatPrice(property.price)}
              </div>
              <div className="text-white/90 text-sm flex items-center gap-1">
                {getPropertyIcon()}
                <span>{property.category?.name || 'Property'}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 p-6">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-500 ${
                    isDarkMode 
                      ? "bg-amber-400/10 text-amber-300" 
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {property.category?.name || 'Property'}
                  </span>
                  <h3 className={`text-xl font-bold mt-3 group-hover:text-amber-500 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPinIcon size={16} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                    <span className={`text-sm transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {property.address}, {property.city}, {property.state}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setLiked(!liked);
                    }}
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    aria-label={liked ? "Remove from favorites" : "Add to favorites"}
                  >
                    <HeartIcon 
                      size={18} 
                      className={liked ? "fill-red-500 text-red-500" : isDarkMode ? "text-gray-400" : "text-gray-600"} 
                    />
                  </button>
                  <button 
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    aria-label="Quick view"
                    onClick={(e) => e.preventDefault()}
                  >
                    <EyeIcon size={18} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className={`mb-6 line-clamp-2 transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {property.description}
              </p>

              {/* Property Features */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { icon: <BedIcon size={18} />, label: "Beds", value: property.bedrooms || 0 },
                  { icon: <BathIcon size={18} />, label: "Baths", value: property.bathrooms || 0 },
                  { icon: <ParkingIcon size={18} />, label: "Parking", value: property.parking || '2' },
                  { icon: <AreaIcon size={18} />, label: "Sq Ft", value: property.size ? property.size.toLocaleString() : 'N/A' },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                      isDarkMode 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-gray-50 hover:bg-amber-50"
                    }`}
                  >
                    <div className="text-amber-500 mb-1">{feature.icon}</div>
                    <span className={`font-semibold text-sm transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {feature.value}
                    </span>
                    <span className={`text-xs transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={`flex items-center justify-between pt-4 mt-auto border-t transition-colors duration-500 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        size={14} 
                        className={`${i < 4 
                          ? isDarkMode ? 'fill-amber-400 text-amber-400' : 'fill-amber-400 text-amber-400'
                          : isDarkMode ? 'fill-gray-700 text-gray-700' : 'fill-gray-300 text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    (42 reviews)
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <EyeIcon size={14} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                      {property.views || 0}
                    </span>
                  </div>
                  <Link
                    href={`/properties/${property.slug}`}
                    className={`font-semibold text-sm flex items-center gap-1 group/cta transition-colors duration-300 ${
                      isDarkMode 
                        ? "text-amber-400 hover:text-amber-300" 
                        : "text-amber-600 hover:text-amber-700"
                    }`}
                  >
                    View Details
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="group-hover/cta:translate-x-1 transition-transform duration-300"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Border Effect */}
        <div className={`absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none ${
          isDarkMode ? "group-hover:border-amber-400/20" : ""
        }`} />
      </div>
    );
  }

  // Grid View (default)
  return (
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
      isDarkMode 
        ? "bg-gray-800 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-black/20" 
        : "bg-white shadow-lg hover:shadow-2xl"
    }`}>
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{
            backgroundImage: `url(${propertyImage})`,
          }}
          onError={() => setImageError(true)}
        >
          <div className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-t from-black/50 via-black/30 to-transparent" 
              : "bg-gradient-to-t from-black/40 via-black/20 to-transparent"
          }`} />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className={`bg-gradient-to-r ${statusColors.light} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
            {statusText}
          </div>
          {property.featured && (
            <div className={`bg-gradient-to-r ${isDarkMode ? 'from-pink-400 to-purple-400' : 'from-pink-500 to-purple-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
              FEATURED
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 ${
              isDarkMode 
                ? "bg-white/10 hover:bg-white/20" 
                : "bg-white/20 hover:bg-white/30"
            }`}
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon 
              size={18} 
              className={liked ? "fill-red-500 text-red-500" : "text-white"} 
            />
          </button>
          <button 
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 ${
              isDarkMode 
                ? "bg-white/10 hover:bg-white/20" 
                : "bg-white/20 hover:bg-white/30"
            }`}
            aria-label="Quick view"
            onClick={(e) => e.preventDefault()}
          >
            <EyeIcon size={18} className="text-white" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="text-2xl font-bold text-white drop-shadow-lg">
            ${formatPrice(property.price)}
          </div>
          <div className="text-white/90 text-sm flex items-center gap-1">
            {getPropertyIcon()}
            <span>{property.category?.name || 'Property'}</span>
          </div>
        </div>

        {/* View Count */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/80 text-sm">
          <EyeIcon size={14} />
          <span>{property.views || 0}</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5">
        {/* Category & Meta */}
        <div className="mb-3 flex items-center justify-between">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-500 ${
            isDarkMode 
              ? "bg-amber-400/10 text-amber-300" 
              : "bg-amber-50 text-amber-700"
          }`}>
            {property.category?.name || 'Property'}
          </span>
          <div className={`flex items-center gap-1 text-sm transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{new Date(property.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold group-hover:text-amber-500 transition-colors duration-300 mb-2 line-clamp-1 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <MapPinIcon size={16} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
          <span className={`text-sm truncate transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {property.address}, {property.city}
          </span>
        </div>

        {/* Description */}
        <p className={`text-sm mb-5 line-clamp-2 transition-colors duration-500 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          {property.description}
        </p>

        {/* Property Features */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: <BedIcon size={18} />, label: "Beds", value: property.bedrooms || 0 },
            { icon: <BathIcon size={18} />, label: "Baths", value: property.bathrooms || 0 },
            { icon: <ParkingIcon size={18} />, label: "Parking", value: property.parking || '2' },
            { icon: <AreaIcon size={18} />, label: "Sq Ft", value: property.size ? property.size.toLocaleString() : 'N/A' },
          ].map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                isDarkMode 
                  ? "bg-gray-700/50 hover:bg-gray-700" 
                  : "bg-gray-50 hover:bg-amber-50"
              }`}
            >
              <div className="text-amber-500 mb-1">{feature.icon}</div>
              <span className={`font-semibold text-sm transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {feature.value}
              </span>
              <span className={`text-xs transition-colors duration-500 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        {/* Rating & CTA */}
        <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-500 ${
          isDarkMode ? "border-gray-700" : "border-gray-100"
        }`}>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  size={14} 
                  className={`${i < 4 
                    ? isDarkMode ? 'fill-amber-400 text-amber-400' : 'fill-amber-400 text-amber-400'
                    : isDarkMode ? 'fill-gray-700 text-gray-700' : 'fill-gray-300 text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-sm transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              (42 reviews)
            </span>
          </div>
          <Link
            href={`/properties/${property.slug}`}
            className={`font-semibold text-sm flex items-center gap-1 group/cta transition-colors duration-300 ${
              isDarkMode 
                ? "text-amber-400 hover:text-amber-300" 
                : "text-amber-600 hover:text-amber-700"
            }`}
          >
            View Details
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="group-hover/cta:translate-x-1 transition-transform duration-300"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className={`absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none ${
        isDarkMode ? "group-hover:border-amber-400/20" : ""
      }`} />
    </div>
  );
}