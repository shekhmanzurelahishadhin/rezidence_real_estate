// app/(backend)/types/property.ts
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
  featured_image: string | null;
  featured_image_url: string | null;
  images_url: string[] | null;
  status: 'draft' | 'pending' | 'published' | 'archived';
  featured: boolean;
  views: number;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
  formatted_price?: string;
  formatted_size?: string;
  status_color?: string;
}

export interface PropertyStats {
  total: number;
  published: number;
  featured: number;
  pending: number;
  draft: number;
  archived: number;
  total_views: number;
  average_price: number;
  total_value: number;
}