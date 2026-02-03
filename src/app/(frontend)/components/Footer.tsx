"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MailIcon, 
  ChevronUpIcon, 
  PhoneIcon, 
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  HomeIcon
} from "@/assets/icons";

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
      { label: "Investment Properties", href: "/properties?category=investment" },
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
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-8 z-50 transition-all duration-500 ${
          showScrollTop 
            ? "bottom-8 opacity-100 visible" 
            : "-bottom-4 opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
          
          {/* Main button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
            <div className="absolute inset-2 rounded-full border border-white/20" />
            <ChevronUpIcon 
              size={22} 
              color="white" 
              className="transform group-hover:-translate-y-1 transition-transform duration-300"
            />
          </div>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 animate-ping opacity-20" />
        </div>
      </button>

      {/* Main Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 pt-20 pb-12">
        {/* Background elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <HomeIcon size={24} color="white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    LuxeProperties
                  </h2>
                  <p className="text-gray-500 text-sm">Premium Real Estate Solutions</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                We connect discerning clients with exceptional properties. Experience the pinnacle of luxury real estate with our curated collection and personalized service.
              </p>

              {/* Newsletter */}
              <div className="pt-4">
                <p className="text-gray-900 font-semibold text-sm mb-3">Stay Updated</p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-4 py-2.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-sm"
                  >
                    Subscribe
                  </button>
                </form>
                {subscribed && (
                  <p className="mt-2 text-sm text-green-600">Thank you for subscribing!</p>
                )}
              </div>
            </div>

            {/* Link Columns */}
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-gray-900 font-bold text-lg mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-amber-600 transition-all duration-300 group/link flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-amber-400 group-hover/link:scale-125 transition-all duration-300" />
                        {link.label}
                        <span className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-600 text-sm">
                © {new Date().getFullYear()} LuxeProperties. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-6">
                {[
                  { icon: <FacebookIcon size={20} />, label: "Facebook" },
                  { icon: <TwitterIcon size={20} />, label: "Twitter" },
                  { icon: <InstagramIcon size={20} />, label: "Instagram" },
                  { icon: <LinkedinIcon size={20} />, label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="text-gray-400 hover:text-amber-600 transition-all duration-300 group/social"
                    aria-label={social.label}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/20 rounded-full blur group-hover/social:blur-md transition-all duration-300" />
                      <div className="relative bg-white p-2 rounded-lg border border-gray-200 group-hover/social:border-amber-200 group-hover/social:scale-110 transition-all duration-300">
                        {social.icon}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-gray-500 hover:text-amber-600 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-amber-600 transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-500 hover:text-amber-600 transition-colors duration-300">
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