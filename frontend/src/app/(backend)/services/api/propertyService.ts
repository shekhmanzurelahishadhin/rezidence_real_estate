// app/(backend)/services/api/propertyService.ts
import { apiRequest, ApiResponse } from '@/app/lib/api';
import { Property, PropertyStats } from '@/app/(backend)/types/property';

export const propertyService = {
  // Get all properties with filters
  async getProperties(params?: {
    search?: string;
    status?: string;
    category_id?: number;
    sort_by?: string;
    per_page?: number;
    page?: number;
    min_price?: number;
    max_price?: number;
  }): Promise<ApiResponse<{ data: Property[]; meta: any }>> {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.min_price) queryParams.append('min_price', params.min_price.toString());
    if (params?.max_price) queryParams.append('max_price', params.max_price.toString());
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    return apiRequest(`/admin/properties${queryString}`, {
      method: 'GET',
    }, 'admin');
  },

  // Get single property
  async getProperty(id: number): Promise<ApiResponse<{ data: Property }>> {
    return apiRequest(`/admin/properties/${id}`, {
      method: 'GET',
    }, 'admin');
  },

  // Create property with FormData
  async createProperty(data: FormData): Promise<ApiResponse<{ data: Property }>> {
    return apiRequest('/admin/properties', {
      method: 'POST',
      body: data,
    }, 'admin');
  },

  // Update property with FormData
  async updateProperty(id: number, data: FormData): Promise<ApiResponse<{ data: Property }>> {
    data.append('_method', 'PUT');
    
    return apiRequest(`/admin/properties/${id}`, {
      method: 'POST',
      body: data,
    }, 'admin');
  },

  // Delete property
  async deleteProperty(id: number): Promise<ApiResponse<null>> {
    return apiRequest(`/admin/properties/${id}`, {
      method: 'DELETE',
    }, 'admin');
  },

  // Bulk delete properties
  async bulkDeleteProperties(ids: number[]): Promise<ApiResponse<null>> {
    return apiRequest('/admin/properties/bulk', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    }, 'admin');
  },

  // Toggle featured
  async toggleFeatured(id: number): Promise<ApiResponse<{ data: Property }>> {
    return apiRequest(`/admin/properties/${id}/toggle-featured`, {
      method: 'POST',
    }, 'admin');
  },

  // Update status
  async updateStatus(id: number, status: string): Promise<ApiResponse<{ data: Property }>> {
    return apiRequest(`/admin/properties/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, 'admin');
  },

  // Remove image
  async removeImage(id: number, imagePath: string): Promise<ApiResponse<{ data: Property }>> {
    return apiRequest(`/admin/properties/${id}/remove-image`, {
      method: 'POST',
      body: JSON.stringify({ image: imagePath }),
    }, 'admin');
  },

  // Get stats
  async getStats(): Promise<ApiResponse<{ data: PropertyStats }>> {
    return apiRequest('/admin/properties/stats', {
      method: 'GET',
    }, 'admin');
  }
};