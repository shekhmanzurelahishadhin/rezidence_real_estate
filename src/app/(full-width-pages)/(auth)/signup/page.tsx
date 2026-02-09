"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  BuildingIcon,
  ArrowRightIcon,
  SunIcon,
  MoonIcon,
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "buyer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-email");
    }, 1500);
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (password.length === 0)
      return { score: 0, color: isDarkMode ? "bg-gray-700" : "bg-gray-200", text: "" };
    if (password.length < 4)
      return { score: 1, color: "bg-red-400", text: "Weak" };
    if (password.length < 8)
      return { score: 2, color: "bg-amber-400", text: "Fair" };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean,
    ).length;

    if (score === 1) return { score: 2, color: "bg-amber-400", text: "Fair" };
    if (score === 2) return { score: 3, color: "bg-amber-500", text: "Good" };
    if (score >= 3) return { score: 4, color: "bg-green-500", text: "Strong" };
    return { score: 1, color: "bg-red-400", text: "Weak" };
  };

  const strength = passwordStrength();

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
              ? "bg-amber-900/30 text-amber-300" 
              : "bg-amber-50 text-amber-700"
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              isDarkMode ? "bg-amber-400" : "bg-amber-400"
            }`} />
            Create Account
          </div>
          <h1 className={`text-3xl font-bold mb-3 transition-colors duration-500 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Create your account
          </h1>
          <p className={`transition-colors duration-500 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Join thousands of real estate enthusiasts and professionals
          </p>
        </div>

        <div className={`rounded-2xl shadow-sm p-8 transition-all duration-500 ${
          isDarkMode 
            ? "bg-gray-800 border border-gray-700" 
            : "bg-white border border-gray-200"
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className={`px-4 py-3 rounded-lg text-sm transition-all duration-500 ${
                isDarkMode 
                  ? "bg-red-900/30 border border-red-800 text-red-300" 
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}>
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon 
                    size={20} 
                    className={isDarkMode ? "text-gray-500" : "text-gray-400"} 
                  />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                  }`}
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
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
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* User Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["buyer", "seller", "investor", "agent"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: type })}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 ${
                      formData.userType === type
                        ? isDarkMode
                          ? "bg-amber-900/30 border-amber-500 text-amber-300"
                          : "bg-amber-50 border-amber-500 text-amber-700"
                        : isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <BuildingIcon size={16} />
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                  }`}
                  placeholder="At least 8 characters"
                  minLength={8}
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

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className={`transition-colors duration-500 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Password strength
                    </span>
                    <span
                      className={`font-medium ${
                        strength.score <= 2
                          ? "text-red-500"
                          : strength.score === 3
                            ? "text-amber-500"
                            : "text-green-500"
                      }`}
                    >
                      {strength.text}
                    </span>
                  </div>
                  <div className={`h-1 rounded-full overflow-hidden transition-colors duration-500 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <div className={`mt-2 text-xs space-y-1 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckIcon
                        size={12}
                        className={`${
                          formData.password.length >= 8
                            ? "text-green-500"
                            : isDarkMode ? "text-gray-600" : "text-gray-300"
                        }`}
                      />
                      At least 8 characters
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon
                        size={12}
                        className={`${
                          /[A-Z]/.test(formData.password)
                            ? "text-green-500"
                            : isDarkMode ? "text-gray-600" : "text-gray-300"
                        }`}
                      />
                      One uppercase letter
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckIcon
                        size={12}
                        className={`${
                          /\d/.test(formData.password)
                            ? "text-green-500"
                            : isDarkMode ? "text-gray-600" : "text-gray-300"
                        }`}
                      />
                      One number
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password
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
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/20" 
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:ring-amber-100"
                  }`}
                  placeholder="Confirm your password"
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
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAgreeTerms(!agreeTerms)}
                className="flex items-start gap-3"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-all duration-300 ${
                    agreeTerms
                      ? "bg-amber-500 border-amber-500"
                      : isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white border-gray-300"
                  }`}
                >
                  {agreeTerms && <CheckIcon size={12} className="text-white" />}
                </div>
                <div className="text-left">
                  <span className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className={`font-medium transition-colors duration-300 ${
                        isDarkMode 
                          ? "text-amber-400 hover:text-amber-300" 
                          : "text-amber-600 hover:text-amber-700"
                      }`}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className={`font-medium transition-colors duration-300 ${
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className={`mt-8 pt-8 border-t transition-colors duration-500 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <p className={`text-center transition-colors duration-500 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Already have an account?{" "}
              <Link
                href="/signin"
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

          {/* Terms */}
          <p className={`mt-6 text-center text-sm transition-colors duration-500 ${
            isDarkMode ? "text-gray-500" : "text-gray-500"
          }`}>
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "text-amber-400 hover:text-amber-300" 
                  : "text-amber-600 hover:text-amber-700"
              }`}
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "text-amber-400 hover:text-amber-300" 
                  : "text-amber-600 hover:text-amber-700"
              }`}
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 text-sm transition-colors duration-300 ${
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