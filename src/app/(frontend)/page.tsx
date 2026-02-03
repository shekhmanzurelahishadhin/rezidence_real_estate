"use client";

import {
  Hero,
  Categories,
  FeaturedProperty,
  Testimonials,
  BlogStrip,
  Marquee,
  FAQSection,
  CTA
} from "./components/home";

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