"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "@/data";
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
import { PROPERTY_IMAGES } from "./constants";

export function FeaturedProperty() {
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