// app/services/api/categories.ts
import { apiRequest, ApiResponse } from '@/app/lib/api';
import { Category, CategoryStats } from '@/app/(backend)/types/category';

export const categoryService = {
  // Get all categories with filters
  async getCategories(params?: {
    search?: string;
    status?: string;
    sort_by?: string;
    per_page?: number;
    page?: number;
  }): Promise<ApiResponse<{ data: Category[]; meta: any }>> {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    
    return apiRequest(`/admin/categories${queryString}`, {
      method: 'GET',
    }, 'admin');
  },

  // Get single category
  async getCategory(id: number): Promise<ApiResponse<{ data: Category }>> {
    return apiRequest(`/admin/categories/${id}`, {
      method: 'GET',
    }, 'admin');
  },

  // Create category WITHOUT image (JSON)
  async createCategory(data: Record<string, any>): Promise<ApiResponse<{ data: Category }>> {
    console.log('Creating category with JSON:', data);
    return apiRequest('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }, 'admin');
  },

  // Create category WITH image (FormData)
  async createCategoryWithImage(data: FormData): Promise<ApiResponse<{ data: Category }>> {
    console.log('Creating category with FormData');
    return apiRequest('/admin/categories', {
      method: 'POST',
      body: data,
      headers: {} // Let browser set Content-Type
    }, 'admin');
  },

  // Update category WITHOUT image (JSON)
  async updateCategory(id: number, data: Record<string, any>): Promise<ApiResponse<{ data: Category }>> {
    console.log('Updating category with JSON:', data);
    return apiRequest(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }, 'admin');
  },

  // Update category WITH image (FormData)
  async updateCategoryWithImage(id: number, data: FormData): Promise<ApiResponse<{ data: Category }>> {
    console.log('Updating category with FormData');
    return apiRequest(`/admin/categories/${id}`, {
      method: 'POST', // Using POST with _method=PUT in FormData
      body: data,
      headers: {} // Let browser set Content-Type
    }, 'admin');
  },

  // Delete category
  async deleteCategory(id: number): Promise<ApiResponse<null>> {
    return apiRequest(`/admin/categories/${id}`, {
      method: 'DELETE',
    }, 'admin');
  },

  // Bulk delete categories
  async bulkDeleteCategories(ids: number[]): Promise<ApiResponse<null>> {
    return apiRequest('/admin/categories/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    }, 'admin');
  },

  // Toggle featured
  async toggleFeatured(id: number): Promise<ApiResponse<{ data: Category }>> {
    return apiRequest(`/admin/categories/${id}/toggle-featured`, {
      method: 'POST',
    }, 'admin');
  },

  // Update status
  async updateStatus(id: number, status: string): Promise<ApiResponse<{ data: Category }>> {
    return apiRequest(`/admin/categories/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, 'admin');
  },

  // Get dropdown options
  async getDropdown(): Promise<ApiResponse<{ data: Array<{ id: number; name: string; slug: string; property_count: number }> }>> {
    return apiRequest('/admin/categories/dropdown', {
      method: 'GET',
    }, 'admin');
  },

  // Get stats
  async getStats(): Promise<ApiResponse<{ data: CategoryStats }>> {
    return apiRequest('/admin/categories/stats', {
      method: 'GET',
    }, 'admin');
  }
};