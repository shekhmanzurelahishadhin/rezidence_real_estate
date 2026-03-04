import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/app/(frontend)/components/Navbar";
import Footer from "@/app/(frontend)/components/Footer";
import { ClientAuthProvider } from "../contexts/ClientAuthContext";

export const metadata: Metadata = {
  title: "Homely – Luxury Real Estate",
  description:
    "Discover curated luxury properties in the most prestigious locations across the United States.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ClientAuthProvider>
     <Navbar />
      {children}
      <Footer />
      </ClientAuthProvider>
    </>
  );
}
