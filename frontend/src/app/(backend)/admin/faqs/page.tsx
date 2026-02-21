// app/(backend)/admin/faqs/page.tsx
"use client";

import React, { useState } from "react";
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
  ChevronUpIcon,
  ChevronDownIcon,
} from "@/assets/icons";
import FAQModal from "./components/FAQModal";
import { mockFAQs } from "./data";

export default function FAQsPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);
  const [faqs, setFaqs] = useState(mockFAQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("order");
  const [expandedPreview, setExpandedPreview] = useState<number | null>(null);

  // Filter and search FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      faq.status.toLowerCase() === filter.toLowerCase() ||
      faq.category.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Sort FAQs
  const sortedFaqs = [...filteredFaqs].sort((a, b) => {
    switch (sortBy) {
      case "order":
        return a.order - b.order;
      case "order_desc":
        return b.order - a.order;
      case "category":
        return a.category.localeCompare(b.category);
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Handle create FAQ
  const handleCreate = () => {
    setModalType("create");
    setSelectedFAQ(null);
    setShowModal(true);
  };

  // Handle edit FAQ
  const handleEdit = (faq: any) => {
    setModalType("edit");
    setSelectedFAQ(faq);
    setShowModal(true);
  };

  // Handle delete FAQ
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedRows.length} FAQs?`,
      )
    ) {
      setFaqs((prev) => prev.filter((f) => !selectedRows.includes(f.id)));
      setSelectedRows([]);
    }
  };

  // Handle status change
  const handleStatusChange = (id: number, status: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f)),
    );
  };

  // Handle order change
  const handleMoveUp = (id: number) => {
    const index = faqs.findIndex(f => f.id === id);
    if (index > 0) {
      const newFaqs = [...faqs];
      const temp = newFaqs[index].order;
      newFaqs[index].order = newFaqs[index - 1].order;
      newFaqs[index - 1].order = temp;
      
      // Reorder array
      [newFaqs[index - 1], newFaqs[index]] = [newFaqs[index], newFaqs[index - 1]];
      setFaqs(newFaqs);
    }
  };

  const handleMoveDown = (id: number) => {
    const index = faqs.findIndex(f => f.id === id);
    if (index < faqs.length - 1) {
      const newFaqs = [...faqs];
      const temp = newFaqs[index].order;
      newFaqs[index].order = newFaqs[index + 1].order;
      newFaqs[index + 1].order = temp;
      
      // Reorder array
      [newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
      setFaqs(newFaqs);
    }
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
            FAQ Management
          </h1>
          <p
            className={`mt-1 transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Manage frequently asked questions, organize by category, and control visibility
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
            Add New FAQ
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total FAQs",
            value: faqs.length,
            color: "blue",
            change: "+4",
          },
          {
            title: "Published",
            value: faqs.filter((f) => f.status === "published").length,
            color: "green",
            change: "+3",
          },
          {
            title: "Categories",
            value: [...new Set(faqs.map(f => f.category))].length,
            color: "purple",
            change: "6",
          },
          {
            title: "Pending Review",
            value: faqs.filter((f) => f.status === "pending").length,
            color: "yellow",
            change: "-1",
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
                    style={{ width: `${(stat.value / (stat.title === "Total FAQs" ? faqs.length : 
                      stat.title === "Categories" ? 10 : faqs.length)) * 100}%` }}
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
              placeholder="Search FAQs by question, answer, or category..."
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
              <option value="all">All FAQs</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
              <optgroup label="Categories">
                <option value="buying">Buying</option>
                <option value="selling">Selling</option>
                <option value="process">Process</option>
                <option value="general">General</option>
                <option value="investing">Investing</option>
                <option value="legal">Legal</option>
                <option value="financing">Financing</option>
              </optgroup>
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
              <option value="order">Order: Low to High</option>
              <option value="order_desc">Order: High to Low</option>
              <option value="category">Category</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
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

      {/* FAQs Table */}
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
                  selectedRows.length === faqs.length &&
                  faqs.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(faqs.map((f) => f.id));
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
                  : `${faqs.length} FAQs`}
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
                      selectedRows.length === faqs.length &&
                      faqs.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(faqs.map((f) => f.id));
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
                  Order
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Question
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
              {sortedFaqs.map((faq) => (
                <React.Fragment key={faq.id}>
                  <tr
                    key={faq.id}
                    className={`border-b transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-700 hover:bg-gray-800"
                        : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(faq.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows((prev) => [...prev, faq.id]);
                          } else {
                            setSelectedRows((prev) =>
                              prev.filter((id) => id !== faq.id),
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
                      <div className="flex items-center gap-2">
                        <span className={`font-mono transition-colors duration-500 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          #{faq.order}
                        </span>
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleMoveUp(faq.id)}
                            className={`p-0.5 rounded hover:bg-gray-700 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <ChevronUpIcon size={14} />
                          </button>
                          <button
                            onClick={() => handleMoveDown(faq.id)}
                            className={`p-0.5 rounded hover:bg-gray-700 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            <ChevronDownIcon size={14} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <button
                          onClick={() => setExpandedPreview(expandedPreview === faq.id ? null : faq.id)}
                          className={`text-left font-medium hover:text-amber-500 transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {faq.question}
                        </button>
                        <p className={`text-sm line-clamp-2 max-w-md mt-1 transition-colors duration-500 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {faq.answer}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {faq.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={faq.status}
                          onChange={(e) =>
                            handleStatusChange(faq.id, e.target.value)
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
                        {new Date(faq.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(faq)}
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
                          onClick={() => handleDelete(faq.id)}
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
                  {expandedPreview === faq.id && (
                    <tr className={isDarkMode ? "bg-gray-750" : "bg-gray-50"}>
                      <td colSpan={7} className="px-6 py-4">
                        <div className={`rounded-lg p-4 ${
                          isDarkMode ? "bg-gray-700" : "bg-white"
                        }`}>
                          <h4 className={`text-sm font-medium mb-2 transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                            Full Answer:
                          </h4>
                          <p className={`text-sm transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}>
                            {faq.answer}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                 </React.Fragment>
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
              Showing {sortedFaqs.length} of {faqs.length} FAQs
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
              {[1, 2, 3].map((page) => (
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

      {/* FAQ Modal */}
      <FAQModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        faq={selectedFAQ}
        isDarkMode={isDarkMode}
        onSubmit={(data) => {
          if (modalType === "create") {
            // Add new FAQ
            setFaqs((prev) => [
              {
                ...data,
                id: Math.max(...prev.map((f) => f.id)) + 1,
                createdAt: new Date().toISOString(),
              },
              ...prev,
            ]);
          } else {
            // Update existing FAQ
            setFaqs((prev) =>
              prev.map((f) =>
                f.id === selectedFAQ.id ? { ...f, ...data } : f,
              ),
            );
          }
          setShowModal(false);
        }}
      />
    </div>
  );
}