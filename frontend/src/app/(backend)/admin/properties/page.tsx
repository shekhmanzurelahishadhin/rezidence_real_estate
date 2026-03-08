// app/(backend)/admin/properties/page.tsx
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
import PropertyModal from "./components/PropertyModal";
import { propertyService } from "@/app/(backend)/services/api/propertyService";
import { Property, PropertyStats } from "@/app/(backend)/types/property";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";

export default function PropertiesPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<PropertyStats>({
    total: 0,
    published: 0,
    featured: 0,
    pending: 0,
    draft: 0,
    archived: 0,
    total_views: 0,
    average_price: 0,
    total_value: 0
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

  // Fetch properties
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const response = await propertyService.getProperties({
        search: searchTerm || undefined,
        status: filter !== 'all' ? filter : undefined,
        sort_by: sortBy,
        page: currentPage,
        per_page: perPage
      });
      
      setProperties(response.data.data);
      setTotalItems(response.data.meta.total);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      toast.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filter, sortBy, currentPage, perPage]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await propertyService.getStats();
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
    fetchProperties();
    fetchStats();
  }, [fetchProperties, fetchStats]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Handle create property
  const handleCreate = () => {
    setModalType("create");
    setSelectedProperty(null);
    setShowModal(true);
  };

  // Handle edit property
  const handleEdit = (property: Property) => {
    setModalType("edit");
    setSelectedProperty(property);
    setShowModal(true);
  };

  // Handle delete property
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    try {
      await propertyService.deleteProperty(id);
      toast.success('Property deleted successfully');
      fetchProperties();
      fetchStats();
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete property');
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} properties?`)) return;
    
    try {
      await propertyService.bulkDeleteProperties(selectedRows);
      toast.success(`${selectedRows.length} properties deleted successfully`);
      fetchProperties();
      fetchStats();
      setSelectedRows([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete properties');
    }
  };

  // Handle status change
  const handleStatusChange = async (id: number, status: string) => {
    try {
      await propertyService.updateStatus(id, status);
      toast.success('Status updated successfully');
      fetchProperties();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Handle featured toggle
  const handleToggleFeatured = async (id: number) => {
    try {
      await propertyService.toggleFeatured(id);
      toast.success('Featured status updated');
      fetchProperties();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update featured status');
    }
  };

  // Handle modal success
  const handleModalSuccess = () => {
    fetchProperties();
    fetchStats();
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchProperties();
    fetchStats();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      published: { bg: "bg-green-100", text: "text-green-800" },
      draft: { bg: "bg-gray-100", text: "text-gray-800" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      archived: { bg: "bg-red-100", text: "text-red-800" },
    };
    return colors[status.toLowerCase()] || colors.draft;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
            value: stats.total,
            color: "blue",
            change: "+0%",
          },
          {
            title: "Published",
            value: stats.published,
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
            title: "Pending Review",
            value: stats.pending,
            color: "yellow",
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
                            : "bg-yellow-500"
                    }`}
                    style={{ width: stats.total ? `${(stat.value / stats.total) * 100}%` : '0%' }}
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
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
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
              <option value="views">Most Viewed</option>
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
                checked={selectedRows.length === properties.length && properties.length > 0}
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
                  : `${totalItems} properties`}
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
                      checked={selectedRows.length === properties.length && properties.length > 0}
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
                {properties.map((property) => {
                  const statusColor = getStatusColor(property.status);
                  return (
                    <tr
                      key={property.id}
                      className={`border-b transition-all duration-300 ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-800"
                          : "border-gray-100 hover:bg-gray-50"
                      }`}
                    >
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
                              ? "border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500/20"
                              : "border-gray-300 text-amber-600 focus:ring-amber-500"
                          }`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            {property.featured_image_url ? (
                              <img 
                                src={property.featured_image_url} 
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className={`w-full h-full flex items-center justify-center ${
                                isDarkMode ? "bg-gray-700" : "bg-gray-200"
                              }`}>
                                <span className="text-xl">🏠</span>
                              </div>
                            )}
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
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {property.category?.name || 'Uncategorized'} • {property.city}, {property.state}
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
                                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-gray-500"
                                : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-gray-400"
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
                          {formatPrice(property.price)}
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
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {new Date(property.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                            title="Edit"
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              isDarkMode ? "text-red-400" : "text-red-600"
                            }`}
                            title="Delete"
                          >
                            <TrashIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(property.id)}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                              property.featured
                                ? "text-amber-500"
                                : isDarkMode
                                  ? "text-gray-400"
                                  : "text-gray-600"
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
                Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, totalItems)} of {totalItems} properties
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

      {/* Property Modal */}
      <PropertyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        property={selectedProperty}
        isDarkMode={isDarkMode}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}