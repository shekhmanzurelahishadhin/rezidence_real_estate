// D:\server 8.2  new\htdocs\rezidence_real_estate\src\app\(full-width-pages)\layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}