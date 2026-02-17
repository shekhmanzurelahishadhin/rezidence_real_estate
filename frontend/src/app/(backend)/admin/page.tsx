// app/(backend)/admin/page.tsx
"use client";

import DashboardCard from "./components/ui/DashboardCard";
import { useTheme } from "@/app/ThemeProvider";
import {
  BuildingIcon,
  FileTextIcon,
  UsersIcon,
  DollarIcon,
  ActivityIcon,
  CalendarIcon,
} from "@/assets/icons";

export default function AdminDashboard() {
  const { isDarkMode } = useTheme();

  const stats = [
    {
      title: "Total Properties",
      value: "1,247",
      icon: <BuildingIcon size={20} />,
      trend: 12,
      description: "vs last month",
      color: "amber" as const,
    },
    {
      title: "Active Blogs",
      value: "89",
      icon: <FileTextIcon size={20} />,
      trend: 8,
      description: "vs last month",
      color: "blue" as const,
    },
    {
      title: "Registered Users",
      value: "5,234",
      icon: <UsersIcon size={20} />,
      trend: 23,
      description: "vs last month",
      color: "green" as const,
    },
    {
      title: "Total Revenue",
      value: "$124.8K",
      icon: <DollarIcon size={20} />,
      trend: 18,
      description: "vs last month",
      color: "purple" as const,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 transition-all duration-500 ${
            isDarkMode
              ? "bg-amber-900/30 text-amber-300"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? "bg-amber-400" : "bg-amber-500"
            }`}
          />
          Admin Dashboard
        </div>
        <h1
          className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Welcome back, John 👋
        </h1>
        <p
          className={`transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Here's what's happening with your real estate business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div
        className={`rounded-xl border p-6 transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-xl font-bold transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Recent Activity
          </h2>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              isDarkMode
                ? "text-amber-400 hover:text-amber-300"
                : "text-amber-600 hover:text-amber-700"
            }`}
          >
            <ActivityIcon size={16} />
            View All
          </button>
        </div>

        {/* Activity List */}
        <div className="space-y-4">
          {[
            { action: "New property listed", user: "John Doe", time: "10 min ago" },
            { action: "Blog post published", user: "Jane Smith", time: "1 hour ago" },
            { action: "User registration", user: "Robert Johnson", time: "2 hours ago" },
            { action: "Property updated", user: "Sarah Wilson", time: "3 hours ago" },
          ].map((activity, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors duration-300 ${
                isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <CalendarIcon
                  size={18}
                  className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                />
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {activity.action}
                </p>
                <p
                  className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  By {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}