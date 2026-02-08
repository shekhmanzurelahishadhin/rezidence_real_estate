"use client";

import Link from "next/link";
import { faqs } from "@/data";
import FAQAccordion from "../FAQAccordion";
import { ShieldCheckIcon, TrendingUpIcon } from "@/assets/icons";
import { IMAGES } from "./constants";
import { useTheme } from "@/app/ThemeProvider";

export function FAQSection() {
  const { isDarkMode } = useTheme();

  return (
    <section className={`py-20 transition-all duration-500 ${
      isDarkMode 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
              style={{
                backgroundImage: `url(${IMAGES.cityView})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={`absolute inset-0 transition-all duration-500 ${
                isDarkMode 
                  ? "bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" 
                  : "bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"
              }`} />
              
              {/* Dark mode overlay */}
              {isDarkMode && (
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
              )}

              {/* Floating Card 1 */}
              <div className="absolute top-8 left-8 transition-all duration-500 group-hover:scale-105">
                <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-xs border transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gray-800/90 border-gray-700 text-white" 
                    : "bg-white/95 border-white text-gray-900"
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <ShieldCheckIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className={`font-bold transition-colors duration-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Secure Process
                      </div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}>
                        End-to-end encryption
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-8 right-8 transition-all duration-500 group-hover:scale-105">
                <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-xs border transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gray-800/90 border-gray-700 text-white" 
                    : "bg-white/95 border-white text-gray-900"
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <TrendingUpIcon size={24} className="text-white" />
                    </div>
                    <div>
                      <div className={`font-bold transition-colors duration-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Market Insights
                      </div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}>
                        Real-time analytics
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - FAQ */}
          <div>
            <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 transition-colors duration-500 ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}>
              <span className={`w-8 h-0.5 transition-colors duration-500 ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              FAQ
            </span>
            
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Frequently Asked <span className="text-amber-500">Questions</span>
            </h2>
            
            <p className={`text-lg mb-10 max-w-lg transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Everything you need to know about buying, selling, or investing in real estate.
            </p>

            <div className="space-y-4">
              <FAQAccordion faqs={faqs} isDarkMode={isDarkMode} />
            </div>

            <div className={`mt-12 rounded-2xl p-8 border shadow-sm transition-all duration-500 ${
              isDarkMode 
                ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600" 
                : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100"
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                  <span className="text-white text-2xl font-bold">?</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className={`font-bold text-lg transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Still have questions?
                  </h3>
                  <p className={`text-sm mt-1 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Contact our support team for personalized assistance.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className={`bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap ${
                    isDarkMode 
                      ? "hover:from-amber-600 hover:to-orange-600" 
                      : "hover:from-amber-600 hover:to-orange-600"
                  }`}
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