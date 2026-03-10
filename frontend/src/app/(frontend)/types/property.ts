// app/(frontend)/types/property.ts
export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
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
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  views: number;
  year_built?: number;
  lot_size?: number;
  property_type: string;
  agent_id?: number;
  agent?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    position?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface PropertyStats {
  total: number;
  published: number;
  featured: number;
  total_views: number;
  average_price: number;
}