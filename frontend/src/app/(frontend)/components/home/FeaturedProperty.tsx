// app/components/home/FeaturedProperty.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  ParkingIcon,
  BarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import {
  frontendPropertyService,
  Property,
} from "@/app/(frontend)/services/propertyService";

export function FeaturedProperty() {
  const { isDarkMode } = useTheme();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    console.log("Component mounted, fetching featured properties...");
    fetchFeaturedProperties();
  }, []);

  useEffect(() => {
    console.log("featuredProperties changed:", featuredProperties);
    if (featuredProperties.length > 0) {
      console.log("Current property index:", currentPropertyIndex);
      console.log(
        "Current property:",
        featuredProperties[currentPropertyIndex],
      );
      const images = getPropertyImages(
        featuredProperties[currentPropertyIndex],
      );
      console.log("Property images:", images);
      setPropertyImages(images);
      setCurrentImageIndex(0);
    }
  }, [currentPropertyIndex, featuredProperties]);

  useEffect(() => {
    console.log("imageErrors changed:", imageErrors);
    if (featuredProperties.length > 0) {
      const images = getPropertyImages(
        featuredProperties[currentPropertyIndex],
      );
      setPropertyImages(images);
    }
  }, [imageErrors]);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      console.log("Fetching featured properties...");
      const properties = await frontendPropertyService.getFeaturedProperties(5);
      console.log("Fetched featured properties:", properties);
      console.log("Number of properties:", properties.length);
      setFeaturedProperties(properties);
      setCurrentPropertyIndex(0);
    } catch (err) {
      console.error("Error fetching featured properties:", err);
      setError("Failed to load featured properties");
    } finally {
      setLoading(false);
    }
  };

  // Property navigation
  const nextProperty = () => {
    console.log("nextProperty clicked");
    console.log("Current index before:", currentPropertyIndex);
    console.log("Total properties:", featuredProperties.length);

    if (featuredProperties.length <= 1) {
      console.log("Not enough properties to slide");
      return;
    }

    setCurrentPropertyIndex((prev) => {
      const next = (prev + 1) % featuredProperties.length;
      console.log("Setting new index to:", next);
      return next;
    });
  };

  const prevProperty = () => {
    console.log("prevProperty clicked");
    console.log("Current index before:", currentPropertyIndex);
    console.log("Total properties:", featuredProperties.length);

    if (featuredProperties.length <= 1) {
      console.log("Not enough properties to slide");
      return;
    }

    setCurrentPropertyIndex((prev) => {
      const prevIndex =
        (prev - 1 + featuredProperties.length) % featuredProperties.length;
      console.log("Setting new index to:", prevIndex);
      return prevIndex;
    });
  };

  const goToProperty = (index: number) => {
    if (index >= 0 && index < featuredProperties.length) {
      setCurrentPropertyIndex(index);
    }
  };

  // Image navigation for current property
  const nextImage = () => {
    if (propertyImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    if (propertyImages.length <= 1) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length,
    );
  };

  const goToImage = (index: number) => {
    if (index >= 0 && index < propertyImages.length) {
      setCurrentImageIndex(index);
    }
  };

  const handleImageError = (imageKey: string) => {
    console.log("Image error for:", imageKey);
    setImageErrors((prev) => ({ ...prev, [imageKey]: true }));
  };

  const currentProperty = featuredProperties[currentPropertyIndex];

  // Get property images with full URLs
  const getPropertyImages = (property: Property): string[] => {
    if (!property) return [];

    const images = [];

    // Add featured image if exists and no error
    if (property.featured_image && !imageErrors[`featured-${property.id}`]) {
      const imageUrl = property.featured_image.startsWith("http")
        ? property.featured_image
        : `${baseUrl}/storage/${property.featured_image.replace(/^\/?storage\//, "")}`;
      images.push(imageUrl);
    }

    // Add additional images if they exist and no errors
    if (property.images && property.images.length > 0) {
      property.images.forEach((imagePath, index) => {
        const imageKey = `${property.id}-${index}`;
        if (!imageErrors[imageKey]) {
          const imageUrl = imagePath.startsWith("http")
            ? imagePath
            : `${baseUrl}/storage/${imagePath.replace(/^\/?storage\//, "")}`;
          images.push(imageUrl);
        }
      });
    }

    // If no images or all images failed, use a reliable fallback
    if (images.length === 0) {
      return [
        `https://placehold.co/1200x800/3b82f6/white?text=${encodeURIComponent(property.title || "Property")}`,
        `https://placehold.co/1200x800/10b981/white?text=Property+Image+2`,
        `https://placehold.co/1200x800/f59e0b/white?text=Property+Image+3`,
        `https://placehold.co/1200x800/ef4444/white?text=Property+Image+4`,
      ];
    }

    return images;
  };

  // Format price
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return numPrice.toLocaleString();
  };

  if (loading) {
    return (
      <section
        className={`py-20 transition-all duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-gray-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div
              className={`h-8 w-64 mb-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
            />
            <div
              className={`h-4 w-96 mb-8 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div
                className={`h-96 rounded-2xl ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
              />
              <div className="space-y-4">
                <div
                  className={`h-8 w-3/4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                />
                <div
                  className={`h-4 w-full rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                />
                <div
                  className={`h-4 w-2/3 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredProperties.length === 0 || !currentProperty) {
    return (
      <section
        className={`py-20 transition-all duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-gray-50 to-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`p-12 rounded-2xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              No Featured Properties
            </h3>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {error || "Check back later for our featured properties."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-20 transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-gray-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Pattern */}
          <div
            className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl ${
              isDarkMode
                ? "bg-gradient-to-br from-amber-500/10 to-blue-500/10"
                : "bg-gradient-to-br from-amber-100/30 to-blue-100/30"
            }`}
          />

          {/* Header with Property Navigation - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
            <div className="text-center sm:text-left">
              <div
                className={`inline-flex items-center gap-3 rounded-full px-4 py-2 mb-4 mx-auto sm:mx-0 ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white shadow-sm"
                }`}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span
                  className={`text-sm font-semibold ${
                    isDarkMode ? "text-amber-400" : "text-amber-600"
                  }`}
                >
                  FEATURED PROPERTIES
                </span>
              </div>
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Premium <span className="text-amber-500">Selections</span>
              </h2>
            </div>

            {/* Property Counter with Navigation - Responsive */}
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <div
                className={`text-base sm:text-lg font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span className="hidden xs:inline">Property </span>
                {currentPropertyIndex + 1} / {featuredProperties.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevProperty}
                  className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative z-40 cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  } ${featuredProperties.length <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={{ pointerEvents: "auto" }}
                  aria-label="Previous property"
                  disabled={featuredProperties.length <= 1}
                >
                  <ChevronLeftIcon size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextProperty}
                  className={`p-2 sm:p-3 rounded-full transition-all duration-300 relative z-40 cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  } ${featuredProperties.length <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  style={{ pointerEvents: "auto" }}
                  aria-label="Next property"
                  disabled={featuredProperties.length <= 1}
                >
                  <ChevronRightIcon size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Property Showcase */}
            <div className="space-y-6">
              <h3
                className={`text-3xl lg:text-4xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {currentProperty.title}
              </h3>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPinIcon
                    size={20}
                    className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                  />
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    {currentProperty.address}, {currentProperty.city},{" "}
                    {currentProperty.state}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full ${
                    currentProperty.status === "published"
                      ? isDarkMode
                        ? "bg-green-900/30"
                        : "bg-green-100"
                      : isDarkMode
                        ? "bg-yellow-900/30"
                        : "bg-yellow-100"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      currentProperty.status === "published"
                        ? isDarkMode
                          ? "text-green-400"
                          : "text-green-700"
                        : isDarkMode
                          ? "text-yellow-400"
                          : "text-yellow-700"
                    }`}
                  >
                    {currentProperty.status === "published"
                      ? "AVAILABLE"
                      : currentProperty.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {currentProperty.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <BedIcon size={24} className="text-amber-500" />,
                    label: "Bedrooms",
                    value: `${currentProperty.bedrooms || 0} Bedrooms`,
                  },
                  {
                    icon: <BathIcon size={24} className="text-amber-500" />,
                    label: "Bathrooms",
                    value: `${currentProperty.bathrooms || 0} Bathrooms`,
                  },
                  {
                    icon: <ParkingIcon size={24} className="text-amber-500" />,
                    label: "Parking",
                    value: currentProperty.parking || "No Parking",
                  },
                  {
                    icon: <BarIcon size={24} className="text-amber-500" />,
                    label: "Size",
                    value: currentProperty.size
                      ? `${currentProperty.size.toLocaleString()} sqft`
                      : "N/A",
                  },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-4 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 border border-gray-700 hover:border-amber-500/30"
                        : "bg-white border border-gray-100 hover:border-amber-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isDarkMode ? "bg-amber-500/10" : "bg-amber-50"
                        }`}
                      >
                        {feat.icon}
                      </div>
                      <div>
                        <div
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {feat.label}
                        </div>
                        <div
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {feat.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features List */}
              {currentProperty.features &&
                currentProperty.features.length > 0 && (
                  <div className="pt-4">
                    <h4
                      className={`text-sm font-semibold mb-3 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Key Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProperty.features
                        .slice(0, 4)
                        .map((feature, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full ${
                              isDarkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      {currentProperty.features.length > 4 && (
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          +{currentProperty.features.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="/contact"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 text-center shadow-lg hover:shadow-xl"
                >
                  Schedule a Tour
                  <ArrowRightIcon size={20} />
                </Link>
                <Link
                  href={`/properties/${currentProperty.slug}`}
                  className={`flex-1 border-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-center ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400"
                      : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Right - Image Carousel */}
            <div className="relative">
              {/* Main Carousel Image */}
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-700">
                {propertyImages.length > 0 ? (
                  <>
                    <div
                      className="w-full h-full transition-all duration-500 ease-in-out bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${propertyImages[currentImageIndex]})`,
                      }}
                      onError={() =>
                        handleImageError(
                          `featured-${currentProperty.id}-${currentImageIndex}`,
                        )
                      }
                    >
                      <div
                        className={`absolute inset-0 ${
                          isDarkMode
                            ? "bg-gradient-to-t from-gray-900/50 to-transparent"
                            : "bg-gradient-to-t from-gray-900/40 to-transparent"
                        }`}
                      />
                    </div>

                    {/* Image Navigation Arrows */}
                    {propertyImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                            isDarkMode
                              ? "bg-gray-800/80 hover:bg-gray-800 text-gray-300"
                              : "bg-white/80 hover:bg-white text-gray-800"
                          }`}
                          aria-label="Previous image"
                        >
                          <ChevronLeftIcon size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 z-10 ${
                            isDarkMode
                              ? "bg-gray-800/80 hover:bg-gray-800 text-gray-300"
                              : "bg-white/80 hover:bg-white text-gray-800"
                          }`}
                          aria-label="Next image"
                        >
                          <ChevronRightIcon size={24} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}

                {/* Price Tag */}
                <div className="absolute top-6 left-6 z-10">
                  <div
                    className={`rounded-2xl p-4 shadow-xl backdrop-blur-sm ${
                      isDarkMode ? "bg-gray-800/95" : "bg-white/95"
                    }`}
                  >
                    <div
                      className={`text-3xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ${formatPrice(currentProperty.price)}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        isDarkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      Premium Listing
                    </div>
                  </div>
                </div>

                {/* Image Dots Indicator */}
                {propertyImages.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {propertyImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? `w-8 ${isDarkMode ? "bg-amber-500" : "bg-amber-500"}`
                            : `w-3 ${isDarkMode ? "bg-white/40 hover:bg-white/60" : "bg-white/60 hover:bg-white"}`
                        }`}
                        style={{ height: "0.75rem" }}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {propertyImages.length > 1 && (
                <div className="flex gap-4 mt-6">
                  {propertyImages.slice(0, 3).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-1 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                        index === currentImageIndex
                          ? `ring-2 ${isDarkMode ? "ring-amber-500" : "ring-amber-500"} ring-offset-2`
                          : "hover:opacity-80"
                      }`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                        onError={() =>
                          handleImageError(
                            `${currentProperty.id}-thumb-${index}`,
                          )
                        }
                      />
                    </button>
                  ))}
                  {propertyImages.length > 3 && (
                    <button
                      onClick={() => goToImage(3)}
                      className="flex-1 h-24 rounded-xl overflow-hidden relative group"
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${propertyImages[3]})`,
                        }}
                        onError={() =>
                          handleImageError(`${currentProperty.id}-thumb-3`)
                        }
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300">
                        <span className="text-white text-sm font-semibold">
                          +{propertyImages.length - 3}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
