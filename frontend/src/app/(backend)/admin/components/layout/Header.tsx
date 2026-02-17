// app/(backend)/admin/components/layout/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/ThemeProvider";
import {
  BellIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  UserIcon,
  CalendarIcon,
  FilterIcon,
  SettingsIcon,
  LogOutIcon,
} from "@/assets/icons";

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function AdminHeader({ onMenuClick, sidebarOpen }: HeaderProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: "New property listed", time: "5 min ago", unread: true },
    { id: 2, title: "User registration", time: "1 hour ago", unread: true },
    { id: 3, title: "Blog published", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-all duration-500 ${
        isDarkMode
          ? "bg-gray-800/95 backdrop-blur-sm border-gray-700"
          : "bg-white/95 backdrop-blur-sm border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
          >
            <div className="space-y-1.5">
              <div
                className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isDarkMode ? "bg-gray-400" : "bg-gray-600"
                } ${sidebarOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <div
                className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isDarkMode ? "bg-gray-400" : "bg-gray-600"
                } ${sidebarOpen ? "opacity-0" : ""}`}
              />
              <div
                className={`w-6 h-0.5 rounded-full transition-all duration-300 ${
                  isDarkMode ? "bg-gray-400" : "bg-gray-600"
                } ${sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                size={18}
                className={isDarkMode ? "text-gray-500" : "text-gray-400"}
              />
            </div>
            <input
              type="search"
              placeholder="Search dashboard..."
              className={`pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 w-64 lg:w-80 ${
                isDarkMode
                  ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
              }`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 relative group ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <SunIcon size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <MoonIcon size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            )}
          </button>

          {/* Date Display */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg">
            <CalendarIcon
              size={18}
              className={isDarkMode ? "text-gray-400" : "text-gray-500"}
            />
            <span className={`text-sm font-medium transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 relative"
            >
              <BellIcon
                size={20}
                className={isDarkMode ? "text-gray-400" : "text-gray-500"}
              />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg border py-2 z-50 transition-all duration-500 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="px-4 py-3 border-b">
                    <h3 className={`font-semibold transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      Notifications
                    </h3>
                    <p className={`text-sm transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {unreadCount} unread
                    </p>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer border-b ${
                          isDarkMode ? "border-gray-700" : "border-gray-100"
                        } ${notification.unread ? isDarkMode ? "bg-amber-500/10" : "bg-amber-50" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? "bg-amber-500" : "bg-transparent"
                          }`} />
                          <div className="flex-1">
                            <p className={`font-medium transition-colors duration-500 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {notification.title}
                            </p>
                            <p className={`text-sm transition-colors duration-500 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}>
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-4 py-3">
                    <Link
                      href="/admin/notifications"
                      className={`text-center block w-full py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                        isDarkMode
                          ? "text-amber-400 hover:text-amber-300"
                          : "text-amber-600 hover:text-amber-700"
                      }`}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
              
              <div className="hidden lg:block text-left">
                <p className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  John Doe
                </p>
                <p className={`text-xs transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  Admin
                </p>
              </div>
              
              <ChevronDownIcon
                size={16}
                className={`transition-transform duration-300 ${
                  showUserMenu ? "rotate-180" : ""
                } ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg border py-1 z-50 transition-all duration-500 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="px-4 py-3 border-b">
                    <p className={`font-medium transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      John Doe
                    </p>
                    <p className={`text-sm transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      john@example.com
                    </p>
                  </div>
                  
                  <Link
                    href="/admin/profile"
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <UserIcon size={18} />
                    My Profile
                  </Link>
                  
                  <Link
                    href="/admin/settings"
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <SettingsIcon size={18} />
                    Settings
                  </Link>
                  
                  <div className={`border-t my-1 ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`} />
                  
                  <button
                    className={`flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-700/50 transition-colors duration-300 ${
                      isDarkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    <LogOutIcon size={18} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}