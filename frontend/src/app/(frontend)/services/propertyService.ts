// app/(frontend)/services/propertyService.ts
import { apiRequest } from '@/app/lib/api';
import { Property } from '@/app/(frontend)/types/property';

class FrontendPropertyService {
  // Get all published properties
  async getProperties(params?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    search?: string;
    sort_by?: 'newest' | 'oldest' | 'price_high' | 'price_low' | 'popular';
    per_page?: number;
    page?: number;
  }): Promise<{ data: Property[]; meta: any }> {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params?.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString());
    if (params?.bathrooms) queryParams.append('bathrooms', params.bathrooms.toString());
    if (params?.city) queryParams.append('city', params.city);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    const response = await apiRequest(`/public/properties${queryString}`, {
      method: 'GET',
    }, 'client');
    
    return response.data;
  }

  // Get single property by slug
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const response = await apiRequest(`/public/properties/${slug}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || null;
  }

  // Get featured properties
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    const response = await apiRequest(`/public/properties/featured?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Get similar properties
  async getSimilarProperties(propertyId: number, categoryId: number, limit: number = 3): Promise<Property[]> {
    const response = await apiRequest(`/public/properties/${propertyId}/similar?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Get property by ID (for backward compatibility)
  async getPropertyById(id: number): Promise<Property | null> {
    const response = await apiRequest(`/public/properties/id/${id}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || null;
  }

  // Get unique cities for filter
  async getCities(): Promise<string[]> {
    const response = await apiRequest('/public/properties/cities', {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Get price range
  async getPriceRange(): Promise<{ min: number; max: number }> {
    const response = await apiRequest('/public/properties/price-range', {
      method: 'GET',
    }, 'client');
    
    return response.data || { min: 0, max: 10000000 };
  }

  // Schedule a tour
  async scheduleTour(propertyId: number, data: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message?: string;
  }): Promise<any> {
    const response = await apiRequest(`/public/properties/${propertyId}/schedule-tour`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'client');
    
    return response.data;
  }

  // Contact agent
  async contactAgent(propertyId: number, data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<any> {
    const response = await apiRequest(`/public/properties/${propertyId}/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'client');
    
    return response.data;
  }
}

export const frontendPropertyService = new FrontendPropertyService();