"use client";

import Link from "next/link";
import { blogs } from "@/data";
import { ArrowUpRightIcon, ChevronRightIcon } from "@/assets/icons";
import { IMAGES } from "./constants";
import { useTheme } from "@/app/ThemeProvider";

export function BlogStrip() {
  const { isDarkMode } = useTheme();
  const blogImages = [IMAGES.blog1, IMAGES.blog2, IMAGES.blog3];

  return (
    <section className={`py-20 transition-all duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}>
              <span className={`w-8 h-0.5 ${isDarkMode ? "bg-amber-400" : "bg-amber-500"}`} />
              MARKET INSIGHTS
            </span>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Latest <span className="text-amber-500">Real Estate</span> News
            </h2>
            <p className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Stay informed with expert analysis, market trends, and investment opportunities.
            </p>
          </div>
          <Link
            href="/blogs"
            className={`inline-flex items-center gap-2 font-semibold text-lg hover:gap-4 transition-all duration-300 ${
              isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-700"
            }`}
          >
            View All Articles
            <ArrowUpRightIcon 
              size={20} 
              className={isDarkMode ? "text-amber-400" : "text-amber-500"} 
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <Link href={`/blogs/${blog.slug}`} passHref key={blog.id}>
              <article
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  isDarkMode 
                    ? "bg-gray-800 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-black/20" 
                    : "bg-white shadow-lg hover:shadow-2xl"
                }`}
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
                    <span className={`backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full ${
                      isDarkMode 
                        ? "bg-white/20 text-white" 
                        : "bg-white/90 text-gray-900"
                    }`}>
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className={`flex items-center gap-2 text-sm mb-3 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime} read</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {blog.title}
                  </h3>
                  <p className={`mb-4 line-clamp-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {blog.excerpt}
                  </p>

                  <div className={`flex items-center justify-between pt-4 border-t ${
                    isDarkMode ? "border-gray-700" : "border-gray-100"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${IMAGES.agentProfile})` }}
                      />
                      <span className={`text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {blog.author}
                      </span>
                    </div>
                    <ChevronRightIcon 
                      size={20} 
                      className={`group-hover:text-amber-500 group-hover:translate-x-2 transition-all duration-300 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`} 
                    />
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