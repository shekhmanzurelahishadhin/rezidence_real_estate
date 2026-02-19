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
  ChevronDownIcon,
  ChevronUpIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  ListIcon,
  MailIcon,
  HeartIcon,
} from "@/assets/icons";

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const menuItems: MenuItem[] = [
  { 
    title: "Dashboard", 
    icon: HomeIcon, 
    href: "/admin" 
  },
  { 
    title: "Properties", 
    icon: BuildingIcon,
    href: "/admin/properties"
  },
  { 
    title: "Blogs", 
    icon: FileTextIcon,
    href: "/admin/blogs"
  },
  { 
    title: "Categories", 
    icon: FolderIcon, 
    href: "/admin/categories" 
  },
  { 
    title: "About Us", 
    icon: HeartIcon, 
    href: "/admin/about" 
  },
  { 
    title: "Team", 
    icon: UsersIcon, 
    href: "/admin/team" 
  },
  { 
    title: "Testimonials", 
    icon: StarIcon, 
    href: "/admin/testimonials" 
  },
  { 
    title: "Users", 
    icon: UsersIcon,
    submenu: [
      { title: "All Users", href: "/admin/users", icon: ListIcon },
      { title: "Add User", href: "/admin/users/create", icon: PlusIcon },
      { title: "Roles", href: "/admin/users/roles", icon: SettingsIcon },
      { title: "Permissions", href: "/admin/users/permissions", icon: EditIcon },
    ]
  },
  { 
    title: "Testimonials", 
    icon: StarIcon,
    submenu: [
      { title: "All Testimonials", href: "/admin/testimonials", icon: ListIcon },
      { title: "Add New", href: "/admin/testimonials/create", icon: PlusIcon },
      { title: "Pending", href: "/admin/testimonials/pending", icon: EditIcon },
    ]
  },
  { 
    title: "Media", 
    icon: ImageIcon,
    submenu: [
      { title: "Library", href: "/admin/media", icon: ListIcon },
      { title: "Upload", href: "/admin/media/upload", icon: PlusIcon },
      { title: "Gallery", href: "/admin/media/gallery", icon: ImageIcon },
    ]
  },
  { 
    title: "Analytics", 
    icon: ChartBarIcon,
    submenu: [
      { title: "Overview", href: "/admin/analytics", icon: ChartBarIcon },
      { title: "Traffic", href: "/admin/analytics/traffic", icon: ChartBarIcon },
      { title: "Users", href: "/admin/analytics/users", icon: UsersIcon },
      { title: "Revenue", href: "/admin/analytics/revenue", icon: ChartBarIcon },
    ]
  },
  { 
    title: "Settings", 
    icon: SettingsIcon,
    submenu: [
      { title: "General", href: "/admin/settings/general", icon: SettingsIcon },
      { title: "Appearance", href: "/admin/settings/appearance", icon: ImageIcon },
      { title: "SEO", href: "/admin/settings/seo", icon: EditIcon },
      { title: "Social Media", href: "/admin/settings/social", icon: UsersIcon },
      { title: "Email", href: "/admin/settings/email", icon: MailIcon },
      { title: "Backup", href: "/admin/settings/backup", icon: SettingsIcon },
    ]
  },
];



