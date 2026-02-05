"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MailIcon,
  ChevronUpIcon,
  PhoneIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  HomeIcon,
  SunIcon,
  MoonIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Investor Relations", href: "/investors" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "Luxury Estates", href: "/properties?category=luxury" },
      { label: "Modern Apartments", href: "/properties?category=apartments" },
      { label: "Beachfront Villas", href: "/properties?category=beachfront" },
      { label: "Commercial Spaces", href: "/properties?category=commercial" },
      {
        label: "Investment Properties",
        href: "/properties?category=investment",
      },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Property Valuation", href: "/services/valuation" },
      { label: "Home Staging", href: "/services/staging" },
      { label: "Mortgage Assistance", href: "/services/mortgage" },
      { label: "Legal Support", href: "/services/legal" },
      { label: "Property Management", href: "/services/management" },
    ],
  },
];

export default function Footer() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
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

        {/* Back to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-bounceIn"
            aria-label="Scroll to top"
          >
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ChevronUpIcon
              size={20}
              color="white"
              className="group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
        )}
      </div>

      {/* Main Footer */}
      <footer
        className={`transition-all duration-500 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 pb-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
            {/* Brand Column */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <HomeIcon
                      size={20}
                      className="sm:w-6 sm:h-6"
                      color="white"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h2
                    className={`text-xl sm:text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    LuxeProperties
                  </h2>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Premium Real Estate Solutions
                  </p>
                </div>
              </div>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                We connect discerning clients with exceptional properties.
                Experience the pinnacle of luxury real estate with our curated
                collection and personalized service.
              </p>

              {/* Newsletter */}
              <div className="pt-2 sm:pt-4">
                <p
                  className={`font-semibold text-sm mb-2 sm:mb-3 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Stay Updated
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`flex-1 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 transition-all duration-300 placeholder-gray-500 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 focus:ring-amber-100"
                    }`}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 text-sm whitespace-nowrap shadow-md hover:shadow-lg"
                  >
                    Subscribe
                  </button>
                </form>
                {subscribed && (
                  <p
                    className={`mt-2 text-sm animate-fadeIn ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    Thank you for subscribing!
                  </p>
                )}
              </div>
            </div>

            {/* Link Columns */}
            {columns.map((col) => (
              <div key={col.title} className="mt-4 sm:mt-0">
                <h3
                  className={`font-bold text-base sm:text-lg mb-4 sm:mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {col.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`transition-all duration-300 group/link flex items-center gap-2 ${
                          isDarkMode
                            ? "text-gray-400 hover:text-amber-400"
                            : "text-gray-600 hover:text-amber-600"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 group-hover/link:bg-amber-500"
                              : "bg-gray-300 group-hover/link:bg-amber-500"
                          } group-hover/link:scale-125`}
                        />
                        <span className="text-sm sm:text-base">
                          {link.label}
                        </span>
                        <span
                          className={`opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 ${
                            isDarkMode ? "text-amber-400" : "text-amber-600"
                          }`}
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div
            className={`border-t pt-8 ${
              isDarkMode ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                © {new Date().getFullYear()} LuxeProperties. All rights
                reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  { icon: FacebookIcon, label: "Facebook" },
                  { icon: TwitterIcon, label: "Twitter" },
                  { icon: InstagramIcon, label: "Instagram" },
                  { icon: LinkedinIcon, label: "LinkedIn" },
                ].map((SocialIcon) => (
                  <a
                    key={SocialIcon.label}
                    href="#"
                    className={`transition-colors duration-300 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-amber-400"
                        : "text-gray-600 hover:text-amber-600"
                    }`}
                    aria-label={SocialIcon.label}
                  >
                    <SocialIcon.icon size={18} />
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-500 hover:text-amber-400"
                      : "text-gray-500 hover:text-amber-600"
                  }`}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-500 hover:text-amber-400"
                      : "text-gray-500 hover:text-amber-600"
                  }`}
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-500 hover:text-amber-400"
                      : "text-gray-500 hover:text-amber-600"
                  }`}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}