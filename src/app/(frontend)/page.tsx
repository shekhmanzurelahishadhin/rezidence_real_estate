"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { properties, categories, blogs, faqs } from "@/data";
import PropertyCard from "@/app/(frontend)/components/PropertyCard";
import BlogCard from "@/app/(frontend)/components/BlogCard";
import FAQAccordion from "@/app/(frontend)/components/FAQAccordion";
import {
  BedIcon,
  BathIcon,
  ParkingIcon,
  BarIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
  HomeIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@/assets/icons";

// Unsplash image URLs
const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  modernVilla: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  luxuryPenthouse: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  cityView: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  agentProfile: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
  property1: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  property2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  property3: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  blog1: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
  blog2: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  blog3: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
};

// Property images for the carousel
const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&q=80",
];

// ─── HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const hero = properties[0];

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(30, 58, 138, 0.8)), url(${IMAGES.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium tracking-wide">
                PREMIUM LISTING
              </span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Discover Your{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-8">
              Experience luxury living with our curated collection of premium properties.
              From modern apartments to exclusive villas, find your perfect space.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/20 max-w-xl mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by location, property type..."
                      className="w-full bg-transparent border-none text-white placeholder-gray-400 pl-12 pr-4 py-3 focus:outline-none"
                    />
                  </div>
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2">
                  Search
                  <ArrowRightIcon size={18} color="#fff" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {[
                { value: "500+", label: "Properties" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Property Card */}
          <div
            className="transition-all duration-1000 delay-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
            }}
          >
            <div className="relative group">
              <div
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  backgroundImage: `url(${IMAGES.modernVilla})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                {/* Property Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-1">{hero.title}</h3>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPinIcon size={16} color="#9CA3AF" />
                        <span className="text-sm">{hero.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-400">${hero.price.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">For sale</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                    {[
                      { icon: <BedIcon size={20} color="#FBBF24" />, label: "4 Beds" },
                      { icon: <BathIcon size={20} color="#FBBF24" />, label: "3 Baths" },
                      { icon: <ParkingIcon size={20} color="#FBBF24" />, label: "2 Parking" },
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="bg-amber-400/10 p-2 rounded-lg">
                          {feat.icon}
                        </div>
                        <span className="text-white text-sm font-medium">{feat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Action Button */}
              <button className="absolute top-6 right-6 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 group-hover:scale-110">
                <ArrowUpRightIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────
function Categories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-0.5 bg-amber-400" />
            EXPLORE PROPERTIES
          </span>
          <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-amber-500">Property Type</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Browse through our diverse collection of premium properties tailored to your lifestyle.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            // Map each category to a specific image
            const getCategoryImage = (label: string): string => {
              const imageMap: Record<string, string> = {
                'Modern Homes': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Luxury Estates': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&q=80',
                'Apartments': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Villas': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                'Commercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Beachfront': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Urban Living': 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Investment': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
              };
              return imageMap[label] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
            };

            const getCategoryIcon = (label: string): string => {
              const iconMap: Record<string, string> = {
                'Modern Homes': '🏠',
                'Luxury Estates': '🏰',
                'Apartments': '🏢',
                'Villas': '🏡',
                'Commercial': '🏪',
                'Beachfront': '🏖️',
                'Urban Living': '🏙️',
                'Investment': '📈',
              };
              return iconMap[label] || '🏠';
            };

            const getPriceRange = (label: string): string => {
              const priceMap: Record<string, string> = {
                'Modern Homes': '$450K - $2M',
                'Luxury Estates': '$1.2M - $10M',
                'Apartments': '$250K - $800K',
                'Villas': '$800K - $5M',
                'Commercial': '$500K - $15M',
                'Beachfront': '$1M - $8M',
                'Urban Living': '$300K - $1.5M',
                'Investment': '$200K - $3M',
              };
              return priceMap[label] || '$250K+';
            };

            return (
              <Link
                key={cat.id}
                href={`/properties?category=${cat.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Main Category Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${getCategoryImage(cat.label)})`
                    }}
                  />

                  {/* Dark Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                  {/* Category Icon */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <span className="text-lg">{getCategoryIcon(cat.label)}</span>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-semibold">{cat.count}+</span>
                    </div>
                  </div>

                  {/* Category Title Over Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold">{cat.label}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-300 text-sm font-medium">{getPriceRange(cat.label)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-amber-600 text-sm font-semibold flex items-center gap-1">
                      Browse Properties
                      <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="text-gray-400 text-xs">
                      Available now
                    </span>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED PROPERTY ────────────────────────────────────────────────────
function FeaturedProperty() {
  const featured = properties[1];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PROPERTY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PROPERTY_IMAGES.length) % PROPERTY_IMAGES.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-amber-100/30 to-blue-100/30 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            {/* Left - Property Showcase */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-amber-600 text-sm font-semibold">FEATURED PROPERTY</span>
              </div>

              <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold">
                {featured.title}
              </h2>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon size={20} className="text-gray-400" />
                  <span className="text-gray-600">{featured.address}</span>
                </div>
                <div className="px-3 py-1 bg-green-100 rounded-full">
                  <span className="text-green-700 text-sm font-medium">AVAILABLE</span>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {featured.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <BedIcon size={24} className="text-amber-500" />, label: "4 Bedrooms", value: "Master Suite" },
                  { icon: <BathIcon size={24} className="text-amber-500" />, label: "3 Bathrooms", value: "With Jacuzzi" },
                  { icon: <ParkingIcon size={24} className="text-amber-500" />, label: "Parking", value: "2 Covered" },
                  { icon: <BarIcon size={24} className="text-amber-500" />, label: "Living Area", value: "3,200 sqft" },
                ].map((feat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-amber-200 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-50 p-2 rounded-lg">
                        {feat.icon}
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">{feat.label}</div>
                        <div className="text-gray-500 text-sm">{feat.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="/contact"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 text-center"
                >
                  Schedule a Tour
                  <ArrowRightIcon size={20} />
                </Link>
                <Link
                  href={`/properties/${featured.id}`}
                  className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Right - Image Carousel */}
            <div className="relative">
              {/* Main Carousel Image */}
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <div
                  className="w-full h-full transition-all duration-500 ease-in-out"
                  style={{
                    backgroundImage: `url(${PROPERTY_IMAGES[currentImageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scale(1.02)' // Slight zoom to prevent borders
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                </div>

                {/* Price Tag */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                    <div className="text-3xl font-bold text-gray-900">${featured.price.toLocaleString()}</div>
                    <div className="text-green-600 text-sm font-semibold">-12% Below Market</div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <ChevronLeftIcon size={24} className="text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <ChevronRightIcon size={24} className="text-gray-800" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {PROPERTY_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? 'bg-amber-500 w-8'
                        : 'bg-white/60 hover:bg-white'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-4 mt-6">
                {PROPERTY_IMAGES.slice(0, 3).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-1 h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${index === currentImageIndex
                      ? 'ring-2 ring-amber-500 ring-offset-2'
                      : 'hover:opacity-80'
                      }`}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </button>
                ))}
                <button
                  onClick={() => goToImage(3)}
                  className="flex-1 h-24 rounded-xl overflow-hidden cursor-pointer group relative"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${PROPERTY_IMAGES[3]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300">
                    <span className="text-white text-sm font-semibold">+{PROPERTY_IMAGES.length - 3}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    {
      quote: "The entire process was seamless. Found our dream home in just 3 weeks!",
      author: "Sarah Chen",
      role: "Tech Entrepreneur",
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
      rating: 5,
    },
    {
      quote: "Professional service from start to finish. The team really understands luxury real estate.",
      author: "Michael Rodriguez",
      role: "Investment Banker",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      rating: 5,
    },
    {
      quote: "Exceeded all expectations. The property valuation was spot on and helped us sell above asking price.",
      author: "Jessica Williams",
      role: "Interior Designer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      rating: 5,
    },
    {
      quote: "Amazing experience! They found us a perfect investment property that's already appreciating.",
      author: "David Kim",
      role: "Real Estate Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
      rating: 5,
    },
    {
      quote: "Patient, knowledgeable, and always available. Made our first home buying experience stress-free.",
      author: "Alex & Taylor Morgan",
      role: "First-time Buyers",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Determine visible testimonials
  const getVisibleTestimonials = () => {
    if (window.innerWidth >= 768) {
      // On medium screens and above, show 3 testimonials
      const indices = [];
      for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + testimonials.length) % testimonials.length;
        indices.push(index);
      }
      return indices.map(idx => testimonials[idx]);
    } else {
      // On mobile, show only current testimonial
      return [testimonials[currentIndex]];
    }
  };

  function AnimatedCounter({ value, duration = 2000, className = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        setCount(Math.floor(percentage * value));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span className={className}>{count.toLocaleString()}</span>;
  }
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-0.5 bg-amber-400" />
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
            Trusted by <span className="text-amber-500">Thousands</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Hear what our clients have to say about their experience
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 group hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon size={24} className="text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 group hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon size={24} className="text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
          </button>

          {/* Carousel Track */}
          <div className="relative">
            <div className="flex justify-center">
              {/* For mobile: Single card */}
              <div className="block md:hidden w-full max-w-lg">
                <div
                  key={currentIndex}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-8 right-8 text-amber-100 text-5xl">"</div>

                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <StarIcon key={i} size={20} className="fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-lg italic mb-8 relative z-10">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="relative">
                      <div
                        className="w-12 h-12 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${testimonials[currentIndex].image})` }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                        <StarIcon size={10} className="fill-white" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonials[currentIndex].author}</div>
                      <div className="text-gray-500 text-sm">{testimonials[currentIndex].role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* For desktop: Three cards with center focus */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {getVisibleTestimonials().map((testimonial, index) => {
                  const actualIndex = testimonials.findIndex(t => t.author === testimonial.author);
                  const isCenter = index === 1; // Middle card is the focused one

                  return (
                    <div
                      key={actualIndex}
                      className={`
                        bg-white rounded-2xl p-6 lg:p-8 shadow-xl transition-all duration-500
                        ${isCenter
                          ? 'scale-100 z-20 shadow-2xl border border-amber-100'
                          : 'scale-95 lg:scale-90 opacity-80 blur-[1px] hover:blur-0 hover:opacity-100 hover:scale-95'
                        }
                        ${index === 0 ? 'rotate-[-1deg]' : index === 2 ? 'rotate-[1deg]' : ''}
                      `}
                      style={{
                        width: isCenter ? '380px' : '340px',
                        height: '380px',
                      }}
                    >
                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 text-amber-100 text-4xl">"</div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} size={18} className="fill-amber-400" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-gray-600 lg:text-lg italic mb-6 relative z-10 line-clamp-5">
                        "{testimonial.quote}"
                      </p>

                      {/* Author */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                          <div className="relative">
                            <div
                              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${testimonial.image})` }}
                            />
                            {isCenter && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                <StarIcon size={10} className="fill-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm lg:text-base">{testimonial.author}</div>
                            <div className="text-gray-500 text-xs lg:text-sm">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>

                      {/* Highlight for center card */}
                      {isCenter && (
                        <>
                          <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                          <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                            FEATURED
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <button
              onClick={prevSlide}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon size={20} className="text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon size={20} className="text-gray-600 group-hover:text-amber-600 transition-colors duration-300" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 3000);
                }}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex
                    ? 'w-8 bg-amber-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 text-gray-500 text-sm hover:text-amber-600 transition-colors duration-300"
            >
              <div className={`w-8 h-4 rounded-full transition-colors duration-300 ${isAutoPlaying ? 'bg-amber-500' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${isAutoPlaying ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Click to play'}</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 relative">
          {/* Floating background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 rounded-3xl overflow-hidden">
            {/* Animated gradient mesh background */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23fbbf24' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px 100px'
                }}
              />
            </div>

            {/* Animated floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${10 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-r from-amber-500/20 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main content */}

        </div>

      </div>
    </section>
  );
}

// ─── BLOG STRIP ───────────────────────────────────────────────────────────
function BlogStrip() {
  const blogImages = [IMAGES.blog1, IMAGES.blog2, IMAGES.blog3];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-0.5 bg-amber-400" />
              MARKET INSIGHTS
            </span>
            <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
              Latest <span className="text-amber-500">Real Estate</span> News
            </h2>
            <p className="text-gray-600 text-lg">
              Stay informed with expert analysis, market trends, and investment opportunities.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-amber-600 font-semibold text-lg hover:gap-4 transition-all duration-300"
          >
            View All Articles
            <ArrowUpRightIcon size={20} className="text-amber-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <Link href={`/blogs/${blog.slug}`} passHref key={blog.id}>
              <article
                key={blog.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div
                  className="relative h-56 overflow-hidden group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${blogImages[index] || IMAGES.blog1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${IMAGES.agentProfile})` }}
                      />
                      <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────
function Marquee() {
  const items = [
    "🏆 AWARD-WINNING REAL ESTATE AGENCY",
    "🔑 500+ PROPERTIES SOLD THIS YEAR",
    "⭐ 98% CLIENT SATISFACTION RATE",
    "💰 GET FREE PROPERTY VALUATION TODAY",
    "📱 DOWNLOAD OUR MOBILE APP",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-blue-900 overflow-hidden py-6">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="animate-marquee flex gap-12">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 text-white/80 text-sm font-semibold tracking-wider whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {item}
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────
function FAQSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url(${IMAGES.cityView})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />

              {/* Floating Cards */}
              <div className="absolute top-8 left-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <ShieldCheckIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Secure Process</div>
                      <div className="text-gray-500 text-sm">End-to-end encryption</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <TrendingUpIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Market Insights</div>
                      <div className="text-gray-500 text-sm">Real-time analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - FAQ */}
          <div>
            <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-0.5 bg-amber-400" />
              FAQ
            </span>
            <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-amber-500">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-lg">
              Everything you need to know about buying, selling, or investing in real estate.
            </p>

            <div className="space-y-4">
              <FAQAccordion faqs={faqs} />
            </div>

            <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <span className="text-white text-2xl font-bold">?</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-gray-900 text-lg">Still have questions?</h3>
                  <p className="text-gray-600 text-sm mt-1">Contact our support team for personalized assistance.</p>
                </div>
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(30, 58, 138, 0.8)), url(${IMAGES.heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/80" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-400 text-sm font-semibold tracking-wide">
            START YOUR JOURNEY
          </span>
        </div>

        <h2 className="text-white text-4xl lg:text-6xl font-bold mb-8">
          Ready to Find Your <span className="text-amber-400">Dream Home?</span>
        </h2>

        <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
          Join thousands of satisfied clients who found their perfect property with our expert guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-10 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
          >
            Get Started Free
            <ArrowRightIcon size={22} />
          </Link>
          <Link
            href="/properties"
            className="bg-white/10 backdrop-blur-sm text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            Browse Properties
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/20">
          {[
            { value: "30-min", label: "Response Time" },
            { value: "Free", label: "Consultation" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Categories />
      <FeaturedProperty />
      <Testimonials />
      <BlogStrip />
      <Marquee />
      <FAQSection />
      <CTA />
    </div>
  );
}