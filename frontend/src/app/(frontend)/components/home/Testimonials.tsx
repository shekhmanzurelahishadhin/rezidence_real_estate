"use client";

import { useState, useEffect, useCallback } from "react";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

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

export function Testimonials() {
  const { isDarkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
  const getVisibleTestimonials = useCallback(() => {
    if (isMobile) {
      // On mobile, show only current testimonial
      return [testimonials[currentIndex]];
    } else {
      // On desktop, show 3 testimonials
      const indices = [];
      for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + testimonials.length) % testimonials.length;
        indices.push(index);
      }
      return indices.map(idx => testimonials[idx]);
    }
  }, [currentIndex, isMobile]);

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className={`py-20 transition-all duration-500 overflow-hidden ${
      isDarkMode 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 ${
            isDarkMode ? "text-amber-400" : "text-amber-600"
          }`}>
            <span className={`w-8 h-0.5 ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`} />
            CLIENT TESTIMONIALS
          </span>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Trusted by <span className="text-amber-500">Thousands</span>
          </h2>
          <p className={`text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
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
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group hidden md:block ${
              isDarkMode 
                ? "bg-gray-800 hover:bg-gray-700" 
                : "bg-white hover:bg-gray-50"
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon size={24} className={`group-hover:text-amber-600 transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`} />
          </button>

          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 group hidden md:block ${
              isDarkMode 
                ? "bg-gray-800 hover:bg-gray-700" 
                : "bg-white hover:bg-gray-50"
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRightIcon size={24} className={`group-hover:text-amber-600 transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`} />
          </button>

          {/* Carousel Track */}
          <div className="relative">
            <div className="flex justify-center">
              {/* For mobile: Single card */}
              {isMobile ? (
                <div className="w-full max-w-lg">
                  <div
                    key={currentIndex}
                    className={`rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className={`absolute top-8 right-8 text-5xl ${
                      isDarkMode ? "text-amber-500/20" : "text-amber-100"
                    }`}>"</div>

                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <StarIcon key={i} size={20} className="fill-amber-400" />
                      ))}
                    </div>

                    <p className={`text-lg italic mb-8 relative z-10 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      "{testimonials[currentIndex].quote}"
                    </p>

                    <div className={`flex items-center gap-4 pt-6 border-t ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}>
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
                        <div className={`font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {testimonials[currentIndex].author}
                        </div>
                        <div className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* For desktop: Three cards with center focus */
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
                  {visibleTestimonials.map((testimonial, index) => {
                    const actualIndex = testimonials.findIndex(t => t.author === testimonial.author);
                    const isCenter = index === 1; // Middle card is the focused one

                    return (
                      <div
                        key={actualIndex}
                        className={`
                          rounded-2xl p-6 lg:p-8 shadow-xl transition-all duration-500
                          ${isCenter
                            ? 'scale-100 z-20 shadow-2xl'
                            : 'scale-95 lg:scale-90 opacity-80 blur-[1px] hover:blur-0 hover:opacity-100 hover:scale-95'
                          }
                          ${index === 0 ? 'rotate-[-1deg]' : index === 2 ? 'rotate-[1deg]' : ''}
                          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                          ${isCenter && (isDarkMode ? 'border border-amber-500/30' : 'border border-amber-100')}
                        `}
                        style={{
                          width: isCenter ? '380px' : '340px',
                          height: '380px',
                        }}
                      >
                        {/* Quote Icon */}
                        <div className={`absolute top-6 right-6 text-4xl ${
                          isDarkMode ? "text-amber-500/20" : "text-amber-100"
                        }`}>"</div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <StarIcon key={i} size={18} className="fill-amber-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className={`lg:text-lg italic mb-6 relative z-10 line-clamp-5 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          "{testimonial.quote}"
                        </p>

                        {/* Author */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className={`flex items-center gap-4 pt-6 border-t ${
                            isDarkMode ? "border-gray-700" : "border-gray-100"
                          }`}>
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
                              <div className={`font-bold text-sm lg:text-base ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}>
                                {testimonial.author}
                              </div>
                              <div className={`text-xs lg:text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}>
                                {testimonial.role}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Highlight for center card */}
                        {isCenter && (
                          <>
                            <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
                            <div className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-lg ${
                              isDarkMode 
                                ? "bg-amber-500 text-white" 
                                : "bg-amber-500 text-white"
                            }`}>
                              FEATURED
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <button
              onClick={prevSlide}
              className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group ${
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon size={20} className={`group-hover:text-amber-600 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`} />
            </button>
            <button
              onClick={nextSlide}
              className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group ${
                isDarkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-50"
              }`}
              aria-label="Next testimonial"
            >
              <ChevronRightIcon size={20} className={`group-hover:text-amber-600 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`} />
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
                    ? `w-8 ${isDarkMode ? 'bg-amber-500' : 'bg-amber-500'}`
                    : `${
                        isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`
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
              className={`flex items-center gap-2 text-sm hover:text-amber-600 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className={`w-8 h-4 rounded-full transition-colors duration-300 ${
                isAutoPlaying 
                  ? 'bg-amber-500' 
                  : isDarkMode 
                    ? 'bg-gray-700' 
                    : 'bg-gray-300'
              }`}>
                <div className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${
                  isAutoPlaying ? 'translate-x-4' : 'translate-x-0'
                } ${isDarkMode ? 'bg-gray-300' : 'bg-white'}`} />
              </div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Click to play'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}