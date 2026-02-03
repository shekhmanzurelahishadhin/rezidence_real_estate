"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MenuIcon,
  CloseIcon,
  PhoneIcon,
  MailIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  UserIcon
} from "@/assets/icons";

const navLinks = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Properties",
    href: "/properties",
    dropdown: [
      { label: "All Properties", href: "/properties" },
      { label: "Modern Homes", href: "/properties?category=modern" },
      { label: "Luxury Estates", href: "/properties?category=luxury" },
      { label: "Apartments", href: "/properties?category=apartments" },
      { label: "Villas", href: "/properties?category=villas" },
      { label: "Commercial", href: "/properties?category=commercial" },
    ]
  },
  {
    label: "Blog",
    href: "/blogs",
    dropdown: [
      { label: "All Articles", href: "/blogs" },
      { label: "Market Trends", href: "/blogs?category=trends" },
      { label: "Investment Tips", href: "/blogs?category=investment" },
      { label: "Home Buying", href: "/blogs?category=buying" },
      { label: "Interior Design", href: "/blogs?category=design" },
    ]
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Property Valuation", href: "/services/valuation" },
      { label: "Home Staging", href: "/services/staging" },
      { label: "Mortgage Assistance", href: "/services/mortgage" },
      { label: "Property Management", href: "/services/management" },
      { label: "Investment Consultation", href: "/services/consultation" },
    ]
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Contact",
    href: "/contact"
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setClickedDropdown(null);
  }, [pathname]);

  // Handle dropdown hover with timeout cleanup
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleNavItemEnter = (label: string) => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }

    if (navLinks.find(link => link.label === label)?.dropdown) {
      setActiveDropdown(label);
    }
  };

  const handleNavItemLeave = () => {
    // Only hide on mouse leave if not clicked open
    if (!clickedDropdown) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  const handleDropdownEnter = () => {
    // Clear timeout when entering dropdown
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleDropdownLeave = () => {
    // Close dropdown immediately when leaving it (only if not clicked open)
    if (!clickedDropdown) {
      setActiveDropdown(null);
    }
  };

  // Handle click on parent menu with dropdown
  const handleParentMenuClick = (label: string) => {
    const link = navLinks.find(link => link.label === label);

    if (link?.dropdown) {
      // Toggle dropdown on click
      if (clickedDropdown === label) {
        // Close if already open
        setClickedDropdown(null);
        setActiveDropdown(null);
      } else {
        // Open dropdown
        setClickedDropdown(label);
        setActiveDropdown(label);
      }
    } else {
      // Regular link without dropdown - handled by Link component
      setActiveDropdown(null);
      setClickedDropdown(null);
    }
  };

  // Close clicked dropdown when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isDropdownRelated = target.closest('.dropdown-container') ||
        target.closest('.dropdown-menu') ||
        target.closest('.nav-item');

      if (!isDropdownRelated && clickedDropdown) {
        setClickedDropdown(null);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [clickedDropdown]);

  // Mobile dropdown state
  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState<Record<string, boolean>>({});

  const toggleMobileDropdown = (label: string) => {
    setExpandedMobileDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-0"
            : "bg-white/90 backdrop-blur-lg py-2"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">H</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  Homely Homes
                </h1>
                <p className="text-gray-500 text-xs">Premium Real Estate</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                  (link.dropdown && link.dropdown.some(item => item.href === pathname));

                return (
                  <div
                    key={link.label}
                    className="relative nav-item dropdown-container"
                  >
                    <div
                      className="inline-block"
                      onMouseEnter={() => handleNavItemEnter(link.label)}
                      onMouseLeave={handleNavItemLeave}
                    >
                      {link.dropdown ? (
                        // Parent menu with dropdown - not a link, click toggles dropdown
                        <button
                          onClick={() => handleParentMenuClick(link.label)}
                          className={`flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${isActive || activeDropdown === link.label
                              ? "text-amber-600 bg-amber-50"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                            }`}
                        >
                          {link.label}
                          <ChevronDownIcon
                            size={16}
                            className={`transition-transform duration-300 ${activeDropdown === link.label ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      ) : (
                        // Regular link without dropdown
                        <Link
                          href={link.href}
                          className={`flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${isActive
                              ? "text-amber-600 bg-amber-50"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                            }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>

                    {/* Dropdown Menu */}
                    {link.dropdown && activeDropdown === link.label && (
                      <div
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fadeIn z-50 dropdown-menu"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 group"
                            onClick={() => {
                              setActiveDropdown(null);
                              setClickedDropdown(null);
                            }}
                          >
                            <span className="text-sm font-medium">{item.label}</span>
                            <ArrowRightIcon
                              size={14}
                              className="opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+12124567890"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                  <PhoneIcon size={16} className="text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500">Call us</div>
                  <div className="text-sm font-semibold">+1 (212) 456-7890</div>
                </div>
              </a>

              <Link
                href="/contact"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 group/cta shadow-lg hover:shadow-xl"
              >
                <span>Get Started</span>
                <ArrowRightIcon
                  size={18}
                  className="group-hover/cta:translate-x-1 transition-transform duration-300"
                />
              </Link>

              <Link
                href="/signin"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors duration-300"
              >
                <UserIcon size={20} className="text-gray-600" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-gray-700 p-2 hover:text-amber-600 transition-colors duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <CloseIcon size={28} />
              ) : (
                <div className="relative">
                  <MenuIcon size={28} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl animate-slideDown z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a
                  href="tel:+12124567890"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <PhoneIcon size={18} className="text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Call us</div>
                    <div className="text-sm font-semibold break-words sm:whitespace-nowrap">+1 (212) 456-7890</div>
                  </div>
                </a>
                <a
                  href="mailto:hello@homely.com"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <MailIcon size={18} className="text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Email us</div>
                    <div className="text-sm font-semibold break-words sm:whitespace-nowrap">hello@homely.com</div>
                  </div>
                </a>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const hasDropdown = link.dropdown && link.dropdown.length > 0;

                  return (
                    <div key={link.label} className="border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center justify-between">
                        {hasDropdown ? (
                          // Mobile: Parent menu with dropdown - button to toggle
                          <button
                            onClick={() => toggleMobileDropdown(link.label)}
                            className={`flex-1 py-3 text-base font-medium text-left transition-colors ${isActive || expandedMobileDropdowns[link.label]
                                ? "text-amber-600"
                                : "text-gray-700 hover:text-amber-600"
                              }`}
                          >
                            {link.label}
                          </button>
                        ) : (
                          // Mobile: Regular link without dropdown
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex-1 py-3 text-base font-medium transition-colors ${isActive
                                ? "text-amber-600"
                                : "text-gray-700 hover:text-amber-600"
                              }`}
                          >
                            {link.label}
                          </Link>
                        )}
                        {hasDropdown && (
                          <button
                            onClick={() => toggleMobileDropdown(link.label)}
                            className="p-2"
                          >
                            <ChevronDownIcon
                              size={20}
                              className={`transition-transform duration-300 ${expandedMobileDropdowns[link.label] ? "rotate-180" : ""
                                }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Mobile Dropdown */}
                      {hasDropdown && expandedMobileDropdowns[link.label] && (
                        <div className="ml-4 mb-2 space-y-1">
                          {link.dropdown!.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-sm text-gray-600 hover:text-amber-600 hover:pl-2 transition-all duration-300"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-xl text-center hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                  Schedule Consultation
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full border-2 border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl text-center hover:border-amber-400 hover:text-amber-600 transition-all duration-300"
                >
                  Client Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}