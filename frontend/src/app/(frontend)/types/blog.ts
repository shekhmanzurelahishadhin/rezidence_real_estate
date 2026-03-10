// app/(frontend)/types/blog.ts
export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  category_id: number;
  author: string;
  author_id: number;
  author_avatar?: string;
  featured_image: string | null;
  featured_image_url: string | null;
  images: string[] | null;
  images_url: string[] | null;
  tags: string[];
  key_points: string[];
  read_time: number;
  views: number;
  likes: number;
  comments_count: number;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface BlogComment {
  id: number;
  blog_id: number;
  user_id: number | null;
  user_name: string;
  user_avatar?: string;
  content: string;
  likes: number;
  created_at: string;
}

export interface BlogStats {
  total: number;
  published: number;
  featured: number;
  views: number;
}