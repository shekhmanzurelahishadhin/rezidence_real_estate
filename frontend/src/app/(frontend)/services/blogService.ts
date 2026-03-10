// app/(frontend)/services/blogService.ts
import { apiRequest } from '@/app/lib/api';
import { Blog, BlogComment, BlogStats } from '@/app/(frontend)/types/blog';

class FrontendBlogService {
  // Get all published blogs
  async getBlogs(params?: {
    search?: string;
    category?: string;
    tag?: string;
    featured?: boolean;
    sort_by?: 'newest' | 'oldest' | 'popular' | 'trending';
    per_page?: number;
    page?: number;
  }): Promise<{ data: Blog[]; meta: any }> {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.featured) queryParams.append('featured', '1');
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    const response = await apiRequest(`/public/blogs${queryString}`, {
      method: 'GET',
    }, 'client');
    
    return response.data;
  }

  // Get single blog by slug
  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const response = await apiRequest(`/public/blogs/${slug}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || null;
  }

  // Get featured blogs
  async getFeaturedBlogs(limit: number = 3): Promise<Blog[]> {
    const response = await apiRequest(`/public/blogs/featured?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Get trending blogs
  async getTrendingBlogs(limit: number = 4): Promise<Blog[]> {
    const response = await apiRequest(`/public/blogs/trending?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Get related blogs
  async getRelatedBlogs(blogId: number, categoryId: number, limit: number = 3): Promise<Blog[]> {
    const response = await apiRequest(`/public/blogs/${blogId}/related?limit=${limit}`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Get blog comments
  async getBlogComments(blogId: number): Promise<BlogComment[]> {
    const response = await apiRequest(`/public/blogs/${blogId}/comments`, {
      method: 'GET',
    }, 'client');
    
    return response.data || [];
  }

  // Post a comment
  async postComment(blogId: number, data: { name: string; email?: string; comment: string }): Promise<BlogComment> {
    const response = await apiRequest(`/public/blogs/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, 'client');
    
    return response.data;
  }

  // Like a blog
  async likeBlog(blogId: number): Promise<{ likes: number }> {
    const response = await apiRequest(`/public/blogs/${blogId}/like`, {
      method: 'POST',
    }, 'client');
    
    return response.data;
  }

  // Get blog stats
  async getBlogStats(): Promise<BlogStats> {
    const response = await apiRequest('/public/blogs/stats', {
      method: 'GET',
    }, 'client');
    
    return response.data;
  }
}

export const frontendBlogService = new FrontendBlogService();