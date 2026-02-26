// app/(full-width-pages)/(auth)/admin/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  SunIcon,
  MoonIcon,
  LogInIcon,
  ShieldIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import { apiRequest } from "@/app/lib/api";

export default function AdminSignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [apiError, setApiError] = useState("");
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setApiError("");

    try {
      const response = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }, 'admin');

      if (response.success) {
        console.log("Login successful:", response);
        // Store token and user data
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_data', JSON.stringify(response.data.admin));
        localStorage.setItem('admin_roles', JSON.stringify(response.data.roles || []));
        localStorage.setItem('admin_permissions', JSON.stringify(response.data.permissions || []));
        
        // Set remember me preference
        if (formData.remember_me) {
          localStorage.setItem('admin_remember', 'true');
        }
        
        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          setApiError(response.message || "Invalid credentials");
        }
      }
    } catch (error: any) {
      setApiError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: [] }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {/* Floating Dark Mode Toggle */}
      <div className="floating-buttons-container">
        <button
          onClick={toggleDarkMode}
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
              : "linear-gradient(135deg, #e8a838, #f97316)",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {isDarkMode ? (
            <SunIcon size={20} color="white" />
          ) : (
            <MoonIcon size={20} color="white" />
          )}
        </button>
      </div>

      {/* Simple Header */}
      <nav className={`transition-all duration-500 ${
        isDarkMode 
          ? "border-b border-gray-800" 
          : "border-b border-gray-200 bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode 
                    ? "text-white group-hover:text-amber-400" 
                    : "text-gray-900 group-hover:text-amber-600"
                }`}>
                  Admin Portal
                </h1>
                <p className={`text-xs transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  Secure Administration
                </p>
              </div>
            </Link>

            <Link
              href="/admin"
              className={`inline-flex items-center gap-2 transition-colors duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-amber-400" 
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <ArrowLeftIcon size={16} />
              Back to Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-500 ${
            isDarkMode 
              ? "bg-amber-900/30 text-amber-300 border border-amber-700/50" 
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}>
            <ShieldIcon size={14} />
            <span>Restricted Access</span>
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? "bg-amber-400" : "bg-amber-400"
            }`} />
          </div>
          <h1 className={`text-3xl font-bold mb-3 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Admin Sign In
          </h1>
          <p className={`transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className={`rounded-2xl shadow-xl border transition-all duration-500 overflow-hidden ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}>
          {/* Gradient Border */}
          <div className={`h-1 bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500`} />
          
          <div className="p-8">
            {/* Demo Credentials */}
            <div className={`mb-6 p-4 rounded-lg transition-all duration-500 ${
              isDarkMode 
                ? "bg-gray-700/50 border border-gray-600" 
                : "bg-amber-50 border border-amber-200"
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircleIcon size={20} className={isDarkMode ? "text-amber-400" : "text-amber-600"} />
                <div>
                  <p className={`text-sm font-medium mb-1 transition-colors duration-500 ${
                    isDarkMode ? "text-amber-300" : "text-amber-700"
                  }`}>
                    Demo Credentials
                  </p>
                  <p className={`text-xs transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Email: admin@example.com<br />
                    Password: password
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* API Error Message */}
              {apiError && (
                <div className={`px-4 py-3 rounded-lg text-sm flex items-center gap-2 ${
                  isDarkMode 
                    ? "bg-red-900/30 border border-red-800 text-red-300" 
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}>
                  <AlertCircleIcon size={16} />
                  {apiError}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      errors.email ? 'border-red-500 focus:ring-red-500/20' :
                      isDarkMode
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="admin@example.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircleIcon size={14} />
                    {errors.email[0]}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label 
                    htmlFor="password"
                    className={`block text-sm font-medium transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <Link
                    href="/admin/forgot-password"
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? "text-amber-400 hover:text-amber-300" 
                        : "text-amber-600 hover:text-amber-700"
                    }`}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      errors.password ? 'border-red-500 focus:ring-red-500/20' :
                      isDarkMode
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOffIcon
                        size={20}
                        className={isDarkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}
                      />
                    ) : (
                      <EyeIcon
                        size={20}
                        className={isDarkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}
                      />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircleIcon size={14} />
                    {errors.password[0]}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, remember_me: !prev.remember_me }))}
                  className="flex items-center gap-3"
                  disabled={isLoading}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                      formData.remember_me
                        ? "bg-amber-500 border-amber-500"
                        : isDarkMode 
                          ? "bg-gray-700 border-gray-600" 
                          : "bg-white border-gray-300"
                    }`}
                  >
                    {formData.remember_me && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Remember me
                  </span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogInIcon size={18} />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className={`mt-8 pt-8 border-t transition-colors duration-500 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <p className={`text-center transition-colors duration-500 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                Don't have an admin account?{" "}
                <Link
                  href="/admin/signup"
                  className={`font-semibold transition-colors duration-300 ${
                    isDarkMode 
                      ? "text-amber-400 hover:text-amber-300" 
                      : "text-amber-600 hover:text-amber-700"
                  }`}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className={`text-xs transition-colors duration-500 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}>
            © {new Date().getFullYear()} Admin Portal. Restricted access.
            <br />
            Unauthorized access is prohibited. All actions are logged.
          </p>
        </div>
      </div>
    </div>
  );
}