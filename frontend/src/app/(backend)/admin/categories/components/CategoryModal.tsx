// app/(backend)/admin/categories/components/CategoryModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon, UploadIcon, FolderIcon, CheckIcon } from "@/assets/icons";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  category?: any;
  isDarkMode: boolean;
  onSubmit: (data: any) => void;
}

export default function CategoryModal({
  isOpen,
  onClose,
  type,
  category,
  isDarkMode,
  onSubmit
}: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🏠",
    status: "active",
    featured: false,
    color: "#3B82F6",
    image: ""
  });

  // Icon options
  const iconOptions = [
    { value: "🏠", label: "Home" },
    { value: "🏰", label: "Castle" },
    { value: "🏢", label: "Building" },
    { value: "🏡", label: "House" },
    { value: "🏪", label: "Store" },
    { value: "🏖️", label: "Beach" },
    { value: "🏙️", label: "City" },
    { value: "💰", label: "Money" },
    { value: "🌇", label: "Sunset" },
    { value: "🏞️", label: "Park" },
    { value: "🌊", label: "Ocean" },
    { value: "🌳", label: "Tree" },
  ];

  // Color options
  const colorOptions = [
    { value: "#3B82F6", label: "Blue" },
    { value: "#10B981", label: "Green" },
    { value: "#F59E0B", label: "Amber" },
    { value: "#EF4444", label: "Red" },
    { value: "#8B5CF6", label: "Purple" },
    { value: "#EC4899", label: "Pink" },
    { value: "#06B6D4", label: "Cyan" },
    { value: "#F97316", label: "Orange" },
  ];

  // Initialize form data when category changes
  useEffect(() => {
    if (category && type === 'edit') {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        icon: category.icon || "🏠",
        status: category.status || "active",
        featured: category.featured || false,
        color: category.color || "#3B82F6",
        image: category.image || ""
      });
    } else {
      // Reset for create
      setFormData({
        name: "",
        description: "",
        icon: "🏠",
        status: "active",
        featured: false,
        color: "#3B82F6",
        image: ""
      });
    }
  }, [category, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name.trim(),
      description: formData.description.trim()
    };

    onSubmit(submitData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      // In a real app, you would upload to a server
      // Here we'll just create a mock URL
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData(prev => ({ ...prev, image: imageUrl }));
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
                  {type === 'create' ? 'Add New Category' : 'Edit Category'}
                </h2>
                <p className={`mt-1 text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {type === 'create' 
                    ? 'Create a new property category' 
                    : 'Update category information'
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
                {/* Name & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Modern Homes"
                    />
                  </div>
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="Describe this category for users..."
                  />
                </div>

                {/* Icon & Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Icon *
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {iconOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
                            formData.icon === option.value
                              ? "ring-2 ring-amber-500 ring-offset-2"
                              : isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          title={option.label}
                        >
                          {option.value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Color *
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color: option.value }))}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            formData.color === option.value
                              ? "ring-2 ring-amber-500 ring-offset-2"
                              : ""
                          }`}
                          style={{ backgroundColor: option.value }}
                          title={option.label}
                        >
                          {formData.color === option.value && (
                            <span className="text-white">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Category Image (Optional)
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-600 hover:border-amber-500"
                      : "border-gray-300 hover:border-amber-400"
                  }`}>
                    {formData.image ? (
                      <div className="relative group">
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <div 
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${formData.image})` }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}>
                          <FolderIcon size={24} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                        </div>
                        <div>
                          <p className={`font-medium transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-900"
                          }`}>
                            Drop image here or click to upload
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
                            Select Image
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Preview
                  </label>
                  <div className={`rounded-xl p-4 ${
                    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: formData.color }}
                      >
                        {formData.icon}
                      </div>
                      <div>
                        <div className={`font-bold transition-colors duration-500 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {formData.name || "Category Name"}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {formData.description || "Category description will appear here"}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            formData.featured 
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                              : isDarkMode
                                ? "bg-gray-600 text-gray-300"
                                : "bg-gray-200 text-gray-700"
                          }`}>
                            {formData.featured ? "Featured" : "Standard"}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            formData.status === 'active' 
                              ? "bg-green-100 text-green-800"
                              : formData.status === 'pending'
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Featured */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Featured Category
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
                        Mark as featured category
                      </span>
                    </button>
                    {formData.featured && (
                      <span className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-amber-400" : "text-amber-600"
                      }`}>
                        Will be highlighted on the homepage
                      </span>
                    )}
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
                  {type === 'create' ? 'Create Category' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}