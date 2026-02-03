"use client";

import Link from "next/link";
import { faqs } from "@/data";
import FAQAccordion from "../FAQAccordion";
import { ShieldCheckIcon, TrendingUpIcon } from "@/assets/icons";
import { IMAGES } from "./constants";

export function FAQSection() {
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