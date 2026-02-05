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
  UserIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

const navLinks = [
  {
    label: "Home",
    href: "/",
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
    ],
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
    ],
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
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const { isDarkMode } = useTheme();
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
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }

    if (navLinks.find((link) => link.label === label)?.dropdown) {
      setActiveDropdown(label);
    }
  };

  const handleNavItemLeave = () => {
    if (!clickedDropdown) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleDropdownLeave = () => {
    if (!clickedDropdown) {
      setActiveDropdown(null);
    }
  };

  const handleParentMenuClick = (label: string) => {
    const link = navLinks.find((link) => link.label === label);

    if (link?.dropdown) {
      if (clickedDropdown === label) {
        setClickedDropdown(null);
        setActiveDropdown(null);
      } else {
        setClickedDropdown(label);
        setActiveDropdown(label);
      }
    } else {
      setActiveDropdown(null);
      setClickedDropdown(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isDropdownRelated =
        target.closest(".dropdown-container") ||
        target.closest(".dropdown-menu") ||
        target.closest(".nav-item");

      if (!isDropdownRelated && clickedDropdown) {
        setClickedDropdown(null);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [clickedDropdown]);

  const [expandedMobileDropdowns, setExpandedMobileDropdowns] = useState<
    Record<string, boolean>
  >({});

  const toggleMobileDropdown = (label: string) => {
    setExpandedMobileDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? "bg-gray-900/95 backdrop-blur-xl shadow-lg py-0"
              : "bg-white/95 backdrop-blur-xl shadow-lg py-0"
            : isDarkMode
            ? "bg-gray-900/90 backdrop-blur-lg py-2"
            : "bg-white/90 backdrop-blur-lg py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">H</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode
                      ? "text-white group-hover:text-amber-400"
                      : "text-gray-900 group-hover:text-amber-600"
                  }`}
                >
                  Homely Homes
                </h1>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Premium Real Estate
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.dropdown &&
                    link.dropdown.some((item) => item.href === pathname));

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
                        <button
                          onClick={() => handleParentMenuClick(link.label)}
                          className={`flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                            isActive || activeDropdown === link.label
                              ? isDarkMode
                                ? "text-amber-400 bg-amber-500/10"
                                : "text-amber-600 bg-amber-50"
                              : isDarkMode
                              ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          }`}
                        >
                          {link.label}
                          <ChevronDownIcon
                            size={16}
                            className={`transition-transform duration-300 ${
                              activeDropdown === link.label ? "rotate-180" : ""
                            } ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className={`flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                            isActive
                              ? isDarkMode
                                ? "text-amber-400 bg-amber-500/10"
                                : "text-amber-600 bg-amber-50"
                              : isDarkMode
                              ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
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
                        className={`absolute top-full left-0 mt-1 w-64 rounded-xl shadow-2xl border py-2 animate-fadeIn z-50 dropdown-menu ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-100"
                        }`}
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 transition-colors duration-200 group ${
                              isDarkMode
                                ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                                : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                            }`}
                            onClick={() => {
                              setActiveDropdown(null);
                              setClickedDropdown(null);
                            }}
                          >
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                  isDarkMode
                    ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                    : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-amber-500/20 group-hover:bg-amber-500/30"
                      : "bg-amber-100 group-hover:bg-amber-200"
                  }`}
                >
                  <PhoneIcon
                    size={16}
                    className={isDarkMode ? "text-amber-400" : "text-amber-600"}
                  />
                </div>
                <div className="text-left">
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    Call us
                  </div>
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
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-amber-500/20 hover:text-amber-400"
                    : "bg-gray-100 hover:bg-amber-100 hover:text-amber-600"
                }`}
              >
                <UserIcon
                  size={20}
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isDarkMode
                  ? "text-gray-300 hover:text-amber-400"
                  : "text-gray-700 hover:text-amber-600"
              }`}
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
          <div
            className={`lg:hidden absolute top-full left-0 right-0 border-t shadow-2xl animate-slideDown z-50 ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-100"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a
                  href="tel:+12124567890"
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-amber-500/10"
                      : "bg-gray-50 hover:bg-amber-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? "bg-amber-500/20" : "bg-amber-100"
                    }`}
                  >
                    <PhoneIcon
                      size={18}
                      className={
                        isDarkMode ? "text-amber-400" : "text-amber-600"
                      }
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Call us
                    </div>
                    <div
                      className={`text-sm font-semibold break-words sm:whitespace-nowrap ${
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      +1 (212) 456-7890
                    </div>
                  </div>
                </a>
                <a
                  href="mailto:hello@homely.com"
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-amber-500/10"
                      : "bg-gray-50 hover:bg-amber-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? "bg-amber-500/20" : "bg-amber-100"
                    }`}
                  >
                    <MailIcon
                      size={18}
                      className={
                        isDarkMode ? "text-amber-400" : "text-amber-600"
                      }
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Email us
                    </div>
                    <div
                      className={`text-sm font-semibold break-words sm:whitespace-nowrap ${
                        isDarkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
                      hello@homely.com
                    </div>
                  </div>
                </a>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const hasDropdown = link.dropdown && link.dropdown.length > 0;

                  return (
                    <div
                      key={link.label}
                      className={`border-b last:border-b-0 ${
                        isDarkMode ? "border-gray-800" : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {hasDropdown ? (
                          <button
                            onClick={() => toggleMobileDropdown(link.label)}
                            className={`flex-1 py-3 text-base font-medium text-left transition-colors ${
                              isActive || expandedMobileDropdowns[link.label]
                                ? isDarkMode
                                  ? "text-amber-400"
                                  : "text-amber-600"
                                : isDarkMode
                                ? "text-gray-300 hover:text-amber-400"
                                : "text-gray-700 hover:text-amber-600"
                            }`}
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex-1 py-3 text-base font-medium transition-colors ${
                              isActive
                                ? isDarkMode
                                  ? "text-amber-400"
                                  : "text-amber-600"
                                : isDarkMode
                                ? "text-gray-300 hover:text-amber-400"
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
                              className={`transition-transform duration-300 ${
                                expandedMobileDropdowns[link.label]
                                  ? "rotate-180"
                                  : ""
                              } ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
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
                              className={`block py-2.5 text-sm hover:pl-2 transition-all duration-300 ${
                                isDarkMode
                                  ? "text-gray-400 hover:text-amber-400"
                                  : "text-gray-600 hover:text-amber-600"
                              }`}
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
              <div
                className={`mt-6 pt-6 border-t space-y-3 ${
                  isDarkMode ? "border-gray-800" : "border-gray-100"
                }`}
              >
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
                  className={`block w-full border-2 font-semibold py-3.5 rounded-xl text-center transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400"
                      : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                  }`}
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