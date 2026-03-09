// app/(frontend)/services/propertyService.ts
import { apiRequest } from '@/app/lib/api';

export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string;
  category_id: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  parking: string | null;
  features: string[] | null;
  images: string[] | null;
  images_url: string[] | null;
  featured_image: string | null;
  featured_image_url: string | null;
  status: 'draft' | 'pending' | 'published' | 'archived';
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

class FrontendPropertyService {
  async getFeaturedProperties(limit: number = 5): Promise<Property[]> {
    const response = await apiRequest(`/public/properties/featured?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const response = await apiRequest(`/public/properties/${slug}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || null;
  }

  async getProperties(params?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    city?: string;
    search?: string;
    sort_by?: string;
    per_page?: number;
    page?: number;
  }): Promise<{ data: Property[]; meta: any }> {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    if (params?.bedrooms) queryParams.append('bedrooms', params.bedrooms.toString());
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
}

export const frontendPropertyService = new FrontendPropertyService();