// app/(backend)/admin/team/components/TeamMemberModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon, UploadIcon, PlusIcon, TrashIcon } from "@/assets/icons";

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: any;
  isDarkMode: boolean;
  onSubmit: (data: any) => void;
}

export default function TeamMemberModal({
  isOpen,
  onClose,
  member,
  isDarkMode,
  onSubmit
}: TeamMemberModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    bio: "",
    experience: 0,
    specialties: [] as string[],
    email: "",
    phone: "",
    image: "",
    social: {
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: ""
    },
    active: true,
    order: 0
  });

  const [newSpecialty, setNewSpecialty] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const departments = [
    "Executive Leadership",
    "Sales",
    "Marketing",
    "Operations",
    "Legal",
    "Customer Service",
    "Property Management",
    "Investment"
  ];

  useEffect(() => {
    if (member) {
      setFormData(member);
      setUploadedImage(member.image);
    } else {
      setFormData({
        name: "",
        role: "",
        department: "",
        bio: "",
        experience: 0,
        specialties: [],
        email: "",
        phone: "",
        image: "",
        social: {
          linkedin: "",
          twitter: "",
          instagram: "",
          facebook: ""
        },
        active: true,
        order: 0
      });
      setUploadedImage("");
    }
  }, [member]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: uploadedImage,
      experience: Number(formData.experience)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setUploadedImage(imageUrl);
    }
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={`relative w-full max-w-3xl rounded-2xl shadow-xl ${
            isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {member ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <p className={`mt-1 text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {member ? 'Update team member information' : 'Add a new team member'}
                </p>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700/50">
                <XIcon size={20} className={isDarkMode ? "text-gray-400" : "text-gray-600"} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <label className={`flex-1 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center hover:border-amber-500 ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700/50"
                      : "border-gray-300 bg-gray-50"
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <UploadIcon size={24} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                    <span className={`block text-sm mt-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {uploadedImage ? 'Change image' : 'Upload image'}
                    </span>
                  </label>
                  {uploadedImage && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedImage("")}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                      >
                        <XIcon size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Role/Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="CEO & Founder"
                  />
                </div>
              </div>

              {/* Department & Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Department *
                  </label>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Years Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="15"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Bio *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Brief description about the team member..."
                />
              </div>

              {/* Specialties */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Specialties
                </label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                    className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Add a specialty (e.g., Luxury Properties)"
                  />
                  <button
                    type="button"
                    onClick={addSpecialty}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                        isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span>{specialty}</span>
                      <button
                        type="button"
                        onClick={() => removeSpecialty(index)}
                        className="p-0.5 hover:text-red-500"
                      >
                        <XIcon size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Social Media Links
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.social.linkedin}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value }
                      }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={formData.social.twitter}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value }
                      }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={formData.social.instagram}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value }
                      }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={formData.social.facebook}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, facebook: e.target.value }
                      }))}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } peer-checked:bg-amber-500`}>
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all peer-checked:translate-x-5" />
                  </div>
                </label>
                <div>
                  <span className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Active
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Show on website
                  </span>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-2.5 rounded-lg font-medium ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
                >
                  {member ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}