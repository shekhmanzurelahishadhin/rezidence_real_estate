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
  
  // Check if we're sending FormData
  const isFormData = options.body instanceof FormData;
  
  // Create headers - don't set Content-Type for FormData
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  // Only add Content-Type if it's NOT FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  // Log the request for debugging
  console.log(`🌐 API Request: ${options.method || 'GET'} ${API_BASE_URL}${endpoint}`);
  console.log('Headers:', headers);
  if (isFormData) {
    console.log('Body: FormData with fields:', [...(options.body as FormData).keys()]);
  } else if (options.body) {
    console.log('Body:', options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();
    console.log('📦 API Response:', { status: response.status, data });

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
    console.error('❌ API Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}