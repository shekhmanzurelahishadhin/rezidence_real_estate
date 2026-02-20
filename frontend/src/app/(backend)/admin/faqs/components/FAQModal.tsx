// app/(backend)/admin/faqs/components/FAQModal.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon, CheckIcon } from "@/assets/icons";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'create' | 'edit';
  faq?: any;
  isDarkMode: boolean;
  onSubmit: (data: any) => void;
}

export default function FAQModal({
  isOpen,
  onClose,
  type,
  faq,
  isDarkMode,
  onSubmit
}: FAQModalProps) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    status: "draft",
    order: 1,
  });

  // Initialize form data when faq changes
  useEffect(() => {
    if (faq && type === 'edit') {
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category || "General",
        status: faq.status || "draft",
        order: faq.order || 1,
      });
    } else {
      // Reset for create
      setFormData({
        question: "",
        answer: "",
        category: "General",
        status: "draft",
        order: 1,
      });
    }
  }, [faq, type]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      order: Number(formData.order)
    };

    onSubmit(submitData);
  };

  const categories = [
    "Buying",
    "Selling", 
    "Process",
    "General",
    "Investing",
    "Legal",
    "Financing"
  ];

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
                  {type === 'create' ? 'Add New FAQ' : 'Edit FAQ'}
                </h2>
                <p className={`mt-1 text-sm transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {type === 'create' 
                    ? 'Create a new frequently asked question' 
                    : 'Update the FAQ information'
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
                {/* Question */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Question *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="How do I start the home buying process?"
                  />
                </div>

                {/* Answer */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Answer *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.answer}
                    onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="The home buying process typically starts with getting pre-approved for a mortgage..."
                  />
                </div>

                {/* Category & Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                      className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                      }`}
                      placeholder="1"
                    />
                    <p className={`mt-1 text-xs transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      Lower numbers appear first
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['draft', 'pending', 'published', 'archived'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, status }))}
                        className={`px-4 py-2.5 rounded-lg border capitalize transition-all duration-300 ${
                          formData.status === status
                            ? status === 'published'
                              ? 'border-green-500 bg-green-500/10 text-green-500'
                              : status === 'pending'
                                ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500'
                                : status === 'draft'
                                  ? 'border-gray-500 bg-gray-500/10 text-gray-500'
                                  : 'border-red-500 bg-red-500/10 text-red-500'
                            : isDarkMode
                              ? 'border-gray-600 text-gray-400 hover:bg-gray-700'
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className={`rounded-xl p-6 border transition-all duration-500 ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <h3 className={`text-sm font-medium mb-4 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Preview
                  </h3>
                  <div className={`p-4 rounded-lg transition-colors duration-500 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">Q</span>
                      </div>
                      <div>
                        <p className={`font-medium mb-2 transition-colors duration-500 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {formData.question || "Your question will appear here"}
                        </p>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-amber-500 text-xs font-bold">A</span>
                          </div>
                          <p className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}>
                            {formData.answer || "Your answer will appear here"}
                          </p>
                        </div>
                      </div>
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
                  {type === 'create' ? 'Create FAQ' : 'Update FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}