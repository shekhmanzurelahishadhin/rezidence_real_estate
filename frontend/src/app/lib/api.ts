// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  userType: 'admin' | 'client' = 'client'
): Promise<ApiResponse<T>> {
  // Only try to get token if it's not a public route
  const isPublicRoute = endpoint.startsWith('/public/');
  const token = !isPublicRoute ? localStorage.getItem(`${userType}_token`) : null;
  
  // Check if we're sending FormData
  const isFormData = options.body instanceof FormData;
  
  // Create headers
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...options.headers,
  };

  // Only add Authorization if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Only add Content-Type if it's NOT FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized specially
      if (response.status === 401) {
        console.error('Authentication failed for endpoint:', endpoint);
      }
      
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (error) {
    console.error('❌ API Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}