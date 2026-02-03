import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/app/(frontend)/components/Navbar";
import Footer from "@/app/(frontend)/components/Footer";

export const metadata: Metadata = {
  title: "Homely – Luxury Real Estate",
  description: "Discover curated luxury properties in the most prestigious locations across the United States.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
