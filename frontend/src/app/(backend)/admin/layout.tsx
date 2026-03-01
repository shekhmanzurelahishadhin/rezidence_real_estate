// app/(backend)/admin/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import AdminSidebar from "./components/layout/Sidebar";
import AdminHeader from "./components/layout/Header";
import { useTheme } from "@/app/ThemeProvider";
import '../../../styles/globals.css'; // Make sure this imports your CSS file
import { useAdminAuth } from "@/app/contexts/AdminAuthContext";
import { useRouter } from "next/navigation";
import AuthLoader from "./components/ui/AuthLoader";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode } = useTheme();
  const { isAuthenticated, loading } = useAdminAuth();
  const router = useRouter();

  // Handle authentication redirect - MUST be before any conditional returns
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/admin/signin');
    }
  }, [isAuthenticated, loading, router]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, sidebar should start closed
      if (mobile) {
        setSidebarOpen(false);
      } else {
        // On desktop, sidebar should start open
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center transition-all duration-500 z-50 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <div className="relative">
            {/* Animated spinner */}
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
          <p className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting (prevents flash of content)
  if (!isAuthenticated) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center transition-all duration-500 z-50 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <AuthLoader isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
        onToggle={toggleSidebar}
      />
      
      <div
        className={`transition-all duration-300 ${
          sidebarOpen && !isMobile ? "lg:ml-64" : "lg:ml-20"
        } ${isMobile ? "ml-0" : ""}`}
      >
        <AdminHeader 
          onMenuClick={toggleSidebar} 
          sidebarOpen={sidebarOpen}
        />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div
            className={`rounded-2xl shadow-sm transition-all duration-500 overflow-hidden ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            {/* Gradient header line */}
            <div className={`h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500`} />
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}