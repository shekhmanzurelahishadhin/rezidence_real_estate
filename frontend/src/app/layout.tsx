// D:\server 8.2  new\htdocs\rezidence_real_estate\src\app\(full-width-pages)\layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { ClientAuthProvider } from "./contexts/ClientAuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homely Homes - Premium Real Estate",
  description: "Find your dream home with our premium real estate services",
};

export default function FullWidthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <AdminAuthProvider>
            <ClientAuthProvider>
            {children}
            </ClientAuthProvider>
            </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
