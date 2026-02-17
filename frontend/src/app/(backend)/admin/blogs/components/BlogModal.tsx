// app/(backend)/admin/blogs/components/BlogModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon, UploadIcon, CalendarIcon, ClockIcon, UserIcon } from "@/assets/icons";

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  blog?: any;
  isDarkMode: boolean;
  onSubmit: (data: any) => void;
}

export default function BlogModal({
  isOpen,
  onClose,
  type,
  blog,
  isDarkMode,
  onSubmit
}: BlogModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    body: [] as string[],
    category: "",
    author: "",
    readTime: "5",
    status: "draft",
    featured: false,
    tags: [] as string[],
    keyPoints: [] as string[],
    image: ""
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentKeyPoint, setCurrentKeyPoint] = useState("");
  const [currentBody, setCurrentBody] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  // Category options
  const categoryOptions = [
    "Investment",
    "Market Trends", 
    "Home Buying",
    "Luxury",
    "Commercial",
    "Interior Design",
    "Legal Advice",
    "Property Management"
  ];

  // Initialize form data when blog changes
  useEffect(() => {
    if (blog && type === 'edit') {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        body: blog.body || [],
        category: blog.category || "",
        author: blog.author || "",
        readTime: blog.readTime?.toString() || "5",
        status: blog.status || "draft",
        featured: blog.featured || false,
        tags: blog.tags || [],
        keyPoints: blog.keyPoints || [],
        image: blog.image || ""
      });
      setUploadedImage(blog.image || "");
    } else {
      // Reset for create
      setFormData({
        title: "",
        excerpt: "",
        body: [],
        category: "",
        author: "",
        readTime: "5",
        status: "draft",
        featured: false,
        tags: [],
        keyPoints: [],
        image: ""
      });
      setUploadedImage("");
    }
  }, [blog, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      readTime: parseInt(formData.readTime) || 5,
      body: formData.body.filter(b => b.trim() !== ""),
      tags: formData.tags.filter(t => t.trim() !== ""),
      keyPoints: formData.keyPoints.filter(k => k.trim() !== ""),
      image: uploadedImage
    };

    onSubmit(submitData);
  };

  const handleAddTag = () => {
    if (currentTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleAddKeyPoint = () => {
    if (currentKeyPoint.trim()) {
      setFormData(prev => ({
        ...prev,
        keyPoints: [...prev.keyPoints, currentKeyPoint.trim()]
      }));
      setCurrentKeyPoint("");
    }
  };

  const handleRemoveKeyPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyPoints: prev.keyPoints.filter((_, i) => i !== index)
    }));
  };

  const handleAddBody = () => {
    if (currentBody.trim()) {
      setFormData(prev => ({
        ...prev,
        body: [...prev.body, currentBody.trim()]
      }));
      setCurrentBody("");
    }
  };

  const handleRemoveBody = (index: number) => {
    setFormData(prev => ({
      ...prev,
      body: prev.body.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      // In a real app, you would upload to a server
      const imageUrl = URL.createObjectURL(files[0]);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={`relative w-full max-w-4xl rounded-2xl shadow-xl transition-all duration-300 ${
            isDarkMode 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className={`text-xl font-bold transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {type === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
                </h2>
                <p className={`mt-1 text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {type === 'create' 
                    ? 'Write and publish a new article' 
                    : 'Update the blog post'
                  }
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Title & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Enter blog post title"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Author & Read Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Author *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                        }`}
                        placeholder="Enter author name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Read Time (minutes) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                      </div>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.readTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                        }`}
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="Write a short description of the blog post..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Featured Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className={`flex-1 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-all duration-300 hover:border-amber-500 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700/50 hover:bg-gray-700"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <UploadIcon size={24} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                        <span className={`text-sm transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {uploadedImage ? 'Change image' : 'Upload image'}
                        </span>
                        <span className={`text-xs transition-colors duration-500 ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        }`}>
                          PNG, JPG, WEBP up to 5MB
                        </span>
                      </div>
                    </label>
                    {uploadedImage && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                        <img
                          src={uploadedImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setUploadedImage("")}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <XIcon size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="p-0.5 hover:text-red-500 transition-colors duration-300"
                        >
                          <XIcon size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Points */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Key Points
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentKeyPoint}
                      onChange={(e) => setCurrentKeyPoint(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyPoint())}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Add a key point"
                    />
                    <button
                      type="button"
                      onClick={handleAddKeyPoint}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-700/50 border border-gray-600"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            isDarkMode ? "bg-amber-500" : "bg-amber-400"
                          }`} />
                          <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                            {point}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyPoint(index)}
                          className="p-1 hover:text-red-500 transition-colors duration-300"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`block text-sm font-medium transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Content (Paragraphs) *
                    </label>
                    <span className={`text-xs transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {formData.body.length} paragraphs
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <textarea
                      value={currentBody}
                      onChange={(e) => setCurrentBody(e.target.value)}
                      rows={3}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Write a paragraph..."
                    />
                    <button
                      type="button"
                      onClick={handleAddBody}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.body.map((paragraph, index) => (
                      <div
                        key={index}
                        className={`group flex items-start gap-3 p-4 rounded-lg transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-700/50 border border-gray-600"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <span className={`text-sm font-medium px-2 py-1 rounded ${
                          isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
                        }`}>
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                            {paragraph}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveBody(index)}
                          className="p-1 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all duration-300"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Status *
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full peer ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                      } peer-checked:bg-amber-500 peer-focus:ring-4 peer-focus:ring-amber-500/20 transition-all duration-300`}>
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 peer-checked:translate-x-5`} />
                      </div>
                    </label>
                    <div>
                      <span className={`block text-sm font-medium transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        Featured Post
                      </span>
                      <span className={`text-xs transition-colors duration-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        Show this post in featured section
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-all duration-300"
                >
                  {type === 'create' ? 'Create Post' : 'Update Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}