// components/AuthLoader.tsx
import React from 'react';

interface AuthLoaderProps {
  isDarkMode: boolean;
  message?: string;
}

const AuthLoader: React.FC<AuthLoaderProps> = ({ 
  isDarkMode, 
  message = "Redirecting to login..." 
}) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center transition-all duration-500 z-50 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="text-center">
        {/* Animated loader */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Outer ring */}
            <div className={`w-16 h-16 rounded-full border-4 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              {/* Spinning inner ring */}
              <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
                isDarkMode ? "border-blue-400" : "border-blue-600"
              } absolute top-0 left-0`}></div>
            </div>
            {/* Center dot */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
              isDarkMode ? "bg-blue-400" : "bg-blue-600"
            }`}></div>
          </div>
        </div>
        
        {/* Animated text */}
        <div className="space-y-2">
          <p className={`text-sm font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            {message}
          </p>
          <div className="flex justify-center space-x-1">
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
              isDarkMode ? "bg-blue-400" : "bg-blue-600"
            }`} style={{ animationDelay: "0ms" }}></div>
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
              isDarkMode ? "bg-blue-400" : "bg-blue-600"
            }`} style={{ animationDelay: "150ms" }}></div>
            <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
              isDarkMode ? "bg-blue-400" : "bg-blue-600"
            }`} style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoader;