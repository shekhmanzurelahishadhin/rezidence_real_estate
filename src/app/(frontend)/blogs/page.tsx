"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { blogs } from "@/data";
import BlogCard from "@/app/(frontend)/components/BlogCard";
import { 
  SearchIcon, 
  ChevronRightIcon, 
  TrendingUpIcon, 
  BookmarkIcon,
  ClockIcon,
  CalendarIcon 
} from "@/assets/icons";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [featuredPost, setFeaturedPost] = useState(blogs[0]);

  const categoryOptions = ["All", ...new Set(blogs.map((b) => b.category))];
  
  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter((blog) => {
      if (activeCategory !== "All" && blog.category !== activeCategory) {
        return false;
      }
      if (searchQuery && !blog.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views;
        case "trending":
          return b.shares - a.shares;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Update featured post when category changes
  useEffect(() => {
    const featured = filteredBlogs.length > 0 ? filteredBlogs[0] : blogs[0];
    setFeaturedPost(featured);
  }, [activeCategory]);

  // Get category count
  const getCategoryCount = (category: string) => {
    return category === "All" 
      ? blogs.length 
      : blogs.filter(b => b.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 pt-32 pb-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        {/* Animated Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium tracking-wide">
                MARKET INSIGHTS
              </span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl font-bold mb-6">
              Real Estate <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Insights</span>
            </h1>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              Expert analysis, market trends, and actionable advice to guide your property decisions.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full bg-white/10 backdrop-blur-lg rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-amber-400 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-full min-h-[400px]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  FEATURED POST
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {featuredPost.title}
              </h2>

              <p className="text-gray-300 text-lg mb-6">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-6 text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{featuredPost.author[0]}</span>
                  </div>
                  <span className="text-sm">{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CalendarIcon size={14} />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <ClockIcon size={14} />
                  {featuredPost.readTime} read
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={`/blogs/${featuredPost.id}`}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
                >
                  Read Full Article
                  <ChevronRightIcon size={20} />
                </Link>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  <BookmarkIcon size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                Categories
              </h3>
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-amber-50 text-amber-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span>{category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === category
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {getCategoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Posts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUpIcon size={18} className="text-amber-500" />
                Trending Now
              </h3>
              <div className="space-y-4">
                {blogs.slice(0, 4).map((blog) => (
                  <div key={blog.id} className="flex items-center gap-3 group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-sm">#{blog.id}</span>
                    </div>
                    <div>
                      <Link 
                        href={`/blogs/${blog.id}`}
                        className="text-gray-900 font-medium text-sm line-clamp-1 group-hover:text-amber-600 transition-colors duration-300"
                      >
                        {blog.title}
                      </Link>
                      <div className="text-gray-400 text-xs">{blog.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            {/* Header with Sort Options */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Latest <span className="text-amber-600">Articles</span>
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredBlogs.length} articles found
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
                <button className="p-2 bg-white rounded-lg border border-gray-300 hover:border-amber-400 hover:text-amber-600 transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button className="p-2 bg-white rounded-lg border border-gray-300 hover:border-amber-400 hover:text-amber-600 transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Blog Posts */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-6">
                    <SearchIcon size={32} className="text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No Articles Found</h3>
                  <p className="text-gray-600 mb-8">
                    We couldn't find any articles matching your criteria. Try a different search or category.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All");
                      setSearchQuery("");
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}

            {/* Load More */}
            {filteredBlogs.length > 0 && (
              <div className="mt-12 text-center">
                <button className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300">
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Get Weekly <span className="text-amber-400">Market Updates</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive expert insights, market trends, and investment opportunities directly in your inbox.
          </p>
          
          <div className="max-w-lg mx-auto">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setSearchQuery("");
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}