// app/(backend)/admin/testimonials/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/ThemeProvider";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
  MoreVerticalIcon,
  DownloadIcon,
  RefreshIcon,
  CheckIcon,
  XIcon,
  StarIcon,
} from "@/assets/icons";
import TestimonialModal from "./components/TestimonialModal";
import { mockTestimonials } from "./data";

export default function TestimonialsPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // Filter and search testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      testimonial.status.toLowerCase() === filter.toLowerCase() ||
      (filter === "featured" && testimonial.featured) ||
      (filter === "rating-5" && testimonial.rating === 5) ||
      (filter === "rating-4" && testimonial.rating === 4);

    return matchesSearch && matchesFilter;
  });

  // Sort testimonials
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    switch (sortBy) {
      case "rating_high":
        return b.rating - a.rating;
      case "rating_low":
        return a.rating - b.rating;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  // Handle create testimonial
  const handleCreate = () => {
    setModalType("create");
    setSelectedTestimonial(null);
    setShowModal(true);
  };

  // Handle edit testimonial
  const handleEdit = (testimonial: any) => {
    setModalType("edit");
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  // Handle delete testimonial
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} testimonials?`,
      )
    ) {
      setTestimonials((prev) => prev.filter((t) => !selectedRows.includes(t.id)));
      setSelectedRows([]);
    }
  };

  // Handle status change
  const handleStatusChange = (id: number, status: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    );
  };

  // Handle featured toggle
  const handleToggleFeatured = (id: number) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t)),
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      archived: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[status.toLowerCase()] || colors.draft;
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            size={14}
            className={star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className={`text-2xl font-bold transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Testimonials Management
          </h1>
          <p
            className={`mt-1 transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Manage client testimonials, create new testimonials, and control visibility
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
              >
                <TrashIcon size={16} />
                Delete ({selectedRows.length})
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2"
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
          >
            <PlusIcon size={16} />
            Add New Testimonial
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Testimonials",
            value: testimonials.length,
            color: "blue",
            change: "+8%",
          },
          {
            title: "Published",
            value: testimonials.filter((t) => t.status === "published").length,
            color: "green",
            change: "+5%",
          },
          {
            title: "Featured",
            value: testimonials.filter((t) => t.featured).length,
            color: "purple",
            change: "+12%",
          },
          {
            title: "5-Star Reviews",
            value: testimonials.filter((t) => t.rating === 5).length,
            color: "yellow",
            change: "+15%",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className={`rounded-xl p-6 transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stat.title}
              </h3>
              <div
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  stat.change.startsWith("+")
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {stat.change}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <div
                  className={`h-1.5 w-24 rounded-full overflow-hidden ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`h-full ${
                      stat.color === "blue"
                        ? "bg-blue-500"
                        : stat.color === "green"
                          ? "bg-green-500"
                          : stat.color === "purple"
                            ? "bg-purple-500"
                            : "bg-yellow-500"
                    }`}
                    style={{ width: `${(stat.value / testimonials.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div
        className={`rounded-xl p-6 mb-6 transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                size={18}
                className={isDarkMode ? "text-gray-500" : "text-gray-400"}
              />
            </div>
            <input
              type="search"
              placeholder="Search testimonials by name, role, or quote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
              }`}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-amber-500"
              }`}
            >
              <option value="all">All Testimonials</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
              <option value="featured">Featured</option>
              <option value="rating-5">5 Star Only</option>
              <option value="rating-4">4 Star Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-amber-500"
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating_high">Rating: High to Low</option>
              <option value="rating_low">Rating: Low to High</option>
            </select>

            <button
              className={`px-4 py-2.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2 ${
                isDarkMode
                  ? "border-gray-600 text-gray-300"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              <FilterIcon size={16} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Table */}
      <div
        className={`rounded-xl overflow-hidden border transition-all duration-500 ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* Table Header */}
        <div
          className={`px-6 py-4 border-b transition-colors duration-500 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-100 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={
                  selectedRows.length === testimonials.length &&
                  testimonials.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(testimonials.map((t) => t.id));
                  } else {
                    setSelectedRows([]);
                  }
                }}
                className={`rounded border transition-colors duration-300 ${
                  isDarkMode
                    ? "border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500/20"
                    : "border-gray-300 text-amber-600 focus:ring-amber-500"
                }`}
              />
              <span
                className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {selectedRows.length > 0
                  ? `${selectedRows.length} selected`
                  : `${testimonials.length} testimonials`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <RefreshIcon size={18} />
              </button>
              <button
                className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <DownloadIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b transition-colors duration-500 ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === testimonials.length &&
                      testimonials.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(testimonials.map((t) => t.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                    className={`rounded border transition-colors duration-300 ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500/20"
                        : "border-gray-300 text-amber-600 focus:ring-amber-500"
                    }`}
                  />
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Client
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Rating
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Quote Preview
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Status
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTestimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className={`border-b transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(testimonial.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows((prev) => [...prev, testimonial.id]);
                        } else {
                          setSelectedRows((prev) =>
                            prev.filter((id) => id !== testimonial.id),
                          );
                        }
                      }}
                      className={`rounded border transition-colors duration-300 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-amber-500 hover:border-amber-500 focus:ring-amber-500/20"
                          : "border-gray-300 text-amber-600 hover:border-amber-500 focus:ring-amber-500"
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${testimonial.image})` }}
                        />
                      </div>
                      <div>
                        <div
                          className={`font-medium transition-colors duration-500 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {testimonial.author}
                        </div>
                        <div
                          className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {testimonial.role}
                        </div>
                      </div>
                      {testimonial.featured && (
                        <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {renderStars(testimonial.rating)}
                      <span
                        className={`text-xs transition-colors duration-500 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {testimonial.rating}.0
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm line-clamp-2 max-w-xs transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      "{testimonial.quote}"
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={testimonial.status}
                        onChange={(e) =>
                          handleStatusChange(testimonial.id, e.target.value)
                        }
                        className={`text-xs px-2 py-1 rounded border transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white hover:border-amber-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 hover:border-amber-500"
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className={`p-1.5 rounded-lg transition-colors duration-300 ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300 hover:bg-gray-600"
                            : "text-blue-600 hover:text-blue-700 hover:bg-gray-100"
                        }`}
                        title="Edit"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className={`p-1.5 rounded-lg transition-colors duration-300 ${
                          isDarkMode
                            ? "text-red-400 hover:text-red-300 hover:bg-gray-600"
                            : "text-red-600 hover:text-red-700 hover:bg-gray-100"
                        }`}
                        title="Delete"
                      >
                        <TrashIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(testimonial.id)}
                        className={`p-1.5 rounded-lg transition-colors duration-300 ${
                          testimonial.featured
                            ? isDarkMode
                              ? "text-amber-400 hover:text-amber-300 hover:bg-gray-600"
                              : "text-amber-500 hover:text-amber-600 hover:bg-gray-100"
                            : isDarkMode
                              ? "text-gray-400 hover:text-gray-300 hover:bg-gray-600"
                              : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                        title={
                          testimonial.featured
                            ? "Remove featured"
                            : "Make featured"
                        }
                      >
                        <StarIcon
                          size={16}
                          className={testimonial.featured ? "fill-current" : ""}
                        />
                      </button>
                      <button
                        className={`p-1.5 rounded-lg transition-colors duration-300 ${
                          isDarkMode
                            ? "text-gray-400 hover:text-gray-300 hover:bg-gray-600"
                            : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <MoreVerticalIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div
          className={`px-6 py-4 border-t transition-colors duration-500 ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-100 bg-gray-50"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div
              className={`text-sm transition-colors duration-500 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Showing {sortedTestimonials.length} of {testimonials.length} testimonials
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded transition-colors duration-300 ${
                    page === 1
                      ? "bg-amber-500 text-white"
                      : isDarkMode
                        ? "text-gray-400 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                className={`px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Modal */}
      <TestimonialModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        testimonial={selectedTestimonial}
        isDarkMode={isDarkMode}
        onSubmit={(data) => {
          if (modalType === "create") {
            // Add new testimonial
            setTestimonials((prev) => [
              {
                ...data,
                id: Math.max(...prev.map((t) => t.id)) + 1,
                createdAt: new Date().toISOString(),
              },
              ...prev,
            ]);
          } else {
            // Update existing testimonial
            setTestimonials((prev) =>
              prev.map((t) =>
                t.id === selectedTestimonial.id ? { ...t, ...data } : t,
              ),
            );
          }
          setShowModal(false);
        }}
      />
    </div>
  );
}