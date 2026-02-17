// app/(backend)/admin/about/page.tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/app/ThemeProvider";
import { 
  EditIcon, 
  ClockIcon,
  BuildingIcon,
  AwardIcon,
  HeartIcon
} from "@/assets/icons";
import AboutModal from "./components/AboutModal";
import { mockAboutData } from "./data";

export default function AboutPage() {
  const { isDarkMode } = useTheme();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [aboutData, setAboutData] = useState(mockAboutData);

  // Handle about data update
  const handleAboutUpdate = (data: any) => {
    setAboutData(data);
    setShowAboutModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl font-bold transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            About Us Management
          </h1>
          <p className={`mt-1 transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Manage your company story, mission, vision, and values
          </p>
        </div>

        <button
          onClick={() => setShowAboutModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
        >
          <EditIcon size={16} />
          Edit About Section
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: "Years Experience", 
            value: aboutData.stats.find(s => s.label === "Years Experience")?.value || "15+",
            icon: <ClockIcon size={20} />,
            color: "blue"
          },
          { 
            title: "Properties Sold", 
            value: aboutData.stats.find(s => s.label === "Properties Sold")?.value || "2,500+",
            icon: <BuildingIcon size={20} />,
            color: "green"
          },
          { 
            title: "Industry Awards", 
            value: aboutData.stats.find(s => s.label === "Industry Awards")?.value || "50+",
            icon: <AwardIcon size={20} />,
            color: "purple"
          },
          { 
            title: "Client Satisfaction", 
            value: aboutData.stats.find(s => s.label === "Client Satisfaction")?.value || "98%",
            icon: <HeartIcon size={20} />,
            color: "amber"
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 transition-all duration-500 ${
              isDarkMode 
                ? "bg-gray-800 border border-gray-700" 
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-amber-100 text-amber-600'
              }`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`rounded-xl overflow-hidden border transition-all duration-500 ${
        isDarkMode 
          ? "border-gray-700 bg-gray-800" 
          : "border-gray-200 bg-white"
      }`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Company Overview
          </h2>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className={`rounded-lg p-6 ${
            isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
          }`}>
            <div className="mb-4">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}>
                Hero Section
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {aboutData.hero.title}
            </h3>
            <p className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              {aboutData.hero.subtitle}
            </p>
          </div>

          {/* Story Section */}
          <div className={`rounded-lg p-6 ${
            isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
          }`}>
            <div className="mb-4">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}>
                Our Story
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              {aboutData.story.title}
            </h3>
            <div className="space-y-4">
              {aboutData.story.content.map((paragraph: string, index: number) => (
                <p key={index} className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-lg p-6 ${
              isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
            }`}>
              <h3 className={`font-semibold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Our Mission
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                {aboutData.mission}
              </p>
            </div>

            <div className={`rounded-lg p-6 ${
              isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
            }`}>
              <h3 className={`font-semibold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Our Vision
              </h3>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                {aboutData.vision}
              </p>
            </div>
          </div>

          {/* Values */}
          <div className={`rounded-lg p-6 ${
            isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
          }`}>
            <h3 className={`font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutData.values.map((value: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    index % 3 === 0 ? 'bg-blue-100 text-blue-600' :
                    index % 3 === 1 ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <HeartIcon size={16} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${
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
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className={`rounded-lg p-6 ${
            isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
          }`}>
            <h3 className={`font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Key Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aboutData.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
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
        </div>
      </div>

      {/* About Modal */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        aboutData={aboutData}
        isDarkMode={isDarkMode}
        onSubmit={handleAboutUpdate}
      />
    </div>
  );
}