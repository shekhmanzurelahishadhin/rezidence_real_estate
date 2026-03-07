// app/(frontend)/services/categoryService.ts
import { apiRequest } from '@/app/lib/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  image: string | null;
  image_url: string | null;
  status: 'active' | 'inactive' | 'pending' | 'archived';
  featured: boolean;
  property_count: number;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

class FrontendCategoryService {
  // Use PUBLIC routes for frontend - no authentication required
  async getActiveCategories(params?: {
    search?: string;
    per_page?: number;
    page?: number;
    sort_by?: string;
    featured?: boolean;
  }): Promise<PaginatedResponse<Category>> {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.featured) queryParams.append('featured', '1');
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    // Use public endpoint instead of admin
    const response = await apiRequest(`/public/categories${queryString}`, {
      method: 'GET',
    }, 'client'); // 'client' type for public routes
    
    return response.data;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    // Use public endpoint
    const response = await apiRequest(`/public/categories/${slug}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || null;
  }

  async getFeaturedCategories(limit: number = 6): Promise<Category[]> {
    // Use public endpoint for featured categories
    const response = await apiRequest(`/public/categories/featured?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }
}

export const frontendCategoryService = new FrontendCategoryService();