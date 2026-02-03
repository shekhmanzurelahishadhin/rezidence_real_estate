"use client";

import Link from "next/link";
import { blogs } from "@/data";
import { ArrowUpRightIcon, ChevronRightIcon } from "@/assets/icons";
import { IMAGES } from "./constants";

export function BlogStrip() {
  const blogImages = [IMAGES.blog1, IMAGES.blog2, IMAGES.blog3];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-0.5 bg-amber-400" />
              MARKET INSIGHTS
            </span>
            <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
              Latest <span className="text-amber-500">Real Estate</span> News
            </h2>
            <p className="text-gray-600 text-lg">
              Stay informed with expert analysis, market trends, and investment opportunities.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-amber-600 font-semibold text-lg hover:gap-4 transition-all duration-300"
          >
            View All Articles
            <ArrowUpRightIcon size={20} className="text-amber-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <Link href={`/blogs/${blog.slug}`} passHref key={blog.id}>
              <article
                key={blog.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div
                  className="relative h-56 overflow-hidden group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${blogImages[index] || IMAGES.blog1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime} read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${IMAGES.agentProfile})` }}
                      />
                      <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}