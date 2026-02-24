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
  const token = localStorage.getItem(`${userType}_token`);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
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
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}