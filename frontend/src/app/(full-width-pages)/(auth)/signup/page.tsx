// app/(full-width-pages)/(auth)/signup/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  PhoneIcon,
  CheckIcon,
  SunIcon,
  MoonIcon,
  UserPlusIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import { useClientAuth } from "@/app/contexts/ClientAuthContext";
import { apiRequest } from "../../../../app/lib/api";

export default function ClientSignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    agree_terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [apiError, setApiError] = useState("");
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { client, isAuthenticated, loading: authLoading } = useClientAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4 ${
            isDarkMode 
              ? "border-amber-900/30 border-t-amber-400" 
              : "border-amber-200 border-t-amber-600"
          }`} />
          <p className={`text-sm font-medium transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // If authenticated, don't render the form (will redirect)
  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setApiError("");

    // Password confirmation validation
    if (formData.password !== formData.password_confirmation) {
      setErrors({
        password_confirmation: ["Passwords do not match"]
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiRequest('/client/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      }, 'client');

      if (response.success) {
        // Store user data
        localStorage.setItem('user_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.client));
        localStorage.setItem('user_roles', JSON.stringify(response.data.roles));
        localStorage.setItem('user_permissions', JSON.stringify(response.data.permissions));
        
        router.push("/");
      } else {
        if (response.errors) {
          setErrors(response.errors);
        } else {
          setApiError(response.message || "Registration failed");
        }
      }
    } catch (error) {
      setApiError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: [] }));
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      {/* Floating Buttons */}
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
          {isDarkMode ? (
            <SunIcon size={20} color="white" />
          ) : (
            <MoonIcon size={20} color="white" />
          )}
        </button>
      </div>

      {/* Header */}
      <nav className={`transition-all duration-500 ${
        isDarkMode ? "border-b border-gray-800" : "border-b border-gray-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode 
                    ? "text-white group-hover:text-amber-400" 
                    : "text-gray-900 group-hover:text-amber-600"
                }`}>
                  Homely Homes
                </h1>
                <p className={`text-xs transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  Premium Real Estate
                </p>
              </div>
            </Link>

            <Link
              href="/"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-amber-400" 
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 transition-all duration-500 ${
            isDarkMode 
              ? "bg-amber-900/30 text-amber-300 border border-amber-800" 
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}>
            <UserPlusIcon size={14} />
            <span>Create Account</span>
          </div>
          <h1 className={`text-3xl font-bold mb-3 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Join Homely Homes
          </h1>
          <p className={`transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Create your account to start your property journey
          </p>
        </div>

        <div className={`rounded-2xl shadow-sm p-8 transition-all duration-500 ${
          isDarkMode 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white border border-gray-200"
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* API Error Message */}
            {apiError && (
              <div className={`px-4 py-3 rounded-lg text-sm ${
                isDarkMode 
                  ? "bg-red-900/30 border border-red-800 text-red-300" 
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {apiError}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    errors.name ? 'border-red-500' : 
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    errors.email ? 'border-red-500' :
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                  }`}
                  placeholder="user@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    errors.password ? 'border-red-500' :
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                  ) : (
                    <EyeIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password[0]}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="password_confirmation"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    errors.password_confirmation ? 'border-red-500' :
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                  ) : (
                    <EyeIcon size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="mt-1 text-xs text-red-500">{errors.password_confirmation[0]}</p>
              )}
            </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, agree_terms: !prev.agree_terms }))}
                className="flex items-start gap-3"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 mt-0.5 ${
                    formData.agree_terms
                      ? "bg-amber-500 border-amber-500"
                      : isDarkMode 
                        ? "bg-gray-700 border-gray-600" 
                        : "bg-white border-gray-300"
                  }`}
                >
                  {formData.agree_terms && <CheckIcon size={12} className="text-white" />}
                </div>
                <div className="text-left">
                  <span className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className={`font-semibold ${
                        isDarkMode 
                          ? "text-amber-400 hover:text-amber-300" 
                          : "text-amber-600 hover:text-amber-700"
                      }`}
                    >
                      Terms of Service
                    </Link>
                    {" "}and{" "}
                    <Link
                      href="/privacy"
                      className={`font-semibold ${
                        isDarkMode 
                          ? "text-amber-400 hover:text-amber-300" 
                          : "text-amber-600 hover:text-amber-700"
                      }`}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </div>
              </button>
            </div>
            {errors.agree_terms && (
              <p className="mt-1 text-xs text-red-500">{errors.agree_terms[0]}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Already have account */}
          <div className={`mt-8 pt-8 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <p className={`text-center ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Already have an account?{" "}
              <Link
                href="/signin"
                className={`font-semibold ${
                  isDarkMode 
                    ? "text-amber-400 hover:text-amber-300" 
                    : "text-amber-600 hover:text-amber-700"
                }`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}