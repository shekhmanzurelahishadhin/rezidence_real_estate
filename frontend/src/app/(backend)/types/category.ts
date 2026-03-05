// app/types/category.ts

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
  status_color?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  icon: string;
  // ✅ Narrowed to only valid Laravel status values (was loose `string`)
  status: 'active' | 'inactive' | 'pending' | 'archived';
  featured: boolean;
  color: string;
  image?: File | string | null;
}

export interface CategoryStats {
  total: number;
  active: number;
  featured: number;
  pending: number;
  total_properties: number;
}

// ✅ Pagination meta shape returned by Laravel's paginate()
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

// ✅ Paginated response shape (data is a nested Laravel paginator object)
export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

// ✅ ApiResponse now handles both success and error states properly
export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      message: string;
      errors?: never;
    }
  | {
      success: false;
      data?: never;
      message: string;
      // ✅ Typed as Record so you can safely do response.errors['field']
      errors?: Record<string, string[]>;
    };