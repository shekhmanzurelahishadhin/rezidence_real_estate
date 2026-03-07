// app/page.tsx
"use client";

import { Hero } from "./components/home/Hero";
import { Categories } from "./components/home/Categories";
import { FeaturedProperty } from "./components/home/FeaturedProperty";
import { Testimonials } from "./components/home/Testimonials";
import { BlogStrip } from "./components/home/BlogStrip";
import { Marquee } from "./components/home/Marquee";
import { FAQSection } from "./components/home/FAQSection";
import { CTA } from "./components/home/CTA";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Categories />
      <FeaturedProperty />
      <Testimonials />
      <BlogStrip />
      <Marquee />
      <FAQSection />
      <CTA />
    </div>
  );
}