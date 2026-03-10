// app/(frontend)/properties/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BedIcon,
  BathIcon,
  ParkingIcon,
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  AreaIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShareIcon,
  HeartIcon,
  CheckIcon,
  XIcon,
  HomeIcon,
  RulerIcon,
  BuildingIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import { frontendPropertyService } from "@/app/(frontend)/services/propertyService";
import { Property } from "@/app/(frontend)/types/property";
import PropertyCard from "@/app/(frontend)/components/PropertyCard";
import toast from "react-hot-toast";

export default function PropertyDetailPage() {
  const { isDarkMode } = useTheme();
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // In your PropertyDetailPage component, update the useEffect:

useEffect(() => {
  if (slug) {
    fetchPropertyData();
  } else {
    console.log('No slug provided, waiting...');
  }
}, [slug]);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      
      console.log('🔍 Fetching property with slug:', slug);
      
      // Fetch main property
      const propertyData = await frontendPropertyService.getPropertyBySlug(slug);
      
      console.log('📦 Property data received:', propertyData);
      
      if (!propertyData) {
        setError('Property not found');
        return;
      }
      
      setProperty(propertyData);
      
      // Fetch similar properties
      if (propertyData.category_id) {
        console.log('🔄 Fetching similar properties for category:', propertyData.category_id);
        const similar = await frontendPropertyService.getSimilarProperties(
          propertyData.id, 
          propertyData.category_id
        );
        console.log('📦 Similar properties:', similar);
        setSimilarProperties(similar);
      }
      
    } catch (err) {
      console.error('❌ Error fetching property:', err);
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (key: string) => {
    console.log('Image error for:', key);
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  const getImageUrl = (path: string | null): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // Remove any duplicate 'storage' in the path
    const cleanPath = path.replace(/^\/?storage\//, '');
    return `${baseUrl}/storage/${cleanPath}`;
  };

  const getPropertyImages = (): string[] => {
    if (!property) return [];
    
    const images = [];
    
    // Add featured image if exists
    if (property.featured_image && !imageErrors[`featured-${property.id}`]) {
      const url = getImageUrl(property.featured_image);
      console.log('Featured image URL:', url);
      images.push(url);
    }
    
    // Add additional images if they exist
    if (property.images && property.images.length > 0) {
      property.images.forEach((imgPath, index) => {
        if (!imageErrors[`${property.id}-${index}`]) {
          const url = getImageUrl(imgPath);
          console.log(`Additional image ${index} URL:`, url);
          images.push(url);
        }
      });
    }
    
    // If no images, use fallback
    if (images.length === 0) {
      console.log('No images found, using fallback');
      return [
        `https://placehold.co/1200x800/3b82f6/white?text=${encodeURIComponent(property.title || 'Property')}`,
        `https://placehold.co/1200x800/10b981/white?text=Property+Image+2`,
        `https://placehold.co/1200x800/f59e0b/white?text=Property+Image+3`,
        `https://placehold.co/1200x800/ef4444/white?text=Property+Image+4`,
      ];
    }
    
    return images;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setSubmitting(true);
      await frontendPropertyService.contactAgent(property.id, {
        ...contactForm,
        message: contactForm.message || `I'm interested in ${property.title}`
      });
      toast.success('Message sent successfully! Agent will contact you soon.');
      setShowContactForm(false);
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return { bg: 'bg-gradient-to-r from-emerald-500 to-green-600', text: 'Available' };
      case 'sold':
        return { bg: 'bg-gradient-to-r from-gray-500 to-gray-700', text: 'Sold' };
      case 'pending':
        return { bg: 'bg-gradient-to-r from-yellow-500 to-amber-600', text: 'Pending' };
      case 'draft':
        return { bg: 'bg-gradient-to-r from-gray-400 to-gray-600', text: 'Draft' };
      case 'archived':
        return { bg: 'bg-gradient-to-r from-gray-600 to-gray-800', text: 'Archived' };
      default:
        return { bg: 'bg-gradient-to-r from-blue-500 to-cyan-600', text: status };
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-white to-gray-50"
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-5 text-center transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-white to-gray-50"
      }`}>
        <div className="max-w-md">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-br from-amber-900/20 to-orange-900/20" 
              : "bg-gradient-to-br from-amber-100 to-orange-100"
          }`}>
            <span className="text-3xl">🏡</span>
          </div>
          <h1 className={`text-4xl font-bold mb-3 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Property Not Found
          </h1>
          <p className={`text-lg mb-8 transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            {error || "The listing you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Browse Properties
            <ChevronRightIcon size={20} />
          </Link>
        </div>
      </div>
    );
  }

  const propertyImages = getPropertyImages();
  const statusBadge = getStatusBadge(property.status);

  // Log the final images array
  console.log('Final property images:', propertyImages);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowContactForm(false)} />
          <div className={`relative rounded-2xl p-6 max-w-lg w-full ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Contact Agent
              </h3>
              <button
                onClick={() => setShowContactForm(false)}
                className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <XIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                }`}
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                }`}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                }`}
                required
              />
              <textarea
                placeholder="Message (Optional)"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                }`}
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Image Gallery */}
      <section className="relative">
        <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-gray-200 dark:bg-gray-700">
          {propertyImages.length > 0 ? (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url(${propertyImages[currentImageIndex]})`,
              }}
              onError={() => handleImageError(`main-${currentImageIndex}`)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-t from-black/70 via-black/40 to-transparent" 
              : "bg-gradient-to-t from-black/60 via-black/30 to-transparent"
          }`} />
          
          {/* Navigation Arrows */}
          {propertyImages.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                  isDarkMode 
                    ? "bg-gray-800/80 hover:bg-gray-800" 
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <ChevronLeftIcon size={24} className={isDarkMode ? "text-white" : "text-gray-800"} />
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                  isDarkMode 
                    ? "bg-gray-800/80 hover:bg-gray-800" 
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                <ChevronRightIcon size={24} className={isDarkMode ? "text-white" : "text-gray-800"} />
              </button>
            </>
          )}

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/properties"
                  className={`flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors duration-300 ${
                    isDarkMode 
                      ? "bg-white/10 text-white hover:bg-white/20" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <ChevronLeftIcon size={20} />
                  Back to Properties
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors duration-300 ${
                      isDarkMode 
                        ? "bg-white/10 hover:bg-white/20" 
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <HeartIcon size={20} className={liked ? "fill-red-500 text-red-500" : "text-white"} />
                  </button>
                  <button 
                    onClick={() => setShowContactForm(true)}
                    className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors duration-300 ${
                      isDarkMode 
                        ? "bg-white/10 hover:bg-white/20" 
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <ShareIcon size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Property Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                  {/* Status & Category */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-full ${statusBadge.bg}`}>
                      {statusBadge.text}
                    </span>
                    {property.category && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        {typeof property.category === 'string' ? property.category : property.category.name}
                      </span>
                    )}
                    {property.featured && (
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
                    {property.title}
                  </h1>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPinIcon size={18} />
                    <span className="text-lg">{property.address}, {property.city}, {property.state}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                    ${property.price?.toLocaleString()}
                  </div>
                  <div className="text-white/60">
                    {property.property_type || 'Residential'} • {property.size?.toLocaleString()} sq ft
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Dots */}
          {propertyImages.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {propertyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-amber-500 w-8' 
                      : 'bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {propertyImages.length > 1 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {propertyImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'ring-2 ring-amber-500 ring-offset-2' 
                      : 'hover:opacity-80'
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                    onError={() => handleImageError(`thumb-${index}`)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className={`flex border-b mb-8 overflow-x-auto transition-colors duration-500 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              {[
                { id: 'overview', label: 'Property Overview' },
                { id: 'features', label: 'Features & Amenities' },
                { id: 'location', label: 'Location' },
                { id: 'schedule', label: 'Schedule Tour' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold text-sm whitespace-nowrap transition-colors duration-300 ${
                    activeTab === tab.id
                      ? `text-amber-500 border-b-2 border-amber-500`
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200' 
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content based on active tab */}
            <div className="space-y-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>Property Description</h2>
                    <p className={`leading-relaxed text-lg transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {property.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { 
                          icon: <RulerIcon size={24} />, 
                          label: "Living Area", 
                          value: property.size ? `${property.size.toLocaleString()} sq ft` : 'N/A' 
                        },
                        { 
                          icon: <CalendarIcon size={24} />, 
                          label: "Year Built", 
                          value: property.year_built?.toString() || 'N/A' 
                        },
                        { 
                          icon: <BedIcon size={24} />, 
                          label: "Bedrooms", 
                          value: property.bedrooms ? `${property.bedrooms} Bedrooms` : 'N/A' 
                        },
                        { 
                          icon: <BathIcon size={24} />, 
                          label: "Bathrooms", 
                          value: property.bathrooms ? `${property.bathrooms} Bathrooms` : 'N/A' 
                        },
                        { 
                          icon: <ParkingIcon size={24} />, 
                          label: "Parking", 
                          value: property.parking || 'N/A' 
                        },
                        { 
                          icon: <HomeIcon size={24} />, 
                          label: "Property Type", 
                          value: property.property_type || 'Residential' 
                        },
                      ].map((feature, index) => (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                            isDarkMode 
                              ? "bg-gray-800 hover:bg-gray-700" 
                              : "bg-gray-50 hover:bg-amber-50"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                            isDarkMode 
                              ? "bg-amber-900/30" 
                              : "bg-amber-50"
                          }`}>
                            <div className="text-amber-500">{feature.icon}</div>
                          </div>
                          <div>
                            <div className={`font-semibold transition-colors duration-500 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>{feature.value}</div>
                            <div className={`text-sm transition-colors duration-500 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}>{feature.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && property.features && property.features.length > 0 && (
                <div>
                  <h2 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>Features & Amenities</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {property.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-4 rounded-xl transition-colors duration-300 ${
                          isDarkMode 
                            ? "bg-gray-800 hover:bg-gray-700" 
                            : "bg-gray-50 hover:bg-amber-50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                          isDarkMode 
                            ? "bg-amber-900/30" 
                            : "bg-amber-100"
                        }`}>
                          <CheckIcon size={16} className="text-amber-500" />
                        </div>
                        <span className={`font-medium transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Tab */}
              {activeTab === 'location' && (
                <div>
                  <h2 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>Location & Neighborhood</h2>
                  <p className={`mb-6 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    This property is situated at {property.address}, {property.city}, {property.state} {property.zip_code} - one of the most desirable neighborhoods.
                  </p>
                  <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPinIcon size={32} className="mx-auto mb-2" />
                      <div className="text-lg font-semibold">{property.city}, {property.state}</div>
                      <div className="text-sm opacity-80">{property.address}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Tab */}
              {activeTab === 'schedule' && (
                <div>
                  <h2 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>Schedule a Private Tour</h2>
                  <div className={`rounded-2xl p-8 transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-gray-800 to-gray-700" 
                      : "bg-gradient-to-r from-amber-50 to-orange-50"
                  }`}>
                    <p className={`mb-6 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      Interested in this property? Contact our agent to schedule a private tour at your convenience.
                    </p>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                    >
                      Contact Agent Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Agent Card & Stats */}
          <div className="space-y-8">
            {/* Agent Card - Hide if no agent data */}
            {property.agent && (
              <div className={`rounded-2xl shadow-xl p-6 border sticky top-6 transition-all duration-500 ${
                isDarkMode 
                  ? "bg-gray-800 border-gray-700" 
                  : "bg-white border-gray-100"
              }`}>
                <h3 className={`text-xl font-bold mb-6 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Contact Agent</h3>
                
                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      {property.agent.avatar ? (
                        <img 
                          src={getImageUrl(property.agent.avatar)} 
                          alt={property.agent.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={() => handleImageError('agent')}
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">{property.agent.name[0]}</span>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                      <CheckIcon size={10} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>{property.agent.name}</h4>
                    <p className="text-amber-500 font-medium">{property.agent.position || 'Lead Property Agent'}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className={`text-sm ml-1 transition-colors duration-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>4.9 (42 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-colors duration-300 group ${
                      isDarkMode 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-gray-50 hover:bg-amber-50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                      isDarkMode 
                        ? "bg-gray-800" 
                        : "bg-white"
                    }`}>
                      <PhoneIcon size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>Call Agent</div>
                      <div className={`font-semibold transition-colors duration-300 group-hover:text-amber-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>{property.agent.phone}</div>
                    </div>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-colors duration-300 group ${
                      isDarkMode 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-gray-50 hover:bg-amber-50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                      isDarkMode 
                        ? "bg-gray-800" 
                        : "bg-white"
                    }`}>
                      <MailIcon size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>Email Agent</div>
                      <div className={`font-semibold transition-colors duration-300 group-hover:text-amber-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>{property.agent.email}</div>
                    </div>
                  </a>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                >
                  Schedule a Viewing
                  <ChevronRightIcon size={20} />
                </button>

                {/* Response Time */}
                <div className={`mt-6 pt-6 border-t text-center transition-all duration-500 ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                }`}>
                  <div className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>Average response time</div>
                  <div className="text-amber-500 font-bold text-lg">Under 1 hour</div>
                </div>
              </div>
            )}

            {/* Property Stats */}
            <div className={`rounded-2xl p-6 text-white transition-all duration-500 ${
              isDarkMode 
                ? "bg-gradient-to-r from-gray-800 to-gray-900" 
                : "bg-gradient-to-r from-gray-900 to-blue-900"
            }`}>
              <h3 className="text-lg font-bold mb-4">Property Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/80 text-sm">Views This Month</span>
                    <span className="font-semibold">{property.views?.toLocaleString() || 0}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/80 text-sm">Days on Market</span>
                    <span className="font-semibold">
                      {Math.floor((new Date().getTime() - new Date(property.created_at).getTime()) / (1000 * 3600 * 24))}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/80 text-sm">Price per sq ft</span>
                    <span className="font-semibold">
                      ${property.size ? Math.round(property.price / property.size).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className={`py-20 transition-all duration-500 ${
          isDarkMode 
            ? "bg-gradient-to-b from-gray-900 to-gray-800" 
            : "bg-gradient-to-b from-white to-gray-50"
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 transition-colors duration-500 ${
                isDarkMode ? "text-amber-400" : "text-amber-600"
              }`}>
                <span className={`w-8 h-0.5 transition-colors duration-500 ${
                  isDarkMode ? "bg-amber-400" : "bg-amber-400"
                }`} />
                SIMILAR PROPERTIES
              </span>
              <h2 className={`text-3xl lg:text-4xl font-bold mb-4 transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                You May Also <span className="text-amber-500">Like</span>
              </h2>
              <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Explore other properties in the same category that match your preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((property) => (
                <PropertyCard key={property.id} property={property} isDarkMode={isDarkMode} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                View All Properties
                <ChevronRightIcon size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}