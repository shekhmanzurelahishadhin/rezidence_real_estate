"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/assets/icons";
import { IMAGES } from "./constants";

export function CTA() {
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