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

  async createCategory(data: FormData): Promise<ApiResponse<{ data: Category }>> {
    // IMPORTANT: Don't set any headers - let apiRequest handle it
    return apiRequest('/admin/categories', {
      method: 'POST',
      body: data,
    }, 'admin');
  },

  async updateCategory(id: number, data: FormData): Promise<ApiResponse<{ data: Category }>> {
    // For Laravel update with file
    data.append('_method', 'PUT');
    
    return apiRequest(`/admin/categories/${id}`, {
      method: 'POST', // Using POST with _method=PUT
      body: data,
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