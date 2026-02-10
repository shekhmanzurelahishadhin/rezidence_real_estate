// app/(backend)/admin/components/layout/Sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/ThemeProvider";
import {
  HomeIcon,
  BuildingIcon,
  FileTextIcon,
  UsersIcon,
  ImageIcon,
  StarIcon,
  SettingsIcon,
  FolderIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "@/assets/icons";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const menuItems = [
  { title: "Dashboard", icon: HomeIcon, href: "/admin" },
  { title: "Properties", icon: BuildingIcon, href: "/admin/properties" },
  { title: "Blogs", icon: FileTextIcon, href: "/admin/blogs" },
  { title: "Categories", icon: FolderIcon, href: "/admin/categories" },
  { title: "Users", icon: UsersIcon, href: "/admin/users" },
  { title: "Testimonials", icon: StarIcon, href: "/admin/testimonials" },
  { title: "Media Library", icon: ImageIcon, href: "/admin/media" },
  { title: "Analytics", icon: ChartBarIcon, href: "/admin/analytics" },
  { title: "Settings", icon: SettingsIcon, href: "/admin/settings" },
];

export default function AdminSidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Button (outside sidebar) */}
      {isMobile && !isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MenuIcon size={20} className="text-white" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen flex flex-col transition-all duration-300 hide-scrollbar ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isOpen ? "w-64" : "w-20 lg:w-20"} ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
        style={{
          boxShadow: isDarkMode 
            ? "2px 0 8px rgba(0, 0, 0, 0.3)" 
            : "2px 0 8px rgba(0, 0, 0, 0.1)",
          // Add inline styles as fallback
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {/* Logo and Close Button */}
        <div className={`flex items-center h-16 px-4 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <Link
            href="/admin"
            className={`flex items-center gap-3 transition-all duration-300 ${
              !isOpen && "justify-center w-full"
            }`}
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
              <span className="text-white text-xl font-bold">A</span>
            </div>
            
            {isOpen && (
              <div className="overflow-hidden">
                <h1
                  className={`text-lg font-bold whitespace-nowrap transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Admin Panel
                </h1>
                <p
                  className={`text-xs transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Real Estate Dashboard
                </p>
              </div>
            )}
          </Link>
          {isOpen && isMobile && (
            <button
              onClick={onToggle}
              className={`ml-auto p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${ isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700" }`}
            >
              <XIcon size={18} />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div 
          className="flex-1 overflow-y-auto py-4 hide-scrollbar"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          <nav className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? isDarkMode
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-amber-50 text-amber-700"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? isDarkMode
                          ? "bg-amber-500/30"
                          : "bg-amber-500/10"
                        : isDarkMode
                        ? "bg-gray-700/50 group-hover:bg-gray-700"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? isDarkMode
                            ? "text-amber-400"
                            : "text-amber-600"
                          : isDarkMode
                          ? "text-gray-400 group-hover:text-gray-300"
                          : "text-gray-500 group-hover:text-gray-700"
                      }
                    />
                  </div>
                  
                  {isOpen && (
                    <span className="font-medium whitespace-nowrap">
                      {item.title}
                    </span>
                  )}
                  
                  {isActive && isOpen && (
                    <div className="ml-auto">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isDarkMode ? "bg-amber-400" : "bg-amber-600"
                        }`}
                      />
                    </div>
                  )}
                  
                  {/* Tooltip for collapsed state (desktop only) */}
                  {!isOpen && !isMobile && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-lg">
                      {item.title}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout - Hide on mobile when sidebar is closed */}
        {(isOpen || !isMobile) && (
          <div
            className={`p-4 ${
              isDarkMode ? "border-t border-gray-700" : "border-t border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold">JD</span>
              </div>
              
              {isOpen && (
                <div className="overflow-hidden">
                  <h3
                    className={`font-semibold text-sm transition-colors duration-500 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    John Doe
                  </h3>
                  <p
                    className={`text-xs transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Administrator
                  </p>
                </div>
              )}
              
              {isOpen && (    
                <button
                  onClick={() => alert("Logging out...")}
                  className={`ml-auto p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                  }`} 
                >
                  <LogOutIcon size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Expand Button for Desktop (when collapsed) */}
      {!isOpen && !isMobile && (
        <button
          onClick={onToggle}
          className="fixed left-20 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-r-lg bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon size={16} className="text-white" />
        </button>
      )}
    </>
  );
}