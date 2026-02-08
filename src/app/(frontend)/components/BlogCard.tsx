"use client";

import { useState } from "react";
import Link from "next/link";
import { Blog } from "@/data";
import { 
  ClockIcon, 
  ArrowUpRightIcon,
  EyeIcon,
  BookmarkIcon,
  CalendarIcon,
  UserIcon,
  HeartIcon 
} from "@/assets/icons";

interface BlogCardProps {
  blog: Blog;
  isDarkMode?: boolean;
}

export default function BlogCard({ blog, isDarkMode = false }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Get blog image based on ID
  const getBlogImage = (id: number) => {
    const images = [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80", // Investment
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Market Trends
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Home Buying
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Commercial
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Luxury
      "https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Interior
    ];
    return images[id % images.length] || images[0];
  };

  // Get category color
  const getCategoryColor = (category: string, darkMode = false) => {
    const colors: Record<string, { light: string; dark: string }> = {
      'Investment': { light: 'from-emerald-500 to-green-600', dark: 'from-emerald-400 to-green-500' },
      'Market Trends': { light: 'from-blue-500 to-cyan-600', dark: 'from-blue-400 to-cyan-500' },
      'Home Buying': { light: 'from-amber-500 to-orange-600', dark: 'from-amber-400 to-orange-500' },
      'Luxury': { light: 'from-purple-500 to-pink-600', dark: 'from-purple-400 to-pink-500' },
      'Commercial': { light: 'from-indigo-500 to-blue-600', dark: 'from-indigo-400 to-blue-500' },
      'Interior Design': { light: 'from-rose-500 to-pink-600', dark: 'from-rose-400 to-pink-500' },
    };
    const color = colors[category] || { light: 'from-gray-500 to-gray-700', dark: 'from-gray-400 to-gray-600' };
    return darkMode ? color.dark : color.light;
  };

  const blogImage = getBlogImage(blog.id);

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        isDarkMode 
          ? "bg-gray-800 shadow-black/10 hover:shadow-black/20" 
          : "bg-white"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Blog Image */}
      <div className="relative h-56 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{
            backgroundImage: `url(${blogImage})`,
          }}
        >
          <div className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-t from-black/50 via-black/30 to-transparent" 
              : "bg-gradient-to-t from-black/40 via-black/20 to-transparent"
          }`} />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`bg-gradient-to-r ${getCategoryColor(blog.category, isDarkMode)} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
            {blog.category}
          </span>
          {blog.featured && (
            <span className={`bg-gradient-to-r text-white text-xs font-bold px-3 py-1.5 rounded-full ${
              isDarkMode ? 'from-pink-400 to-purple-400' : 'from-pink-500 to-purple-500'
            }`}>
              FEATURED
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setBookmarked(!bookmarked);
            }}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 ${
              isDarkMode 
                ? "bg-white/10 hover:bg-white/20" 
                : "bg-white/20 hover:bg-white/30"
            }`}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
          >
            <BookmarkIcon 
              size={18} 
              className={bookmarked ? "fill-amber-500 text-amber-500" : "text-white"} 
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 ${
              isDarkMode 
                ? "bg-white/10 hover:bg-white/20" 
                : "bg-white/20 hover:bg-white/30"
            }`}
            aria-label={liked ? "Unlike article" : "Like article"}
          >
            <HeartIcon 
              size={18} 
              className={liked ? "fill-red-500 text-red-500" : "text-white"} 
            />
          </button>
        </div>

        {/* Reading Time */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
          <ClockIcon size={12} className="text-white" />
          <span className="text-white text-xs font-medium">{blog.readTime} min read</span>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-5">
        {/* Date & Author */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 text-xs transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <CalendarIcon size={12} />
              {blog.date}
            </div>
            <div className={`flex items-center gap-1 text-xs transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <UserIcon size={12} />
              {blog.author}
            </div>
          </div>
          <div className={`flex items-center gap-1 text-xs transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <EyeIcon size={12} />
            {blog.views?.toLocaleString() || "1.2K"} views
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold group-hover:text-amber-500 transition-colors duration-300 mb-3 line-clamp-2 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-sm mb-5 line-clamp-3 transition-colors duration-500 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`inline-block text-xs px-2.5 py-1 rounded-full transition-colors duration-300 hover:text-amber-600 ${
                isDarkMode 
                  ? "bg-gray-700 text-gray-300 hover:bg-amber-900/30" 
                  : "bg-gray-100 text-gray-600 hover:bg-amber-50"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More CTA */}
        <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-500 ${
          isDarkMode ? "border-gray-700" : "border-gray-100"
        }`}>
          <Link
            href={`/blogs/${blog.slug}`}
            className={`font-semibold text-sm flex items-center gap-1 group/cta transition-colors duration-300 ${
              isDarkMode 
                ? "text-amber-400 hover:text-amber-300" 
                : "text-amber-600 hover:text-amber-700"
            }`}
          >
            Read Full Article
            <ArrowUpRightIcon 
              size={16} 
              className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform duration-300" 
            />
          </Link>
          <span className={`text-xs transition-colors duration-500 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}>
            {blog.comments || 12} comments
          </span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className={`absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none ${
        isDarkMode ? "group-hover:border-amber-400/20" : ""
      }`} />

      {/* Progress Bar (Shows reading progress on hover) */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}>
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
          style={{ width: hovered ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}