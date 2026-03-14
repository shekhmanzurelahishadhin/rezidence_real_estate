// app/(backend)/admin/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/ThemeProvider";
import { 
  EditIcon, 
  ClockIcon,
  BuildingIcon,
  AwardIcon,
  HeartIcon,
  HistoryIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  LogOutIcon
} from "@/assets/icons";
import AboutModal from "./components/AboutModal";
import { AboutService, AboutData } from "@/app/(backend)/services/api/about.service";

export default function AboutPage() {
  const { isDarkMode } = useTheme();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [history, setHistory] = useState<AboutData[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  
  // Login form state
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      setLoading(false);
      setShowLogin(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchData();
    }
  }, [isAuthenticated, authToken]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.data?.token) {
        localStorage.setItem('admin_token', data.data.token);
        setAuthToken(data.data.token);
        setIsAuthenticated(true);
        setShowLogin(false);
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuthToken(null);
    setIsAuthenticated(false);
    setAboutData(null);
    setHistory([]);
    setStats(null);
    setShowLogin(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [data, historyData, statsData] = await Promise.all([
        AboutService.getAdminData(authToken as string),
        AboutService.getHistory(authToken as string),
        AboutService.getStats(authToken as string)
      ]);

      if (data) {
        setAboutData(data);
      }
      setHistory(historyData);
      setStats(statsData);
    } catch (error: any) {
      console.error('Error fetching about data:', error);
      
      // Check if token expired
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        handleLogout();
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to load about us data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAboutUpdate = async (data: AboutData) => {
    try {
      setSaving(true);
      setError(null);
      
      const updated = await AboutService.saveAboutData(authToken as string, data);
      setAboutData(updated);
      setShowAboutModal(false);
      
      // Refresh history
      const historyData = await AboutService.getHistory(authToken as string);
      setHistory(historyData);
      
      // Show success message
      alert('About us data saved successfully');
    } catch (error: any) {
      console.error('Error saving about data:', error);
      
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        handleLogout();
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to save about us data. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const restoreVersion = async (id: number) => {
    try {
      setError(null);
      const version = await AboutService.getVersion(authToken as string, id);
      setAboutData(version);
      setShowHistory(false);
      
      alert('Version restored successfully');
    } catch (error: any) {
      console.error('Error restoring version:', error);
      
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        handleLogout();
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to restore version. Please try again.');
      }
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  // Login Page
  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}>
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Admin Login
            </h2>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
              Please login to manage about us content
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-amber-500 outline-none ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium disabled:opacity-50"
            >
              {loggingIn ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Refresh, History, and Logout */}
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
            {stats?.has_data 
              ? `Last updated: ${new Date(stats.last_updated).toLocaleString()}`
              : 'No about us data found. Create your first version.'}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? "text-gray-400 hover:text-white hover:bg-gray-700" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title="Refresh"
          >
            <RefreshCwIcon size={20} />
          </button>
          
          <button
            onClick={() => setShowHistory(true)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              isDarkMode 
                ? "text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-700" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <HistoryIcon size={16} />
            History ({history.length})
          </button>
          
          <button
            onClick={() => setShowAboutModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
          >
            <EditIcon size={16} />
            {aboutData ? 'Edit About Section' : 'Create About Section'}
          </button>

          <button
            onClick={handleLogout}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? "text-gray-400 hover:text-red-500 hover:bg-gray-700" 
                : "text-gray-600 hover:text-red-600 hover:bg-gray-100"
            }`}
            title="Logout"
          >
            <LogOutIcon size={20} />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          isDarkMode ? "bg-red-900/50 text-red-300" : "bg-red-50 text-red-700"
        }`}>
          <AlertCircleIcon size={20} />
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            className="ml-auto text-sm hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Stats Cards */}
      {aboutData && aboutData.stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aboutData.stats.map((stat, index) => (
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
                  index === 0 ? 'bg-blue-100 text-blue-600' :
                  index === 1 ? 'bg-green-100 text-green-600' :
                  index === 2 ? 'bg-purple-100 text-purple-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {index === 0 && <ClockIcon size={20} />}
                  {index === 1 && <BuildingIcon size={20} />}
                  {index === 2 && <AwardIcon size={20} />}
                  {index === 3 && <HeartIcon size={20} />}
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Data State */}
      {!aboutData && !loading && (
        <div className={`rounded-xl p-12 text-center border ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}>
          <div className="mb-4">
            <BuildingIcon size={48} className="mx-auto text-gray-400" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            No About Us Data Found
          </h3>
          <p className={`mb-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Get started by creating your first about us section.
          </p>
          <button
            onClick={() => setShowAboutModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 inline-flex items-center gap-2"
          >
            <EditIcon size={16} />
            Create About Section
          </button>
        </div>
      )}

      {/* Main Content */}
      {aboutData && (
        <div className={`rounded-xl overflow-hidden border transition-all duration-500 ${
          isDarkMode 
            ? "border-gray-700 bg-gray-800" 
            : "border-gray-200 bg-white"
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Company Overview
            </h2>
            {aboutData.created_by && (
              <span className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                Last edited by: {aboutData.created_by.name}
              </span>
            )}
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
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setShowHistory(false)}
            />
            
            <div className={`relative w-full max-w-2xl rounded-2xl shadow-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="p-6 border-b flex justify-between items-center">
                <div>
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Version History
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {history.length} versions available
                  </p>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className={`p-2 rounded-lg hover:bg-gray-700/50 transition-colors ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className={`text-center py-8 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    No version history available
                  </p>
                ) : (
                  history.map((version, index) => (
                    <div
                      key={version.id}
                      className={`p-4 mb-3 rounded-lg cursor-pointer transition-all duration-300 ${
                        isDarkMode 
                          ? "bg-gray-700 hover:bg-gray-600" 
                          : "bg-gray-50 hover:bg-gray-100"
                      } ${version.id === aboutData?.id ? 'border-2 border-amber-500' : ''}`}
                      onClick={() => restoreVersion(version.id!)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={`font-medium ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            Version {history.length - index}
                            {version.id === aboutData?.id && (
                              <span className="ml-2 text-xs text-amber-500">(Current)</span>
                            )}
                          </p>
                          <p className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {new Date(version.updated_at!).toLocaleString()}
                          </p>
                          {version.created_by && (
                            <p className={`text-xs mt-1 ${
                              isDarkMode ? "text-gray-500" : "text-gray-400"
                            }`}>
                              By: {version.created_by.name}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-amber-500 hover:underline">
                          Click to restore
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-6 border-t flex justify-end">
                <button
                  onClick={() => setShowHistory(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <AboutModal
          isOpen={showAboutModal}
          onClose={() => setShowAboutModal(false)}
          aboutData={aboutData} // This can be null for new entries
          isDarkMode={isDarkMode}
          onSubmit={handleAboutUpdate}
          isSaving={saving}
        />
      )}
    </div>
  );
}