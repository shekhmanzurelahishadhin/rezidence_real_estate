// app/(backend)/admin/properties/page.tsx
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
import PropertyModal from "./components/PropertyModal";
import { mockProperties } from "./data";

export default function PropertiesPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [properties, setProperties] = useState(mockProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // Filter and search properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      property.status.toLowerCase() === filter.toLowerCase() ||
      (filter === "featured" && property.featured);

    return matchesSearch && matchesFilter;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price_high":
        return b.price - a.price;
      case "price_low":
        return a.price - b.price;
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

  // Handle create property
  const handleCreate = () => {
    setModalType("create");
    setSelectedProperty(null);
    setShowModal(true);
  };

  // Handle edit property
  const handleEdit = (property: any) => {
    setModalType("edit");
    setSelectedProperty(property);
    setShowModal(true);
  };

  // Handle delete property
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} properties?`,
      )
    ) {
      setProperties((prev) => prev.filter((p) => !selectedRows.includes(p.id)));
      setSelectedRows([]);
    }
  };

  // Handle status change
  const handleStatusChange = (id: number, status: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
  };

  // Handle featured toggle
  const handleToggleFeatured = (id: number) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      published: "bg-green-100 text-green-800",
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      archived: "bg-red-100 text-red-800",
    };
    return colors[status.toLowerCase()] || colors.draft;
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
            Properties Management
          </h1>
          <p
            className={`mt-1 transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Manage your property listings, create new listings, and track
            performance
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
            Add New Property
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Properties",
            value: properties.length,
            color: "blue",
            change: "+12%",
          },
          {
            title: "Published",
            value: properties.filter((p) => p.status === "published").length,
            color: "green",
            change: "+5%",
          },
          {
            title: "Featured",
            value: properties.filter((p) => p.featured).length,
            color: "purple",
            change: "+8%",
          },
          {
            title: "Pending Review",
            value: properties.filter((p) => p.status === "pending").length,
            color: "yellow",
            change: "-3%",
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
                    style={{ width: "75%" }}
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
              placeholder="Search properties..."
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
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
              <option value="featured">Featured</option>
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
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
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

      {/* Properties Table */}
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
                  selectedRows.length === properties.length &&
                  properties.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(properties.map((p) => p.id));
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
                  : `${properties.length} properties`}
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
                      selectedRows.length === properties.length &&
                      properties.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(properties.map((p) => p.id));
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
                  Property
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
                  Price
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Views
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
              {sortedProperties.map((property) => (
                <tr
                  key={property.id}
                  className={`border-b transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-800" // Custom gray level for better contrast
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {/* Add this custom CSS to your globals.css */}
                  <style jsx global>{`
                    .dark .bg-gray-750 {
                      background-color: #2d3748; /* Slightly lighter than gray-800 */
                    }
                  `}</style>

                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(property.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows((prev) => [...prev, property.id]);
                        } else {
                          setSelectedRows((prev) =>
                            prev.filter((id) => id !== property.id),
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
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${property.image})` }}
                        />
                      </div>
                      <div>
                        <div
                          className={`font-medium transition-colors duration-500 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {property.title}
                        </div>
                        <div
                          className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {property.category}
                        </div>
                      </div>
                      {property.featured && (
                        <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={property.status}
                        onChange={(e) =>
                          handleStatusChange(property.id, e.target.value)
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
                      className={`font-bold transition-colors duration-500 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ${property.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <EyeIcon
                        size={14}
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }
                      />
                      <span
                        className={`font-medium transition-colors duration-500 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {property.views.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {new Date(property.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(property)}
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
                        onClick={() => handleDelete(property.id)}
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
                        onClick={() => handleToggleFeatured(property.id)}
                        className={`p-1.5 rounded-lg transition-colors duration-300 ${
                          property.featured
                            ? isDarkMode
                              ? "text-amber-400 hover:text-amber-300 hover:bg-gray-600"
                              : "text-amber-500 hover:text-amber-600 hover:bg-gray-100"
                            : isDarkMode
                              ? "text-gray-400 hover:text-gray-300 hover:bg-gray-600"
                              : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                        title={
                          property.featured
                            ? "Remove featured"
                            : "Make featured"
                        }
                      >
                        <StarIcon
                          size={16}
                          className={property.featured ? "fill-current" : ""}
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
              Showing {sortedProperties.length} of {properties.length}{" "}
              properties
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

      {/* Property Modal */}
      <PropertyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        property={selectedProperty}
        isDarkMode={isDarkMode}
        onSubmit={(data) => {
          if (modalType === "create") {
            // Add new property
            setProperties((prev) => [
              {
                ...data,
                id: Math.max(...prev.map((p) => p.id)) + 1,
                createdAt: new Date().toISOString(),
                views: 0,
              },
              ...prev,
            ]);
          } else {
            // Update existing property
            setProperties((prev) =>
              prev.map((p) =>
                p.id === selectedProperty.id ? { ...p, ...data } : p,
              ),
            );
          }
          setShowModal(false);
        }}
      />
    </div>
  );
}
