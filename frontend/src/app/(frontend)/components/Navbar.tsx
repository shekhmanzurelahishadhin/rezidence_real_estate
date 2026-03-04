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
import { useClientAuth } from "@/app/contexts/ClientAuthContext";

// Simple icon components (if not available in your icons file)
const LogOutIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const DashboardIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const SettingsIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

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
  const { client, isAuthenticated, logout, hasRole, hasPermission } = useClientAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
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
    setUserMenuOpen(false);
  }, [pathname]);

  // Handle click outside for user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  const getUserInitials = () => {
    if (client?.name) {
      const names = client.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return client.name.substring(0, 2).toUpperCase();
    }
    return 'U';
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

            {/* Desktop Right Actions - Updated with Auth */}
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

              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        : "bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    }`}
                  >
                    <span className="text-white text-sm font-semibold">
                      {getUserInitials()}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border py-2 animate-fadeIn z-50 ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-100"
                      }`}
                    >
                      {/* User Info */}
                      <div className={`px-4 py-3 border-b ${
                        isDarkMode ? "border-gray-700" : "border-gray-100"
                      }`}>
                        <p className={`text-sm font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {client?.name}
                        </p>
                        <p className={`text-xs mt-1 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {client?.email}
                        </p>
                        {hasRole('buyer') && (
                          <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                            isDarkMode
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            Buyer
                          </span>
                        )}
                      </div>

                      {/* Dashboard Links based on permissions */}
                      <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                          isDarkMode
                            ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                            : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                        }`}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <DashboardIcon size={18} />
                        <span className="text-sm font-medium">Dashboard</span>
                      </Link>

                      {hasPermission('manage profile') && (
                        <Link
                          href="/profile"
                          className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                            isDarkMode
                              ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          }`}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <SettingsIcon size={18} />
                          <span className="text-sm font-medium">Profile Settings</span>
                        </Link>
                      )}

                      {hasPermission('save favorites') && (
                        <Link
                          href="/favorites"
                          className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                            isDarkMode
                              ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          }`}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <span className="text-sm font-medium">Saved Properties</span>
                        </Link>
                      )}

                      {hasPermission('schedule viewings') && (
                        <Link
                          href="/viewings"
                          className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                            isDarkMode
                              ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          }`}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <span className="text-sm font-medium">My Viewings</span>
                        </Link>
                      )}

                      {hasPermission('track offers') && (
                        <Link
                          href="/offers"
                          className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                            isDarkMode
                              ? "text-gray-300 hover:text-amber-400 hover:bg-amber-500/10"
                              : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                          }`}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <span className="text-sm font-medium">My Offers</span>
                        </Link>
                      )}

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200 border-t ${
                          isDarkMode
                            ? "border-gray-700 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            : "border-gray-100 text-red-600 hover:text-red-700 hover:bg-red-50"
                        }`}
                      >
                        <LogOutIcon size={18} />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                </>
              )}
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
          <div className="lg:hidden fixed inset-0 top-16 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Menu Container */}
            <div
              className={`absolute top-0 left-0 right-0 max-h-[calc(100vh-4rem)] border-t shadow-2xl animate-slideDown z-50 overflow-y-auto ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* User Info for Mobile - Show if authenticated */}
                {isAuthenticated && (
                  <div className={`mb-6 p-4 rounded-xl ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {getUserInitials()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {client?.name}
                        </p>
                        <p className={`text-sm truncate ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {client?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

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
                    const hasDropdown =
                      link.dropdown && link.dropdown.length > 0;

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
                                isActive ||
                                expandedMobileDropdowns[link.label]
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
                                  isDarkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Mobile Dropdown */}
                        {hasDropdown &&
                          expandedMobileDropdowns[link.label] && (
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

                {/* Mobile Auth Buttons - Updated */}
                <div
                  className={`mt-6 pt-6 border-t space-y-3 pb-6 ${
                    isDarkMode ? "border-gray-800" : "border-gray-100"
                  }`}
                >
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className={`block w-full border-2 font-semibold py-3.5 rounded-xl text-center transition-all duration-300 ${
                          isDarkMode
                            ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400"
                            : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                        }`}
                      >
                        Dashboard
                      </Link>
                      
                      {hasPermission('manage profile') && (
                        <Link
                          href="/profile"
                          onClick={() => setMobileOpen(false)}
                          className={`block w-full border-2 font-semibold py-3.5 rounded-xl text-center transition-all duration-300 ${
                            isDarkMode
                              ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400"
                              : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                          }`}
                        >
                          Profile Settings
                        </Link>
                      )}
                      
                      {hasPermission('save favorites') && (
                        <Link
                          href="/favorites"
                          onClick={() => setMobileOpen(false)}
                          className={`block w-full border-2 font-semibold py-3.5 rounded-xl text-center transition-all duration-300 ${
                            isDarkMode
                              ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400"
                              : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                          }`}
                        >
                          Saved Properties
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className={`block w-full border-2 font-semibold py-3.5 rounded-xl text-center transition-all duration-300 ${
                          isDarkMode
                            ? "border-red-900 text-red-400 hover:border-red-700 hover:text-red-300 hover:bg-red-500/10"
                            : "border-red-200 text-red-600 hover:border-red-400 hover:text-red-700 hover:bg-red-50"
                        }`}
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
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