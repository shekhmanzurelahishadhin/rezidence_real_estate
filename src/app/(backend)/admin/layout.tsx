// app/(backend)/admin/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import AdminSidebar from "./components/layout/Sidebar";
import AdminHeader from "./components/layout/Header";
import { useTheme } from "@/app/ThemeProvider";
// app/layout.tsx
import '../../../styles/globals.css'; // Make sure this imports your CSS file

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

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
            className={`rounded-2xl shadow-sm transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}