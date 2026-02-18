// app/(backend)/admin/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  EyeIcon, 
  EyeOffIcon, 
  MailIcon, 
  LockIcon, 
  ShieldIcon,
  BuildingIcon,
  AlertCircleIcon,
  LogInIcon,
  ArrowLeftIcon,
  SunIcon,
  MoonIcon,
  HomeIcon
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = "Admin email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any admin email
      if (formData.email && formData.password) {
        // Store login state
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_email", formData.email);
        if (rememberMe) {
          localStorage.setItem("admin_remember", "true");
        }
        
        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setErrors({ submit: "Invalid admin credentials" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-br from-amber-50 via-white to-blue-50"
    }`}>
      {/* Floating Dark Mode Toggle */}
        <div className="floating-buttons-container">
        <button
          onClick={toggleDarkMode}
          className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
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
            <Link href="/" className="flex items-center gap-3 group">
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
              href="/"
              className={`inline-flex items-center gap-2 transition-colors duration-300 ${
                isDarkMode 
                  ? "text-gray-400 hover:text-amber-400" 
                  : "text-gray-600 hover:text-amber-600"
              }`}
            >
              <ArrowLeftIcon size={16} />
              Back to Home
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
            Admin Authentication
          </h1>
          <p className={`transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Enter your admin credentials to access the management panel
          </p>
        </div>

        {/* Login Card */}
        <div className={`rounded-2xl shadow-xl border transition-all duration-500 overflow-hidden ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}>
          {/* Gradient Border */}
          <div className={`h-1 ${
            isDarkMode ? "bg-gradient-to-r from-amber-500/30 via-blue-500/30 to-purple-500/30" : "bg-gradient-to-r from-amber-500 via-blue-500 to-purple-500"
          }`} />
          
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
                    Password: admin123
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    } ${errors.email ? "border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="admin@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircleIcon size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`block text-sm font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push("/admin/auth/forgot-password")}
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? "text-amber-400 hover:text-amber-300" 
                        : "text-amber-600 hover:text-amber-700"
                    }`}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon 
                      size={20} 
                      className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                      isDarkMode
                        ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20"
                        : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                    } ${errors.password ? "border-red-500 focus:ring-red-500/20" : ""}`}
                    placeholder="••••••••"
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
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircleIcon size={14} />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                      rememberMe
                        ? "bg-amber-500 border-amber-500"
                        : isDarkMode 
                          ? "bg-gray-700 border-gray-600" 
                          : "bg-white border-gray-300"
                    }`}
                  >
                    {rememberMe && (
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

              {/* Submit Error */}
              {errors.submit && (
                <div className={`px-4 py-3 rounded-lg text-sm transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-red-900/30 border border-red-800 text-red-300" 
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}>
                  {errors.submit}
                </div>
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
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogInIcon size={18} />
                    Sign in to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
               <div className={`mt-8 pt-8 border-t transition-colors duration-500 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <p className={`text-center transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Don't have an account?{" "}
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
            Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}