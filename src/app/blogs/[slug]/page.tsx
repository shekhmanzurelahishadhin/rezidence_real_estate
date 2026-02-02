"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data";
import BlogCard from "@/components/BlogCard";
import {
  ClockIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  UserIcon,
  ShareIcon,
  BookmarkIcon,
  HeartIcon,
  EyeIcon,
  MessageIcon,
  TrendingUpIcon,
  CheckIcon,
} from "@/assets/icons";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Get blog images based on ID
  const getBlogImage = (id: number) => {
    const images = [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    ];
    return images[id % images.length] || images[0];
  };

  // 404 fallback
  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-5 text-center">
        <div className="max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">📄</span>
          </div>
          <h1 className="text-gray-900 text-4xl font-bold mb-3">Article Not Found</h1>
          <p className="text-gray-600 text-lg mb-8">
            This article doesn't exist or has been removed.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Browse Articles
            <ArrowRightIcon size={20} />
          </Link>
        </div>
      </div>
    );
  }

  const related = blogs.filter((b) => b.category === blog.category && b.slug !== blog.slug).slice(0, 3);
  const trending = blogs.filter((b) => b.slug !== blog.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${getBlogImage(blog.id)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium tracking-wide">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-white text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{blog.author[0]}</span>
                </div>
                <span className="text-sm">{blog.author}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <CalendarIcon size={14} />
                {blog.date}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <ClockIcon size={14} />
                {blog.readTime} min read
              </div>
              <div className="flex items-center gap-1 text-sm">
                <EyeIcon size={14} />
                {(blog.views || 1250).toLocaleString()} views
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <HeartIcon size={16} className={liked ? "fill-red-500 text-red-500" : ""} />
                {liked ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <BookmarkIcon size={16} className={bookmarked ? "fill-amber-500 text-amber-500" : ""} />
                {bookmarked ? "Saved" : "Save"}
              </button>
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors duration-300">
                <ShareIcon size={16} />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Article Content */}
          <article className="lg:col-span-2">
            {/* Excerpt */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                {blog.excerpt}
              </p>
            </div>

            {/* Body Content */}
            <div className="prose prose-lg max-w-none">
              {blog.body.map((paragraph, i) => (
                <div key={i} className="mb-6">
                  {paragraph}
                </div>
              ))}
            </div>

            {/* Key Takeaways */}
            {blog.keyPoints && (
              <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUpIcon size={24} className="text-amber-600" />
                  Key Takeaways
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blog.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon size={12} className="text-amber-600" />
                      </div>
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share & Comments */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl text-white">
              <div>
                <h4 className="text-lg font-bold mb-2">Found this article helpful?</h4>
                <p className="text-gray-300 text-sm">Share it with your network</p>
              </div>
              <div className="flex items-center gap-3">
                {['Twitter', 'LinkedIn', 'Facebook', 'Email'].map((platform) => (
                  <button
                    key={platform}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                  >
                    <span className="text-sm">{platform[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <div className="text-center mb-6">
                <div className="relative mx-auto mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto">
                    <span className="text-white text-2xl font-bold">{blog.author[0]}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                    <CheckIcon size={10} className="text-white" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900">{blog.author}</h4>
                <p className="text-amber-600 font-medium mt-1">Senior Real Estate Analyst</p>
                <p className="text-gray-500 text-sm mt-3">
                  With over 10 years of experience in market analysis and investment strategies.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">142</div>
                  <div className="text-gray-500 text-xs">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-gray-500 text-xs">Avg. Rating</div>
                </div>
              </div>
            </div>

            {/* Trending Articles */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUpIcon size={20} className="text-amber-500" />
                Trending Now
              </h4>
              <div className="space-y-4">
                {trending.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blogs/${article.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundImage: `url(${getBlogImage(article.id)})` }}
                      />
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium text-sm group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">{article.date}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-0.5 bg-amber-400" />
              RELATED ARTICLES
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Continue <span className="text-amber-500">Reading</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore more articles on similar topics that you might find interesting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.length > 0 ? (
              related.map((article) => (
                <BlogCard key={article.slug} blog={article} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">📰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No Related Articles</h3>
                  <p className="text-gray-600">
                    Check out other categories for more interesting reads.
                  </p>
                </div>
              </div>
            )}
          </div>

          {related.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                View All Articles
                <ArrowRightIcon size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageIcon size={24} className="text-amber-600" />
            Comments ({blog.comments || 24})
          </h3>
          
          {/* Comment Form */}
          <div className="mb-8">
            <textarea
              placeholder="Share your thoughts on this article..."
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none min-h-[120px]"
            />
            <button className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
              Post Comment
            </button>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">U{i}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">User {i}</span>
                      <span className="text-gray-400 text-sm ml-2">2 days ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon size={14} className="text-gray-400" />
                      <span className="text-gray-500 text-xs">12</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {i === 1 
                      ? "Great insights! This article helped me understand current market trends better."
                      : "I appreciate the detailed analysis. Could you write more about investment strategies?"
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}