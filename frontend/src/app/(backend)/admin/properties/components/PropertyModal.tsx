// app/(backend)/admin/properties/components/PropertyModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { XIcon, UploadIcon, MapPinIcon, CheckIcon } from "@/assets/icons";
import { propertyService } from "@/app/(backend)/services/api/propertyService";
import { Property } from "@/app/(backend)/types/property";
import { categoryService } from "@/app/(backend)/services/api/categories";
import { Category } from "@/app/(backend)/types/category";
import toast from "react-hot-toast";

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  property?: Property | null;
  isDarkMode: boolean;
  onSuccess: () => void;
}

interface PropertyFormData {
  title: string;
  description: string;
  category_id: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  parking: string | null;
  features: string[];
  images: (File | string)[];
  featured_image: File | string | null;
  status: 'draft' | 'pending' | 'published' | 'archived';
  featured: boolean;
  latitude: number | null;
  longitude: number | null;
}

interface ImageWithPreview {
  file?: File;
  url: string;
  isExisting: boolean;
  path?: string; // For existing images, store the path for deletion
}

export default function PropertyModal({
  isOpen,
  onClose,
  type,
  property,
  isDarkMode,
  onSuccess
}: PropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredImage, setFeaturedImage] = useState<ImageWithPreview | null>(null);
  const [images, setImages] = useState<ImageWithPreview[]>([]);
  const [currentFeature, setCurrentFeature] = useState("");
  
  // Store blob URLs to revoke later
  const blobUrls = useRef<string[]>([]);
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: {
      title: "",
      description: "",
      category_id: 0,
      address: "",
      city: "",
      state: "",
      zip_code: "",
      price: 0,
      bedrooms: null,
      bathrooms: null,
      size: null,
      parking: "",
      features: [],
      images: [],
      featured_image: null,
      status: "draft",
      featured: false,
      latitude: null,
      longitude: null
    }
  });

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  // Cleanup function for blob URLs
  const cleanupBlobUrls = () => {
    blobUrls.current.forEach(url => {
      URL.revokeObjectURL(url);
    });
    blobUrls.current = [];
  };

  // Create blob URL and track it
  const createBlobUrl = (file: File): string => {
    const url = URL.createObjectURL(file);
    blobUrls.current.push(url);
    return url;
  };

  // Fetch categories for dropdown
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getDropdown();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Initialize form when property changes
  useEffect(() => {
    // Cleanup old blob URLs when modal closes or property changes
    cleanupBlobUrls();
    
    if (property && type === 'edit') {
      console.log('Editing property:', property);
      
      reset({
        title: property.title || "",
        description: property.description || "",
        category_id: property.category_id || 0,
        address: property.address || "",
        city: property.city || "",
        state: property.state || "",
        zip_code: property.zip_code || "",
        price: Number(property.price) || 0,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        size: property.size,
        parking: property.parking,
        features: property.features || [],
        images: [],
        featured_image: null,
        status: property.status || "draft",
        featured: property.featured || false,
        latitude: property.latitude,
        longitude: property.longitude
      });
      
      // Set featured image
      if (property.featured_image) {
        const featuredImageUrl = `${baseUrl}/storage/${property.featured_image}`;
        setFeaturedImage({
          url: featuredImageUrl,
          isExisting: true,
          path: property.featured_image
        });
      }
      
      // Set additional images
      if (property.images && property.images.length > 0) {
        const existingImages = property.images.map((imagePath: string) => ({
          url: `${baseUrl}/storage/${imagePath}`,
          isExisting: true,
          path: imagePath
        }));
        setImages(existingImages);
      }
    } else {
      reset({
        title: "",
        description: "",
        category_id: 0,
        address: "",
        city: "",
        state: "",
        zip_code: "",
        price: 0,
        bedrooms: null,
        bathrooms: null,
        size: null,
        parking: "",
        features: [],
        images: [],
        featured_image: null,
        status: "draft",
        featured: false,
        latitude: null,
        longitude: null
      });
      setFeaturedImage(null);
      setImages([]);
    }
    
    return () => {
      cleanupBlobUrls();
    };
  }, [property, type, reset, baseUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupBlobUrls();
    };
  }, []);

  if (!isOpen) return null;

  const onSubmit = async (data: PropertyFormData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
      // Append all fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category_id', data.category_id.toString());
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('zip_code', data.zip_code);
      formData.append('price', data.price.toString());
      
      if (data.bedrooms) formData.append('bedrooms', data.bedrooms.toString());
      if (data.bathrooms) formData.append('bathrooms', data.bathrooms.toString());
      if (data.size) formData.append('size', data.size.toString());
      if (data.parking) formData.append('parking', data.parking);
      
      // Handle features - send as individual fields
      if (data.features && data.features.length > 0) {
        data.features.forEach((feature) => {
          formData.append('features[]', feature);
        });
      }
      
      if (data.latitude) formData.append('latitude', data.latitude.toString());
      if (data.longitude) formData.append('longitude', data.longitude.toString());
      
      formData.append('status', data.status);
      formData.append('featured', data.featured ? '1' : '0');
      
      // Append featured image if it's a new File
      if (featuredImage?.file) {
        formData.append('featured_image', featuredImage.file);
      }
      
      // Append new images only
      images.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}]`, image.file);
        }
      });

      // For update requests, add method spoofing
      if (type === 'edit' && property) {
        formData.append('_method', 'PUT');
      }

      // Log FormData for debugging
      console.log('📦 Property FormData:');
      for (let pair of (formData as any).entries()) {
        console.log(`  ${pair[0]}: ${pair[1] instanceof File ? pair[1].name : pair[1]}`);
      }

      let response;
      
      if (type === 'create') {
        response = await propertyService.createProperty(formData);
      } else if (property) {
        response = await propertyService.updateProperty(property.id, formData);
      }
      
      console.log('✅ Server response:', response);
      
      if (response?.success) {
        toast.success(type === 'create' ? 'Property created successfully' : 'Property updated successfully');
        // Cleanup blob URLs before closing
        cleanupBlobUrls();
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

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      const currentFeatures = watch('features') || [];
      setValue('features', [...currentFeatures, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const currentFeatures = watch('features') || [];
    setValue('features', currentFeatures.filter((_, i) => i !== index));
  };

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      
      // Clean up old featured image blob if it exists
      if (featuredImage?.url.startsWith('blob:')) {
        URL.revokeObjectURL(featuredImage.url);
        // Remove from blobUrls tracking
        blobUrls.current = blobUrls.current.filter(url => url !== featuredImage.url);
      }
      
      const previewUrl = createBlobUrl(file);
      setFeaturedImage({
        file,
        url: previewUrl,
        isExisting: false
      });
    }
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: ImageWithPreview[] = [];
      
      Array.from(files).forEach(file => {
        const previewUrl = createBlobUrl(file);
        newImages.push({
          file,
          url: previewUrl,
          isExisting: false
        });
      });
      
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveFeaturedImage = async () => {
    if (featuredImage?.isExisting && property && type === 'edit' && featuredImage.path) {
      try {
        await propertyService.removeImage(property.id, featuredImage.path);
        toast.success('Featured image removed');
      } catch (error) {
        toast.error('Failed to remove featured image');
        return;
      }
    }
    
    if (featuredImage?.url.startsWith('blob:')) {
      URL.revokeObjectURL(featuredImage.url);
      blobUrls.current = blobUrls.current.filter(url => url !== featuredImage.url);
    }
    setFeaturedImage(null);
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];
    
    // If it's a blob URL, revoke it
    if (imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
      blobUrls.current = blobUrls.current.filter(url => url !== imageToRemove.url);
    }
    
    // If it's an existing image from server and we're in edit mode
    if (imageToRemove.isExisting && property && type === 'edit' && imageToRemove.path) {
      try {
        await propertyService.removeImage(property.id, imageToRemove.path);
        toast.success('Image removed');
      } catch (error) {
        toast.error('Failed to remove image');
        return;
      }
    }
    
    // Remove from state
    setImages(prev => prev.filter((_, i) => i !== index));
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
                  {type === 'create' ? 'Add New Property' : 'Edit Property'}
                </h2>
                <p className={`mt-1 text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {type === 'create' 
                    ? 'Fill in the details to create a new property listing' 
                    : 'Update the property information'
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
              id="property-form" 
              onSubmit={handleSubmit(onSubmit)} 
              encType="multipart/form-data"
              className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Title & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Property Title *
                    </label>
                    <input
                      type="text"
                      {...register("title", { 
                        required: "Property title is required",
                        minLength: {
                          value: 5,
                          message: "Title must be at least 5 characters"
                        }
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Modern Luxury Villa"
                      disabled={loading}
                    />
                    {errors.title && (
                      <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Category *
                    </label>
                    <select
                      {...register("category_id", { 
                        required: "Category is required",
                        validate: value => value > 0 || "Please select a category"
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      disabled={loading}
                    >
                      <option value="0">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && (
                      <p className="mt-1 text-xs text-red-500">{errors.category_id.message}</p>
                    )}
                  </div>
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Street Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                      </div>
                      <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                        }`}
                        placeholder="123 Main St"
                        disabled={loading}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      City *
                    </label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="Los Angeles"
                      disabled={loading}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      State *
                    </label>
                    <input
                      type="text"
                      {...register("state", { required: "State is required" })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="CA"
                      disabled={loading}
                    />
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      {...register("zip_code", { required: "Zip code is required" })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="90210"
                      disabled={loading}
                    />
                    {errors.zip_code && (
                      <p className="mt-1 text-xs text-red-500">{errors.zip_code.message}</p>
                    )}
                  </div>
                </div>

                {/* Price & Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      {...register("price", { 
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="500000"
                      disabled={loading}
                    />
                    {errors.price && (
                      <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      {...register("bedrooms")}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="3"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      {...register("bathrooms")}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="2.5"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Size (sq ft)
                    </label>
                    <input
                      type="number"
                      min="0"
                      {...register("size")}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="2500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Parking */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Parking
                  </label>
                  <input
                    type="text"
                    {...register("parking")}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="2 Car Garage"
                    disabled={loading}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    {...register("description", { 
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message: "Description must be at least 20 characters"
                      }
                    })}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="Describe the property features, location, amenities..."
                    disabled={loading}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Features */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Features & Amenities
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="e.g., Swimming Pool, Garden, Gym"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watch('features')?.map((feature, index) => (
                      <div
                        key={index}
                        className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className={`p-0.5 rounded-full hover:bg-gray-600 transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <XIcon size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Featured Image {type === 'create' ? '' : '(Optional)'}
                  </label>
                  <div>
                    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-600 hover:border-amber-500"
                        : "border-gray-300 hover:border-amber-400"
                    }`}>
                      {featuredImage ? (
                        <div className="relative group">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img 
                              src={featuredImage.url} 
                              alt="Featured Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {featuredImage.isExisting && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                              Current
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={handleRemoveFeaturedImage}
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
                            <UploadIcon size={24} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                          </div>
                          <div>
                            <p className={`font-medium transition-colors duration-500 ${
                              isDarkMode ? "text-gray-300" : "text-gray-900"
                            }`}>
                              Click to upload featured image
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
                              onChange={handleFeaturedImageUpload}
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
                  </div>
                </div>

                {/* Multiple Images Upload */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Additional Images
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-600 hover:border-amber-500"
                      : "border-gray-300 hover:border-amber-400"
                  }`}>
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}>
                        <UploadIcon size={24} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                      </div>
                      <div>
                        <p className={`font-medium transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-900"
                        }`}>
                          Drop images here or click to upload
                        </p>
                        <p className={`text-sm mt-1 transition-colors duration-500 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/jpg,image/gif"
                          onChange={handleImagesUpload}
                          className="hidden"
                          disabled={loading}
                        />
                        <div className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                          Select Images
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          {type === 'edit' ? 'Current Images' : 'Uploaded Images'} ({images.length})
                        </span>
                        {type === 'edit' && (
                          <span className="text-xs text-amber-500">
                            {images.filter(img => img.isExisting).length} existing, {images.filter(img => !img.isExisting).length} new
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <img 
                                src={img.url} 
                                alt={`Property ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {img.isExisting && (
                              <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                                Existing
                              </div>
                            )}
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs rounded">
                                Main
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                              title="Remove image"
                            >
                              <XIcon size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                      {...register("status")}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      disabled={loading}
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
                      Featured Property
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
                              Mark as featured property
                            </span>
                          </button>
                        </div>
                      )}
                    />
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
                  {type === 'create' ? 'Create Property' : 'Update Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}