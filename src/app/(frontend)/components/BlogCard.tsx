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
}

export default function BlogCard({ blog }: BlogCardProps) {
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
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Investment': 'from-emerald-500 to-green-600',
      'Market Trends': 'from-blue-500 to-cyan-600',
      'Home Buying': 'from-amber-500 to-orange-600',
      'Luxury': 'from-purple-500 to-pink-600',
      'Commercial': 'from-indigo-500 to-blue-600',
      'Interior Design': 'from-rose-500 to-pink-600',
    };
    return colors[category] || 'from-gray-500 to-gray-700';
  };

  const blogImage = getBlogImage(blog.id);

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`bg-gradient-to-r ${getCategoryColor(blog.category)} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
            {blog.category}
          </span>
          {blog.featured && (
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
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
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
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
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
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
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <CalendarIcon size={12} />
              {blog.date}
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <UserIcon size={12} />
              {blog.author}
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <EyeIcon size={12} />
            {blog.views?.toLocaleString() || "1.2K"} views
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 mb-3 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-5 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 group/cta"
          >
            Read Full Article
            <ArrowUpRightIcon 
              size={16} 
              className="group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 transition-transform duration-300" 
            />
          </Link>
          <span className="text-gray-400 text-xs">
            {blog.comments || 12} comments
          </span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none" />

      {/* Progress Bar (Shows reading progress on hover) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
          style={{ width: hovered ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}