export default function AdminSidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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

  // Toggle submenu expansion
  const toggleSubmenu = (title: string) => {
    if (expandedMenu === title) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(title);
    }
  };

  // Check if menu item is active (including submenu items)
  const isMenuItemActive = (item: MenuItem): boolean => {
  if (item.href) {
    // For dashboard, we need exact match or specific dashboard routes
    if (item.href === "/admin") {
      // Only mark as active if we're exactly at /admin or /admin/ with nothing else
      return pathname === "/admin" || pathname === "/admin/" || pathname.startsWith("/admin/?");
    }
    // For other routes, use more specific matching
    const normalizedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const normalizedHref = item.href.endsWith("/") ? item.href.slice(0, -1) : item.href;
    
    // Check exact match
    if (normalizedPath === normalizedHref) return true;
    
    // Check if it's a subpath (but avoid matching parent paths incorrectly)
    if (normalizedPath.startsWith(`${normalizedHref}/`)) {
      // Make sure we're not matching something like /admin/properties-edit when href is /admin/properties
      const nextChar = normalizedPath.charAt(normalizedHref.length);
      return nextChar === "/" || nextChar === "" || nextChar === "?";
    }
    
    return false;
  }
  
  if (item.submenu) {
    return item.submenu.some(subItem => {
      const normalizedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
      const normalizedHref = subItem.href.endsWith("/") ? subItem.href.slice(0, -1) : subItem.href;
      
      // Check exact match
      if (normalizedPath === normalizedHref) return true;
      
      // Check if it's a subpath
      if (normalizedPath.startsWith(`${normalizedHref}/`)) {
        const nextChar = normalizedPath.charAt(normalizedHref.length);
        return nextChar === "/" || nextChar === "" || nextChar === "?";
      }
      
      return false;
    });
  }
  
  return false;
};

  // Check if submenu item is active
  const isSubmenuItemActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(`${href}/`);
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
              const isActive = isMenuItemActive(item);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isExpanded = expandedMenu === item.title;

              return (
                <div key={item.title} className="space-y-1">
                  {/* Main Menu Item */}
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-300 group ${
                        isActive
                          ? isDarkMode
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-amber-50 text-amber-700"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
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
                      </div>
                      
                      {isOpen && hasSubmenu && (
                        <div className="flex items-center">
                          {isActive && (
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                isDarkMode ? "bg-amber-400" : "bg-amber-600"
                              }`}
                            />
                          )}
                          {isExpanded ? (
                            <ChevronUpIcon
                              size={16}
                              className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                            />
                          ) : (
                            <ChevronDownIcon
                              size={16}
                              className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                            />
                          )}
                        </div>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-300 group ${
                        isActive
                          ? isDarkMode
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-amber-50 text-amber-700"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
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
                      </div>
                      
                      {isActive && isOpen && (
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isDarkMode ? "bg-amber-400" : "bg-amber-600"
                            }`}
                          />
                        </div>
                      )}
                    </Link>
                  )}

                  {/* Submenu Items */}
                  {hasSubmenu && isOpen && isExpanded && (
                    <div className={`ml-8 space-y-1 ${
                      isDarkMode ? "border-l border-gray-700" : "border-l border-gray-200"
                    }`}>
                      {item.submenu!.map((subItem) => {
                        const SubIcon = subItem.icon || Icon;
                        const isSubActive = isSubmenuItemActive(subItem.href);

                        return (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group ${
                              isSubActive
                                ? isDarkMode
                                  ? "bg-amber-500/15 text-amber-300"
                                  : "bg-amber-50/80 text-amber-600"
                                : isDarkMode
                                ? "text-gray-400 hover:bg-gray-700/30 hover:text-gray-300"
                                : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-center w-6 h-6 rounded-lg transition-colors duration-300 ${
                                isSubActive
                                  ? isDarkMode
                                    ? "bg-amber-500/20"
                                    : "bg-amber-500/10"
                                  : isDarkMode
                                  ? "bg-gray-700/30 group-hover:bg-gray-700/50"
                                  : "bg-gray-100 group-hover:bg-gray-200"
                              }`}
                            >
                              <SubIcon
                                size={14}
                                className={
                                  isSubActive
                                    ? isDarkMode
                                      ? "text-amber-300"
                                      : "text-amber-600"
                                    : isDarkMode
                                    ? "text-gray-400 group-hover:text-gray-300"
                                    : "text-gray-500 group-hover:text-gray-700"
                                }
                              />
                            </div>
                            
                            <span className="text-sm font-medium whitespace-nowrap">
                              {subItem.title}
                            </span>
                            
                            {isSubActive && (
                              <div className="ml-auto">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    isDarkMode ? "bg-amber-300" : "bg-amber-500"
                                  }`}
                                />
                              </div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Tooltip for collapsed state (desktop only) */}
                  {!isOpen && !isMobile && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-lg">
                      {item.title}
                      {hasSubmenu && (
                        <div className="mt-1 pt-1 border-t border-gray-700">
                          {item.submenu!.slice(0, 3).map((subItem) => (
                            <div key={subItem.title} className="py-1 text-gray-300">
                              {subItem.title}
                            </div>
                          ))}
                          {item.submenu!.length > 3 && (
                            <div className="py-1 text-gray-400 text-xs">
                              +{item.submenu!.length - 3} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
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

    </>
  );
}