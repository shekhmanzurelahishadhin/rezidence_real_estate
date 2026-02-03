// D:\server 8.2  new\htdocs\rezidence_real_estate\src\app\(full-width-pages)\(auth)\signin\page.tsx
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
  CheckIcon,
  ArrowRightIcon
} from "@/assets/icons";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (formData.email.includes("@") && formData.password.length >= 6) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  Homely Homes
                </h1>
                <p className="text-gray-500 text-xs">Premium Real Estate</p>
              </div>
            </Link>

            <Link
              href="/"
              className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Welcome Back
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Sign in to your account</h1>
          <p className="text-gray-600">Enter your credentials to access your personalized dashboard</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon size={20} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm text-amber-600 hover:text-amber-700 transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={20} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-300"
                  placeholder="Enter your password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon size={20} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                  rememberMe 
                    ? "bg-amber-500 border-amber-500" 
                    : "bg-white border-gray-300"
                }`}>
                  {rememberMe && <CheckIcon size={12} className="text-white" />}
                </div>
                <span className="text-sm text-gray-700">Remember me</span>
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
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link 
                href="/signup"
                className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 transition-colors duration-300 text-sm"
          >
            Need help? Contact Support
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}