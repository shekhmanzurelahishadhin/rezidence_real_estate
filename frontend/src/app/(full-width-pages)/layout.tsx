"use client";
// D:\server 8.2  new\htdocs\rezidence_real_estate\src\app\(full-width-pages)\layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { useEffect } from "react";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { useRouter } from "next/navigation";
import AuthLoader from "../(backend)/admin/components/ui/AuthLoader";
import { useTheme } from "../ThemeProvider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Homely Homes - Premium Real Estate",
//   description: "Find your dream home with our premium real estate services",
// };

export default function FullWidthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
      const { isAuthenticated, loading } = useAdminAuth();
      const { isDarkMode } = useTheme();
      const router = useRouter();
   useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin"); // redirect to dashboard
    }
  }, [isAuthenticated, router]);
  if (loading || isAuthenticated) {
    return (
      <AuthLoader isDarkMode={isDarkMode} message={loading ? "Loading..." : "Redirecting..."} />
    );
  }
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}