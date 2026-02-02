"use client";

import { useState } from "react";
import Link from "next/link";
import { Property } from "@/data";
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

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get property images based on ID
  const getPropertyImage = (id: number) => {
    const images = [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Modern Villa
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Luxury Penthouse
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80", // Contemporary Estate
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&q=80", // Urban Loft
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Luxury Villa
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Executive Suite
    ];
    return images[id % images.length] || images[0];
  };

  // Get property icon based on category
  const getPropertyIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Modern Homes': '🏠',
      'Luxury Estates': '🏰',
      'Apartments': '🏢',
      'Villas': '🏡',
      'Commercial': '🏪',
      'Beachfront': '🏖️',
      'Urban Living': '🏙️',
      'Investment': '💰',
      'Luxury Villa': '🏡',
      'Residential Home': '🏠',
      'Apartment': '🏢',
    };
    return icons[category] || '🏠';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'For Sale': 'from-emerald-500 to-green-600',
      'For Rent': 'from-blue-500 to-cyan-600',
      'Sold': 'from-gray-500 to-gray-700',
      'Featured': 'from-amber-500 to-orange-600',
      'Hot': 'from-pink-500 to-rose-600',
      'New': 'from-purple-500 to-indigo-600',
    };
    return colors[status] || 'from-gray-500 to-gray-700';
  };

  const propertyImage = getPropertyImage(property.id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Property Image */}
      <div className="relative h-64 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{
            backgroundImage: `url(${propertyImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className={`bg-gradient-to-r ${getStatusColor(property.status)} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
            {property.status}
          </div>
          {property.featured && (
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
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
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon 
              size={18} 
              className={liked ? "fill-red-500 text-red-500" : "text-white"} 
            />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            aria-label="Quick view"
            onClick={(e) => e.preventDefault()}
          >
            <EyeIcon size={18} className="text-white" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="text-2xl font-bold text-white drop-shadow-lg">
            ${property.price.toLocaleString()}
          </div>
          <div className="text-white/90 text-sm flex items-center gap-1">
            {getPropertyIcon(property.category)}
            <span>For {property.for}</span>
          </div>
        </div>

        {/* View Count */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/80 text-sm">
          <EyeIcon size={14} />
          <span>{property.views || Math.floor(Math.random() * 500) + 100}</span>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5">
        {/* Category & Meta */}
        <div className="mb-3 flex items-center justify-between">
          <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
            {property.category}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{property.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPinIcon size={16} className="text-gray-400" />
          <span className="text-sm truncate">{property.address}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {property.description}
        </p>

        {/* Property Features */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl group-hover:bg-amber-50 transition-colors duration-300">
            <BedIcon size={18} className="text-amber-500 mb-1" />
            <span className="text-gray-900 font-semibold text-sm">{property.bedrooms}</span>
            <span className="text-gray-500 text-xs">Beds</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl group-hover:bg-amber-50 transition-colors duration-300">
            <BathIcon size={18} className="text-amber-500 mb-1" />
            <span className="text-gray-900 font-semibold text-sm">{property.bathrooms}</span>
            <span className="text-gray-500 text-xs">Baths</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl group-hover:bg-amber-50 transition-colors duration-300">
            <ParkingIcon size={18} className="text-amber-500 mb-1" />
            <span className="text-gray-900 font-semibold text-sm">{property.parking || '2'}</span>
            <span className="text-gray-500 text-xs">Parking</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-xl group-hover:bg-amber-50 transition-colors duration-300">
            <AreaIcon size={18} className="text-amber-500 mb-1" />
            <span className="text-gray-900 font-semibold text-sm">{property.size || '2,500'}</span>
            <span className="text-gray-500 text-xs">Sq Ft</span>
          </div>
        </div>

        {/* Rating & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  size={14} 
                  className={`${i < Math.floor(property.rating || 4.5) ? 'fill-amber-400 text-amber-400' : 'fill-gray-300 text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm">({property.reviews || '42'} reviews)</span>
          </div>
          <Link
            href={`/properties/${property.id}`}
            className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 group/cta"
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
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none" />

    
    </div>
  );
}
