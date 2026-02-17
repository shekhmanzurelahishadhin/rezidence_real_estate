"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  SearchIcon,
  MapPinIcon,
  BuildingIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
  AlertCircleIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

export default function NotFoundPage() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Auto-redirect countdown
    // const timer = setInterval(() => {
    //   setCountdown((prev) => {
    //     if (prev <= 1) {
    //       router.push("/");
    //       return 0;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);

    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove);
    //   clearInterval(timer);
    // };
  }, [router]);

  const popularLinks = [
    { label: "Browse Properties", href: "/properties", icon: BuildingIcon },
    { label: "Search Homes", href: "/search", icon: SearchIcon },
    { label: "Explore Locations", href: "/locations", icon: MapPinIcon },
    { label: "Contact Support", href: "/contact", icon: AlertCircleIcon },
  ];

  return (
    <div className={`min-h-screen overflow-hidden transition-all duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      {/* Floating Buttons */}
      <div className="floating-buttons-container">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
              : "linear-gradient(135deg, #e8a838, #f97316)",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {isDarkMode ? (
            <SunIcon
              size={20}
              color="white"
              className="group-hover:rotate-180 transition-transform duration-500"
            />
          ) : (
            <MoonIcon
              size={20}
              color="white"
              className="group-hover:rotate-180 transition-transform duration-500"
            />
          )}
        </button>
      </div>

      {/* Simple Header */}
      <nav className={`transition-all duration-500 ${
        isDarkMode 
          ? "border-b border-gray-800" 
          : "border-b border-gray-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode 
                    ? "text-white group-hover:text-amber-400" 
                    : "text-gray-900 group-hover:text-amber-600"
                }`}>
                  Homely Homes
                </h1>
                <p className={`text-xs transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  Premium Real Estate
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-amber-400" 
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-24">
        <div className="text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className={`text-[180px] sm:text-[240px] font-bold leading-none tracking-tighter ${
              isDarkMode ? "text-gray-800" : "text-gray-100"
            }`}>
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  isDarkMode 
                    ? "bg-gradient-to-br from-amber-900/50 to-orange-900/50 border border-amber-800/30" 
                    : "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
                }`}>
                  <AlertCircleIcon 
                    size={60} 
                    className={isDarkMode ? "text-amber-400" : "text-amber-500"}
                  />
                </div>
                <h1 className={`text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Page Not Found
                </h1>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="max-w-xl mx-auto mb-10">
            <p className={`text-lg mb-8 transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              The page you're looking for seems to have wandered off. It might have been moved, deleted, or never existed in the first place.
            </p>
            
            {/* Auto-redirect Notice */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-500 ${
              isDarkMode 
                ? "bg-amber-900/30 text-amber-300" 
                : "bg-amber-50 text-amber-700"
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              Redirecting to homepage in {countdown} seconds...
            </div>
          </div>

          {/* Quick Links */}
          <div className={`max-w-3xl mx-auto mb-12 p-6 rounded-2xl transition-all duration-500 ${
            isDarkMode 
              ? "bg-gray-800/50 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}>
            <h3 className={`text-lg font-semibold mb-4 transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Quick Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`group flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-amber-500/30"
                        : "bg-gray-50 border-gray-200 hover:bg-amber-50 hover:border-amber-300"
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-600 group-hover:bg-amber-500/20"
                        : "bg-white group-hover:bg-amber-100"
                    }`}>
                      <Icon
                        size={20}
                        className={
                          isDarkMode
                            ? "text-gray-400 group-hover:text-amber-400"
                            : "text-gray-600 group-hover:text-amber-600"
                        }
                      />
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? "text-gray-300 group-hover:text-amber-400"
                        : "text-gray-700 group-hover:text-amber-600"
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => router.back()}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
                  : "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ← Go Back
            </button>
            
            <Link
              href="/"
              className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HomeIcon size={20} />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}