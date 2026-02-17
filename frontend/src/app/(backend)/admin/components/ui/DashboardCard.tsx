// app/(backend)/admin/components/ui/DashboardCard.tsx
"use client";

import { ReactNode } from "react";
import { useTheme } from "@/app/ThemeProvider";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "@/assets/icons";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend: number;
  description: string;
  color: "amber" | "blue" | "green" | "purple";
}

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
  description,
  color,
}: DashboardCardProps) {
  const { isDarkMode } = useTheme();

  const colorClasses = {
    amber: isDarkMode
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : "bg-amber-50 text-amber-700 border-amber-200",
    blue: isDarkMode
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : "bg-blue-50 text-blue-700 border-blue-200",
    green: isDarkMode
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-green-50 text-green-700 border-green-200",
    purple: isDarkMode
      ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
      : "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div
      className={`rounded-xl border p-6 transition-all duration-500 ${colorClasses[color]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`font-medium transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {title}
        </h3>
        <div
          className={`p-2 rounded-lg ${
            isDarkMode ? "bg-white/5" : "bg-white"
          }`}
        >
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold mb-2">{value}</p>
          <div className="flex items-center gap-2">
            {trend >= 0 ? (
              <ArrowUpIcon
                size={16}
                className={isDarkMode ? "text-green-400" : "text-green-600"}
              />
            ) : (
              <ArrowDownIcon
                size={16}
                className={isDarkMode ? "text-red-400" : "text-red-600"}
              />
            )}
            <span
              className={`text-sm font-medium ${
                trend >= 0
                  ? isDarkMode
                    ? "text-green-400"
                    : "text-green-600"
                  : isDarkMode
                  ? "text-red-400"
                  : "text-red-600"
              }`}
            >
              {Math.abs(trend)}%
            </span>
            <span
              className={`text-sm transition-colors duration-500 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {description}
            </span>
          </div>
        </div>
        
        <TrendingUpIcon
          size={24}
          className={
            trend >= 0
              ? isDarkMode
                ? "text-green-400/30"
                : "text-green-600/30"
              : isDarkMode
              ? "text-red-400/30"
              : "text-red-600/30"
          }
        />
      </div>
    </div>
  );
}