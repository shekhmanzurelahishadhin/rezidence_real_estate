// app/(backend)/admin/categories/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/app/ThemeProvider";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  MoreVerticalIcon,
  DownloadIcon,
  RefreshIcon,
  EyeIcon,
  StarIcon,
} from "@/assets/icons";
import CategoryModal from "./components/CategoryModal";
import { categoryService } from "@/app/(backend)/services/api/categories";
import { Category, CategoryStats } from "@/app/(backend)/types/category";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";

export default function CategoriesPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CategoryStats>({
    total: 0,
    active: 0,
    featured: 0,
    pending: 0,
    total_properties: 0
  });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories({
        search: searchTerm || undefined,
        status: filter !== 'all' ? filter : undefined,
        sort_by: sortBy,
        page: currentPage,
        per_page: perPage
      });
      
      setCategories(response.data.data);
      setTotalItems(response.data.meta.total);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filter, sortBy, currentPage, perPage]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await categoryService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, 500);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, [fetchCategories, fetchStats]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Handle create category
  const handleCreate = () => {
    setModalType("create");
    setSelectedCategory(null);
    setShowModal(true);
  };

  // Handle edit category
  const handleEdit = (category: Category) => {
    setModalType("edit");
    setSelectedCategory(category);
    setShowModal(true);
  };

  // Handle delete category
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await categoryService.deleteCategory(id);
      toast.success('Category deleted successfully');
      fetchCategories();
      fetchStats();
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} categories?`)) return;
    
    try {
      await categoryService.bulkDeleteCategories(selectedRows);
      toast.success(`${selectedRows.length} categories deleted successfully`);
      fetchCategories();
      fetchStats();
      setSelectedRows([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete categories');
    }
  };

  // Handle status change
  const handleStatusChange = async (id: number, status: string) => {
    try {
      await categoryService.updateStatus(id, status);
      toast.success('Status updated successfully');
      fetchCategories();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Handle featured toggle
  const handleToggleFeatured = async (id: number) => {
    try {
      await categoryService.toggleFeatured(id);
      toast.success('Featured status updated');
      fetchCategories();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update featured status');
    }
  };

  // Handle modal success
  const handleModalSuccess = () => {
    fetchCategories();
    fetchStats();
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchCategories();
    fetchStats();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      active: { bg: "bg-green-100", text: "text-green-800" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      archived: { bg: "bg-red-100", text: "text-red-800" },
    };
    return colors[status.toLowerCase()] || colors.inactive;
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
            Categories Management
          </h1>
          <p
            className={`mt-1 transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Organize and manage property categories for better navigation
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
            Add New Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Categories",
            value: stats.total,
            color: "blue",
            change: "+0%",
          },
          {
            title: "Active Categories",
            value: stats.active,
            color: "green",
            change: "+0%",
          },
          {
            title: "Featured",
            value: stats.featured,
            color: "purple",
            change: "+0%",
          },
          {
            title: "Total Properties",
            value: stats.total_properties,
            color: "amber",
            change: "+0%",
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
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold mb-2">
                  {stat.value.toLocaleString()}
                </p>
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
                            : "bg-amber-500"
                    }`}
                    style={{ width: `${(stat.value / stats.total) * 100}%` }}
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
              placeholder="Search categories..."
              onChange={handleSearchChange}
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
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-amber-500"
              }`}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
              <option value="featured">Featured</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-amber-500"
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
              <option value="count_high">Properties: High to Low</option>
              <option value="count_low">Properties: Low to High</option>
            </select>

            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white focus:border-amber-500 focus:ring-amber-500/20"
                  : "bg-gray-50 border-gray-300 text-gray-900 focus:border-amber-500"
              }`}
            >
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
            </select>

            <button
              onClick={handleRefresh}
              className={`px-4 py-2.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2 ${
                isDarkMode
                  ? "border-gray-600 text-gray-300"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              <RefreshIcon size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Categories Table */}
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
                checked={selectedRows.length === categories.length && categories.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(categories.map((c) => c.id));
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
                  : `${totalItems} categories`}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b transition-colors duration-500 ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <th className="px-6 py-4 text-left w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === categories.length && categories.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(categories.map((c) => c.id));
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
                    Category
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
                    Properties
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
                {categories.map((category) => {
                  const statusColor = getStatusColor(category.status);
                  return (
                    <tr
                      key={category.id}
                      className={`border-b transition-all duration-300 ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-800"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRows((prev) => [...prev, category.id]);
                            } else {
                              setSelectedRows((prev) =>
                                prev.filter((id) => id !== category.id),
                              );
                            }
                          }}
                          className={`rounded border transition-colors duration-300 ${
                            isDarkMode
                              ? "border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500/20"
                              : "border-gray-300 text-amber-600 focus:ring-amber-500"
                          }`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-100"
                            }`}
                            style={{ backgroundColor: category.color || undefined }}
                          >
                            <span className="text-2xl">{category.icon || "🏠"}</span>
                          </div>
                          <div>
                            <div
                              className={`font-medium transition-colors duration-500 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {category.name}
                            </div>
                            <div
                              className={`text-sm transition-colors duration-500 ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {category.description || "No description"}
                            </div>
                          </div>
                          {category.featured && (
                            <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={category.status}
                            onChange={(e) =>
                              handleStatusChange(category.id, e.target.value)
                            }
                            className={`text-xs px-2 py-1 rounded border transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-gray-500"
                                : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-gray-400"
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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
                          {category.property_count}
                          <span
                            className={`text-sm font-normal ml-1 transition-colors duration-500 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            properties
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <EyeIcon
                            size={14}
                            className={
                              isDarkMode ? "text-gray-500" : "text-gray-400"
                            }
                          />
                          <span
                            className={`font-medium transition-colors duration-500 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {category.views.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {new Date(category.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                            title="Edit"
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              isDarkMode ? "text-red-400" : "text-red-600"
                            }`}
                            title="Delete"
                          >
                            <TrashIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(category.id)}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              category.featured
                                ? "text-amber-500"
                                : isDarkMode
                                  ? "text-gray-400"
                                  : "text-gray-600"
                            }`}
                            title={
                              category.featured
                                ? "Remove featured"
                                : "Make featured"
                            }
                          >
                            <StarIcon
                              size={16}
                              className={category.featured ? "fill-current" : ""}
                            />
                          </button>
                          <button
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <MoreVerticalIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer */}
        {!loading && (
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
                Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, totalItems)} of {totalItems} categories
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === totalPages || 
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  )
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return (
                        <span key={`ellipsis-${page}`} className="px-2">...</span>
                      );
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded transition-colors duration-300 ${
                          page === currentPage
                            ? "bg-amber-500 text-white"
                            : isDarkMode
                              ? "text-gray-400 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
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
        )}
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        category={selectedCategory}
        isDarkMode={isDarkMode}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}