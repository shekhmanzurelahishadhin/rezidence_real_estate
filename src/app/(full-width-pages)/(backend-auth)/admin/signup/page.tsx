// app/(full-width-pages)/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  PhoneIcon,
  CheckIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
  BuildingIcon,
  UserPlusIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isDarkMode, toggleDarkMode } = useTheme();

  const validateForm = () => {
    // Clear previous errors
    setError("");

    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Account created successfully! Redirecting to dashboard...");
      
      // Simulate successful registration
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-white"
    }`}>
      {/* Floating Buttons */}
      <div className="floating-buttons-container">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
              : "linear-gradient(135deg, #e8a838, #f97316)",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {isDarkMode ? (
            <SunIcon
              size={20}
              color="white"
              className="group-hover:rotate-180 transition-transform duration-500"
            />
          ) : (
            <MoonIcon
              size={20}
              color="white"
              className="group-hover:rotate-180 transition-transform duration-500"
            />
          )}
        </button>
      </div>

      {/* Simple Header */}
      <nav className={`transition-all duration-500 ${
        isDarkMode 
          ? "border-b border-gray-800" 
          : "border-b border-gray-100"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="flex items-center gap-3 group">
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
              href="/admin"
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
              ? "bg-blue-900/30 text-blue-300" 
              : "bg-blue-50 text-blue-700"
          }`}>
            <UserPlusIcon size={14} />
            <span>Join Our Community</span>
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? "bg-blue-400" : "bg-blue-400"
            }`} />
          </div>
          <h1 className={`text-3xl font-bold mb-3 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Create Your Account
          </h1>
          <p className={`transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Start your journey with premium real estate services
          </p>
        </div>

        <div className={`rounded-2xl shadow-sm p-8 transition-all duration-500 ${
          isDarkMode 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white border border-gray-200"
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className={`px-4 py-3 rounded-lg text-sm transition-all duration-500 ${
                isDarkMode 
                  ? "bg-green-900/30 border border-green-800 text-green-300" 
                  : "bg-green-50 border border-green-200 text-green-700"
              }`}>
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className={`px-4 py-3 rounded-lg text-sm transition-all duration-500 ${
                isDarkMode 
                  ? "bg-red-900/30 border border-red-800 text-red-300" 
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {error}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode 
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="John"
                  />
                </div>
              </div>
              
              <div>
                <label
                  htmlFor="lastName"
                  className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode 
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address *
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
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone Field (Optional) */}
            <div>
              <label
                htmlFor="phone"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon 
                    size={20} 
                    className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                  />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <p className={`mt-1 text-xs transition-colors duration-500 ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}>
                Optional - for property alerts and notifications
              </p>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode 
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                <p className={`mt-1 text-xs transition-colors duration-500 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}>
                  Minimum 6 characters
                </p>
              </div>
              
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode 
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    }`}
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
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
                <p className={`mt-1 text-xs transition-colors duration-500 ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}>
                  Must match password
                </p>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, agreeTerms: !prev.agreeTerms }))}
                className="flex items-start gap-3"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 mt-0.5 ${
                    formData.agreeTerms
                      ? "bg-amber-500 border-amber-500"
                      : isDarkMode 
                        ? "bg-gray-700 border-gray-600" 
                        : "bg-white border-gray-300"
                  }`}
                >
                  {formData.agreeTerms && <CheckIcon size={12} className="text-white" />}
                </div>
                <div className="text-left">
                  <span className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className={`font-semibold transition-colors duration-300 ${
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
                      className={`font-semibold transition-colors duration-300 ${
                        isDarkMode 
                          ? "text-amber-400 hover:text-amber-300" 
                          : "text-amber-600 hover:text-amber-700"
                      }`}
                    >
                      Privacy Policy
                    </Link>
                  </span>
                  <p className={`mt-1 text-xs transition-colors duration-500 ${
                    isDarkMode ? "text-gray-500" : "text-gray-500"
                  }`}>
                    You'll receive property updates and marketing communications
                  </p>
                </div>
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Benefits */}
            <div className={`p-4 rounded-lg transition-all duration-500 ${
              isDarkMode 
                ? "bg-gray-700/30 border border-gray-600" 
                : "bg-amber-50 border border-amber-100"
            }`}>
              <p className={`text-sm font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? "text-amber-300" : "text-amber-700"
              }`}>
                Account Benefits:
              </p>
              <ul className={`space-y-1 text-sm transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                <li className="flex items-center gap-2">
                  <CheckIcon size={12} className={isDarkMode ? "text-amber-400" : "text-amber-500"} />
                  Save favorite properties
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon size={12} className={isDarkMode ? "text-amber-400" : "text-amber-500"} />
                  Schedule property viewings
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon size={12} className={isDarkMode ? "text-amber-400" : "text-amber-500"} />
                  Get personalized property alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon size={12} className={isDarkMode ? "text-amber-400" : "text-amber-500"} />
                  Track your property inquiries
                </li>
              </ul>
            </div>
          </form>

          {/* Already have account */}
          <div className={`mt-8 pt-8 border-t transition-colors duration-500 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <p className={`text-center transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Already have an account?{" "}
              <Link
                href="/admin/signin"
                className={`font-semibold transition-colors duration-300 ${
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

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm transition-colors duration-500 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}>
            By creating an account, you agree to our{" "}
            <Link
              href="/terms"
              className={`font-medium transition-colors duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-amber-400" 
                  : "text-gray-500 hover:text-amber-600"
              }`}
            >
              Terms
            </Link>
            {" "}and{" "}
            <Link
              href="/privacy"
              className={`font-medium transition-colors duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-amber-400" 
                  : "text-gray-500 hover:text-amber-600"
              }`}
            >
              Privacy Policy
            </Link>
          </p>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 text-sm mt-4 transition-colors duration-300 ${
              isDarkMode 
                ? "text-gray-400 hover:text-amber-400" 
                : "text-gray-500 hover:text-amber-600"
            }`}
          >
            Need help? Contact Support
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}