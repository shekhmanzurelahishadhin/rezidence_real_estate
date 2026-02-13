// app/(backend)/admin/blogs/page.tsx
"use client";

import { useState } from "react";
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
  ClockIcon,
  CalendarIcon,
  UserIcon,
  BookmarkIcon
} from "@/assets/icons";
import BlogModal from "./components/BlogModal";
import { mockBlogs } from "./data";

export default function BlogsPage() {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");

  // Filter and search blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === "all" || 
      blog.status.toLowerCase() === filter.toLowerCase() ||
      (filter === "featured" && blog.featured) ||
      (filter === "popular" && blog.views > 5000);
    
    return matchesSearch && matchesFilter;
  });

  // Sort blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch(sortBy) {
      case 'views_high':
        return b.views - a.views;
      case 'views_low':
        return a.views - b.views;
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Handle create blog
  const handleCreate = () => {
    setModalType('create');
    setSelectedBlog(null);
    setShowModal(true);
  };

  // Handle edit blog
  const handleEdit = (blog: any) => {
    setModalType('edit');
    setSelectedBlog(blog);
    setShowModal(true);
  };

  // Handle delete blog
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(prev => prev.filter(b => b.id !== id));
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} blog posts?`)) {
      setBlogs(prev => prev.filter(b => !selectedRows.includes(b.id)));
      setSelectedRows([]);
    }
  };

  // Handle status change
  const handleStatusChange = (id: number, status: string) => {
    setBlogs(prev => prev.map(b => 
      b.id === id ? { ...b, status } : b
    ));
  };

  // Handle featured toggle
  const handleToggleFeatured = (id: number) => {
    setBlogs(prev => prev.map(b => 
      b.id === id ? { ...b, featured: !b.featured } : b
    ));
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string, text: string }> = {
      'published': { bg: 'bg-green-100', text: 'text-green-800' },
      'draft': { bg: 'bg-gray-100', text: 'text-gray-800' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
      'scheduled': { bg: 'bg-blue-100', text: 'text-blue-800' },
    };
    const color = colors[status.toLowerCase()] || colors.draft;
    return isDarkMode 
      ? `${color.bg}/20 ${color.text}/80`
      : `${color.bg} ${color.text}`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl font-bold transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Blog Management
          </h1>
          <p className={`mt-1 transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Create, edit, and manage your blog posts and content
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
            Write New Post
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Posts", value: blogs.length, color: "blue", change: "+15%" },
          { title: "Published", value: blogs.filter(b => b.status === "published").length, color: "green", change: "+8%" },
          { title: "Featured", value: blogs.filter(b => b.featured).length, color: "purple", change: "+12%" },
          { title: "Total Views", value: blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString(), color: "amber", change: "+25%" },
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
              <h3 className={`font-medium transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {stat.title}
              </h3>
              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                stat.change.startsWith('+') 
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <div className={`h-1.5 w-24 rounded-full overflow-hidden ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}>
                  <div 
                    className={`h-full ${
                      stat.color === 'blue' ? 'bg-blue-500' :
                      stat.color === 'green' ? 'bg-green-500' :
                      stat.color === 'purple' ? 'bg-purple-500' : 'bg-amber-500'
                    }`}
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className={`rounded-xl p-6 mb-6 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gray-800 border border-gray-700" 
          : "bg-white border border-gray-200"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
            </div>
            <input
              type="search"
              placeholder="Search posts..."
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
              <option value="scheduled">Scheduled</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
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
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="views_high">Views: High to Low</option>
              <option value="views_low">Views: Low to High</option>
            </select>

            <button className={`px-4 py-2.5 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2 ${
              isDarkMode 
                ? "border-gray-600 text-gray-300" 
                : "border-gray-300 text-gray-700"
            }`}>
              <FilterIcon size={16} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className={`rounded-xl overflow-hidden border transition-all duration-500 ${
        isDarkMode 
          ? "border-gray-700 bg-gray-800" 
          : "border-gray-200 bg-white"
      }`}>
        {/* Table Header */}
        <div className={`px-6 py-4 border-b transition-colors duration-500 ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedRows.length === blogs.length && blogs.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(blogs.map(b => b.id));
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
              <span className={`text-sm font-medium transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                {selectedRows.length > 0 
                  ? `${selectedRows.length} selected` 
                  : `${blogs.length} posts`
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                <RefreshIcon size={18} />
              </button>
              <button className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                <DownloadIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b transition-colors duration-500 ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"
              }`}>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === blogs.length && blogs.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(blogs.map(b => b.id));
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
                <th className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Post
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Status
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Views
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Comments
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Date
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBlogs.map((blog) => (
                <tr
                  key={blog.id}
                  className={`border-b transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-800" // Custom gray level for better contrast
                      : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(blog.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(prev => [...prev, blog.id]);
                        } else {
                          setSelectedRows(prev => prev.filter(id => id !== blog.id));
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
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${blog.image})` }}
                        />
                      </div>
                      <div>
                        <div className={`font-medium transition-colors duration-500 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {blog.title}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className={`text-xs transition-colors duration-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {blog.category}
                          </div>
                          <div className={`text-xs transition-colors duration-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            <ClockIcon size={10} className="inline mr-1" />
                            {blog.readTime} min
                          </div>
                        </div>
                      </div>
                      {blog.featured && (
                        <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={blog.status}
                        onChange={(e) => handleStatusChange(blog.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded border transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-gray-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100 hover:border-gray-400"
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending">Pending</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <EyeIcon size={14} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                      <span className={`font-medium transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {blog.views.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {blog.comments}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                        title="Edit"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                          isDarkMode ? "text-red-400" : "text-red-600"
                        }`}
                        title="Delete"
                      >
                        <TrashIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(blog.id)}
                        className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                          blog.featured
                            ? "text-amber-500"
                            : isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                        title={blog.featured ? "Remove featured" : "Make featured"}
                      >
                        <BookmarkIcon size={16} className={blog.featured ? "fill-current" : ""} />
                      </button>
                      <button className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
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
        <div className={`px-6 py-4 border-t transition-colors duration-500 ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-gray-50"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className={`text-sm transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Showing {sortedBlogs.length} of {blogs.length} posts
            </div>
            <div className="flex items-center gap-2">
              <button className={`px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ${
                isDarkMode 
                  ? "border-gray-600 text-gray-300" 
                  : "border-gray-300 text-gray-700"
              }`}>
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
              <button className={`px-3 py-1.5 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ${
                isDarkMode 
                  ? "border-gray-600 text-gray-300" 
                  : "border-gray-300 text-gray-700"
              }`}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        blog={selectedBlog}
        isDarkMode={isDarkMode}
        onSubmit={(data) => {
          if (modalType === 'create') {
            // Add new blog
            setBlogs(prev => [{
              ...data,
              id: Math.max(...prev.map(b => b.id)) + 1,
              createdAt: new Date().toISOString(),
              views: 0,
              comments: 0,
              slug: data.title.toLowerCase().replace(/\s+/g, '-'),
              tags: data.tags || [],
              keyPoints: data.keyPoints || []
            }, ...prev]);
          } else {
            // Update existing blog
            setBlogs(prev => prev.map(b => 
              b.id === selectedBlog.id ? { 
                ...b, 
                ...data,
                slug: data.title.toLowerCase().replace(/\s+/g, '-')
              } : b
            ));
          }
          setShowModal(false);
        }}
      />
    </div>
  );
}