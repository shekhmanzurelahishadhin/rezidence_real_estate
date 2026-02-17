// app/(backend)/admin/about/components/AboutModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon, PlusIcon, TrashIcon } from "@/assets/icons";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  aboutData: any;
  isDarkMode: boolean;
  onSubmit: (data: any) => void;
}

export default function AboutModal({
  isOpen,
  onClose,
  aboutData,
  isDarkMode,
  onSubmit
}: AboutModalProps) {
  const [formData, setFormData] = useState({
    hero: {
      title: "",
      subtitle: "",
    },
    story: {
      title: "",
      content: [] as string[],
    },
    mission: "",
    vision: "",
    values: [] as { title: string; description: string }[],
    stats: [] as { value: string; label: string }[],
  });

  const [newStoryParagraph, setNewStoryParagraph] = useState("");
  const [newValue, setNewValue] = useState({ title: "", description: "" });
  const [newStat, setNewStat] = useState({ value: "", label: "" });

  useEffect(() => {
    if (aboutData) {
      setFormData(aboutData);
    }
  }, [aboutData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addStoryParagraph = () => {
    if (newStoryParagraph.trim()) {
      setFormData(prev => ({
        ...prev,
        story: {
          ...prev.story,
          content: [...prev.story.content, newStoryParagraph.trim()]
        }
      }));
      setNewStoryParagraph("");
    }
  };

  const removeStoryParagraph = (index: number) => {
    setFormData(prev => ({
      ...prev,
      story: {
        ...prev.story,
        content: prev.story.content.filter((_, i) => i !== index)
      }
    }));
  };

  const addValue = () => {
    if (newValue.title && newValue.description) {
      setFormData(prev => ({
        ...prev,
        values: [...prev.values, { ...newValue }]
      }));
      setNewValue({ title: "", description: "" });
    }
  };

  const removeValue = (index: number) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const addStat = () => {
    if (newStat.value && newStat.label) {
      setFormData(prev => ({
        ...prev,
        stats: [...prev.stats, { ...newStat }]
      }));
      setNewStat({ value: "", label: "" });
    }
  };

  const removeStat = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
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
                  Edit About Us
                </h2>
                <p className={`mt-1 text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  Update your company information and story
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
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Hero Section
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.hero.title}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, title: e.target.value }
                      }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="Building Dreams, Creating Legacies"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Subtitle *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.hero.subtitle}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: e.target.value }
                      }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="For over 15 years, LuxeProperties has been the trusted name..."
                    />
                  </div>
                </div>
              </div>

              {/* Story Section */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Our Story
                </h3>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Story Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.story.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      story: { ...prev.story, title: e.target.value }
                    }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Our Journey in Real Estate"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Story Paragraphs
                  </label>
                  <div className="flex gap-2 mb-4">
                    <textarea
                      value={newStoryParagraph}
                      onChange={(e) => setNewStoryParagraph(e.target.value)}
                      rows={2}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="Add a paragraph to your story..."
                    />
                    <button
                      type="button"
                      onClick={addStoryParagraph}
                      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.story.content.map((paragraph, index) => (
                      <div
                        key={index}
                        className={`flex items-start justify-between p-3 rounded-lg ${
                          isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                        }`}
                      >
                        <p className={`flex-1 text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          {paragraph}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeStoryParagraph(index)}
                          className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Mission *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.mission}
                    onChange={(e) => setFormData(prev => ({ ...prev, mission: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Our mission statement..."
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.vision}
                    onChange={(e) => setFormData(prev => ({ ...prev, vision: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="Our vision statement..."
                  />
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Core Values
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={newValue.title}
                    onChange={(e) => setNewValue(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Value title"
                    className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    value={newValue.description}
                    onChange={(e) => setNewValue(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Value description"
                    className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={addValue}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <PlusIcon size={16} />
                    Add Value
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {formData.values.map((value, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg flex items-start justify-between ${
                        isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <div>
                        <h4 className={`font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {value.title}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {value.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeValue(index)}
                        className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Key Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={newStat.value}
                    onChange={(e) => setNewStat(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Value (e.g., 15+)"
                    className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    value={newStat.label}
                    onChange={(e) => setNewStat(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="Label (e.g., Years Experience)"
                    className={`px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={addStat}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <PlusIcon size={16} />
                    Add Stat
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg text-center relative group ${
                        isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => removeStat(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XIcon size={12} />
                      </button>
                      <div className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t flex justify-end gap-3">
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}