"use client";

import { useEffect, useState } from "react";
import { properties } from "@/data";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  MapPinIcon,
  BedIcon,
  BathIcon,
  ParkingIcon,
} from "@/assets/icons";
import { IMAGES } from "./constants";
import { useTheme } from "@/app/ThemeProvider";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const hero = properties[0];

  return (
    <section
      className={`relative min-h-screen overflow-hidden transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950" 
          : "bg-gradient-to-br from-blue-50 via-gray-50 to-amber-50"
      }`}
      style={{
        backgroundImage: isDarkMode 
          ? `linear-gradient(to bottom right, rgba(17, 24, 39, 0.95), rgba(30, 58, 138, 0.85)), url(${IMAGES.heroBg})`
          : `linear-gradient(to bottom right, rgba(219, 234, 254, 0.9), rgba(254, 243, 199, 0.8)), url(${IMAGES.heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Background Elements */}
      <div className={`absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${
        isDarkMode ? "bg-blue-500/10" : "bg-blue-500/5"
      }`} />
      <div className={`absolute bottom-1/4 right-20 w-96 h-96 rounded-full blur-3xl ${
        isDarkMode ? "bg-amber-500/5" : "bg-amber-500/10"
      }`} />

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
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border backdrop-blur-sm ${
              isDarkMode 
                ? "bg-white/10 border-white/20" 
                : "bg-white/80 border-gray-200 shadow-lg"
            }`}>
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-600 dark:text-amber-400 text-sm font-medium tracking-wide">
                PREMIUM LISTING
              </span>
            </div>

            <h1 className={`text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Discover Your{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Dream Home
              </span>
            </h1>

            <p className={`text-lg leading-relaxed max-w-xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Experience luxury living with our curated collection of premium properties.
              From modern apartments to exclusive villas, find your perfect space.
            </p>

            {/* Search Bar */}
            <div className={`rounded-2xl p-1 border backdrop-blur-lg max-w-xl mb-8 ${
              isDarkMode 
                ? "bg-white/10 border-white/20" 
                : "bg-white/90 border-gray-200 shadow-lg"
            }`}>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <MapPinIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`} size={20} />
                    <input
                      type="text"
                      placeholder="Search by location, property type..."
                      className={`w-full bg-transparent border-none placeholder-gray-400 pl-12 pr-4 py-3 focus:outline-none ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  </div>
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
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
                  <div className={`text-3xl font-bold mb-1 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {stat.label}
                  </div>
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
                <div className={`absolute inset-0 ${
                  isDarkMode 
                    ? "bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" 
                    : "bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"
                }`} />

                {/* Property Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-1">{hero.title}</h3>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPinIcon size={16} color="#D1D5DB" />
                        <span className="text-sm">{hero.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-amber-400">${hero.price.toLocaleString()}</div>
                      <div className="text-gray-300 text-sm">For sale</div>
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
              <button className={`absolute top-6 right-6 p-3 rounded-full shadow-lg transition-colors duration-300 group-hover:scale-110 ${
                isDarkMode 
                  ? "bg-white text-gray-900 hover:bg-gray-100" 
                  : "bg-white text-gray-900 hover:bg-gray-50"
              }`}>
                <ArrowUpRightIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${
          isDarkMode ? "border-white/30" : "border-gray-400/50"
        }`}>
          <div className="w-1 h-3 bg-amber-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}