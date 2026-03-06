// app/(backend)/admin/categories/components/CategoryModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { XIcon, FolderIcon, CheckIcon } from "@/assets/icons";
import { categoryService } from "@/app/(backend)/services/api/categories";
import { Category } from "@/app/(backend)/types/category";
import toast from "react-hot-toast";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  category?: Category | null;
  isDarkMode: boolean;
  onSuccess: () => void;
}

interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive' | 'pending' | 'archived';
  featured: boolean;
  color: string;
  image?: File | string | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  type,
  category,
  isDarkMode,
  onSuccess
}: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      description: "",
      icon: "🏠",
      status: "active",
      featured: false,
      color: "#3B82F6",
      image: null
    }
  });

  // Watch the image field
  const imageFile = watch('image');
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/storage/';

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

  // Initialize form when category changes
  useEffect(() => {
    if (category && type === 'edit') {
      reset({
        name: category.name || "",
        description: category.description || "",
        icon: category.icon || "🏠",
        status: category.status || "active",
        featured: category.featured || false,
        color: category.color || "#3B82F6",
        image: null // Don't set the image here, we'll show preview separately
      });
      if (category.image_url) {
        setImagePreview(category.image_url);
      }
    } else {
      reset({
        name: "",
        description: "",
        icon: "🏠",
        status: "active",
        featured: false,
        color: "#3B82F6",
        image: null
      });
      setImagePreview(null);
    }
  }, [category, type, reset]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  // In your CategoryModal component, update the onSubmit function:

const onSubmit = async (data: CategoryFormData) => {
  try {
    setLoading(true);
    
    const formData = new FormData();
    
    // Append all fields
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('icon', data.icon);
    formData.append('status', data.status);
    formData.append('featured', data.featured ? '1' : '0');
    formData.append('color', data.color);
    
    // Append image if it's a File (new upload)
    if (data.image instanceof File) {
      formData.append('image', data.image);
      console.log('📸 Appending image file:', data.image.name);
    }
    
    // Log FormData contents for debugging
    console.log('📦 FormData contents:');
    for (let pair of (formData as any).entries()) {
      console.log(`  ${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
    }

    let response;
    
    if (type === 'create') {
      response = await categoryService.createCategory(formData);
    } else if (category) {
      response = await categoryService.updateCategory(category.id, formData);
    }
    
    console.log('✅ Server response:', response);
    
    if (response?.success) {
      toast.success(type === 'create' ? 'Category created successfully' : 'Category updated successfully');
      onSuccess();
      onClose();
    } else {
      toast.error(response?.message || 'Operation failed');
      if (response?.errors) {
        console.error('❌ Validation errors:', response.errors);
        Object.entries(response.errors).forEach(([field, messages]) => {
          toast.error(`${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`);
        });
      }
    }
  } catch (error: any) {
    console.error('❌ Submission error:', error);
    toast.error(error.message || 'An error occurred');
  } finally {
    setLoading(false);
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
                type="button"
                onClick={onClose}
                className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Form */}
            <form 
              id="category-form" 
              onSubmit={handleSubmit(onSubmit)} 
              encType="multipart/form-data"
              className="p-6"
            >
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
                      {...register("name", { 
                        required: "Category name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Modern Homes"
                      disabled={loading}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Status *
                    </label>
                    <select
                      {...register("status", { required: "Status is required" })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      disabled={loading}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="archived">Archived</option>
                    </select>
                    {errors.status && (
                      <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    {...register("description")}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="Describe this category for users..."
                    disabled={loading}
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
                    <Controller
                      name="icon"
                      control={control}
                      rules={{ required: "Icon is required" }}
                      render={({ field }) => (
                        <div>
                          <div className="grid grid-cols-6 gap-2">
                            {iconOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => field.onChange(option.value)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
                                  field.value === option.value
                                    ? "ring-2 ring-amber-500 ring-offset-2"
                                    : isDarkMode
                                      ? "bg-gray-700 hover:bg-gray-600"
                                      : "bg-gray-100 hover:bg-gray-200"
                                }`}
                                title={option.label}
                                disabled={loading}
                              >
                                {option.value}
                              </button>
                            ))}
                          </div>
                          {errors.icon && (
                            <p className="mt-1 text-xs text-red-500">{errors.icon.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Color *
                    </label>
                    <Controller
                      name="color"
                      control={control}
                      rules={{ required: "Color is required" }}
                      render={({ field }) => (
                        <div>
                          <div className="grid grid-cols-4 gap-2">
                            {colorOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => field.onChange(option.value)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  field.value === option.value
                                    ? "ring-2 ring-amber-500 ring-offset-2"
                                    : ""
                                }`}
                                style={{ backgroundColor: option.value }}
                                title={option.label}
                                disabled={loading}
                              >
                                {field.value === option.value && (
                                  <span className="text-white">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                          {errors.color && (
                            <p className="mt-1 text-xs text-red-500">{errors.color.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Category Image {type === 'create' ? '' : '(Optional)'}
                  </label>
                  <Controller
                    name="image"
                    control={control}
                    rules={{
                      required: type === 'create' ? "Image is required" : false,
                      validate: {
                        fileSize: (file) => {
                          if (!file || !(file instanceof File)) return true;
                          return file.size <= 2 * 1024 * 1024 || "Max file size is 2MB";
                        },
                        fileType: (file) => {
                          if (!file || !(file instanceof File)) return true;
                          return ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type) ||
                            "Only JPG, PNG or GIF images are allowed";
                        },
                      }
                    }}
                    render={({ field }) => (
                      <div>
                        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                          isDarkMode
                            ? "border-gray-600 hover:border-amber-500"
                            : "border-gray-300 hover:border-amber-400"
                        }`}>
                          {/* Show image preview */}
                          {(imagePreview || (field.value instanceof File)) ? (
                            <div className="relative group">
                              <div className="aspect-video rounded-lg overflow-hidden">
                                <img 
                                  src={
                                    field.value instanceof File 
                                      ? URL.createObjectURL(field.value)
                                      : imagePreview || ''
                                  } 
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(null);
                                  setImagePreview(null);
                                }}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                                disabled={loading}
                              >
                                <XIcon size={16} />
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
                                  PNG, JPG up to 2MB
                                </p>
                              </div>
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/jpg,image/gif"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      field.onChange(file);
                                      // Clean up old preview if it was a blob
                                      if (imagePreview?.startsWith('blob:')) {
                                        URL.revokeObjectURL(imagePreview);
                                      }
                                      setImagePreview(URL.createObjectURL(file));
                                    }
                                  }}
                                  className="hidden"
                                  disabled={loading}
                                />
                                <div className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                  Select Image
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        {errors.image && (
                          <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
                        )}
                      </div>
                    )}
                  />
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
                        style={{ backgroundColor: watch('color') }}
                      >
                        {watch('icon')}
                      </div>
                      <div>
                        <div className={`font-bold transition-colors duration-500 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {watch('name') || "Category Name"}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {watch('description') || "Category description will appear here"}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            watch('featured') 
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                              : isDarkMode
                                ? "bg-gray-600 text-gray-300"
                                : "bg-gray-200 text-gray-700"
                          }`}>
                            {watch('featured') ? "Featured" : "Standard"}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            watch('status') === 'active' 
                              ? "bg-green-100 text-green-800"
                              : watch('status') === 'pending'
                              ? "bg-yellow-100 text-yellow-800"
                              : watch('status') === 'archived'
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {watch('status')?.charAt(0).toUpperCase() + watch('status')?.slice(1)}
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
                  <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                            field.value
                              ? "border-amber-500 bg-amber-500/10"
                              : isDarkMode
                                ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
                                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                          }`}
                          disabled={loading}
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-300 ${
                            field.value
                              ? "bg-amber-500 border-amber-500"
                              : isDarkMode
                                ? "bg-gray-700 border-gray-600"
                                : "bg-white border-gray-300"
                          }`}>
                            {field.value && (
                              <CheckIcon size={12} className="text-white" />
                            )}
                          </div>
                          <span className={`font-medium transition-colors duration-500 ${
                            field.value
                              ? "text-amber-500"
                              : isDarkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                          }`}>
                            Mark as featured category
                          </span>
                        </button>
                        {field.value && (
                          <span className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? "text-amber-400" : "text-amber-600"
                          }`}>
                            Will be highlighted on the homepage
                          </span>
                        )}
                      </div>
                    )}
                  />
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
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
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