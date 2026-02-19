// app/(backend)/admin/testimonials/components/TestimonialModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon, UploadIcon, StarIcon, CheckIcon } from "@/assets/icons";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  testimonial?: any;
  isDarkMode: boolean;
  onSubmit: (data: any) => void;
}

export default function TestimonialModal({
  isOpen,
  onClose,
  type,
  testimonial,
  isDarkMode,
  onSubmit
}: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    author: "",
    role: "",
    quote: "",
    rating: 5,
    status: "draft",
    featured: false,
    image: ""
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [imagePreview, setImagePreview] = useState("");

  // Initialize form data when testimonial changes
  useEffect(() => {
    if (testimonial && type === 'edit') {
      setFormData({
        author: testimonial.author || "",
        role: testimonial.role || "",
        quote: testimonial.quote || "",
        rating: testimonial.rating || 5,
        status: testimonial.status || "draft",
        featured: testimonial.featured || false,
        image: testimonial.image || ""
      });
      setImagePreview(testimonial.image || "");
    } else {
      // Reset for create
      setFormData({
        author: "",
        role: "",
        quote: "",
        rating: 5,
        status: "draft",
        featured: false,
        image: ""
      });
      setImagePreview("");
    }
  }, [testimonial, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      rating: Number(formData.rating)
    };

    onSubmit(submitData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      // Here we'll just create a mock URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const RatingStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
          >
            <StarIcon
              size={24}
              className={`transition-colors duration-300 ${
                star <= (hoverRating || formData.rating)
                  ? "fill-amber-400 text-amber-400"
                  : isDarkMode
                    ? "text-gray-600"
                    : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className={`ml-2 text-sm transition-colors duration-500 ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          {formData.rating} out of 5
        </span>
      </div>
    );
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
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-xl transition-all duration-300 ${
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
                  {type === 'create' ? 'Add New Testimonial' : 'Edit Testimonial'}
                </h2>
                <p className={`mt-1 text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {type === 'create' 
                    ? 'Add a new client testimonial to showcase on your website' 
                    : 'Update the testimonial information'
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
                {/* Author & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Sarah Chen"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Client Role *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Tech Entrepreneur"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Rating *
                  </label>
                  <RatingStars />
                </div>

                {/* Quote */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Testimonial Quote *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.quote}
                    onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="The entire process was seamless. Found our dream home in just 3 weeks!"
                  />
                </div>

                {/* Client Image */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Client Photo
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-600 hover:border-amber-500"
                      : "border-gray-300 hover:border-amber-400"
                  }`}>
                    {imagePreview ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <div 
                            className="w-24 h-24 rounded-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${imagePreview})` }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview("");
                              setFormData(prev => ({ ...prev, image: "" }));
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                          >
                            <XIcon size={14} />
                          </button>
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <span className="text-sm text-amber-500 hover:text-amber-600 transition-colors duration-300">
                            Change Photo
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                          <UploadIcon size={24} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                        </div>
                        <div>
                          <p className={`font-medium transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          }`}>
                            Upload client photo
                          </p>
                          <p className={`text-sm mt-1 transition-colors duration-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <div className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300">
                            Select Photo
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Featured */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                    >
                      <option value="draft">Draft</option>
                      <option value="pending">Pending Review</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Featured Testimonial
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                        className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                          formData.featured
                            ? "border-amber-500 bg-amber-500/10"
                            : isDarkMode
                              ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
                              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-300 ${
                          formData.featured
                            ? "bg-amber-500 border-amber-500"
                            : isDarkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-white border-gray-300"
                        }`}>
                          {formData.featured && (
                            <CheckIcon size={12} className="text-white" />
                          )}
                        </div>
                        <span className={`font-medium transition-colors duration-500 ${
                          formData.featured
                            ? "text-amber-500"
                            : isDarkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                        }`}>
                          Mark as featured testimonial
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 mt-8 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-2.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ${
                    isDarkMode 
                      ? "border-gray-600 text-gray-300" 
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                  {type === 'create' ? 'Create Testimonial' : 'Update Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}