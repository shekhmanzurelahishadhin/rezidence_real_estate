// services/about.service.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface AboutData {
  id?: number;
  hero: {
    title: string;
    subtitle: string;
  };
  story: {
    title: string;
    content: string[];
  };
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  created_by?: {
    id: number;
    name: string;
    email: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: any;
}

export class AboutService {
  private static getHeaders(token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private static handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(errorData.message || 'Request failed');
      });
    }
    return response.json();
  }

  // Public endpoint
  static async getPublicData(): Promise<AboutData> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/about`, {
        method: 'GET',
        headers: this.getHeaders(),
        cache: 'no-store'
      });

      const result = await this.handleResponse<AboutData>(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching public about data:', error);
      throw error;
    }
  }

  // Admin endpoints
  static async getAdminData(token: string): Promise<AboutData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/about`, {
        method: 'GET',
        headers: this.getHeaders(token),
        cache: 'no-store'
      });

      const result = await this.handleResponse<AboutData | null>(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching admin about data:', error);
      throw error;
    }
  }

  static async saveAboutData(token: string, data: AboutData): Promise<AboutData> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/about`, {
        method: 'POST',
        headers: this.getHeaders(token),
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<AboutData>(response);
      return result.data;
    } catch (error) {
      console.error('Error saving about data:', error);
      throw error;
    }
  }

  static async getHistory(token: string): Promise<AboutData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/about/history`, {
        method: 'GET',
        headers: this.getHeaders(token),
        cache: 'no-store'
      });

      const result = await this.handleResponse<AboutData[]>(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  }

  static async getVersion(token: string, id: number): Promise<AboutData> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/about/${id}`, {
        method: 'GET',
        headers: this.getHeaders(token),
        cache: 'no-store'
      });

      const result = await this.handleResponse<AboutData>(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching version:', error);
      throw error;
    }
  }

  static async getStats(token: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/about/stats`, {
        method: 'GET',
        headers: this.getHeaders(token),
        cache: 'no-store'
      });

      const result = await this.handleResponse<any>(response);
      return result.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
}