// app/(backend)/admin/blogs/data.ts

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  author: string;
  readTime: number;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  tags: string[];
  keyPoints: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
}

export const blogCategories = [
  "Investment",
  "Market Trends", 
  "Home Buying",
  "Luxury",
  "Commercial",
  "Interior Design",
  "Legal Advice",
  "Property Management"
];

export const blogStatuses = [
  { value: 'draft', label: 'Draft', color: 'bg-yellow-500' },
  { value: 'published', label: 'Published', color: 'bg-green-500' },
  { value: 'archived', label: 'Archived', color: 'bg-gray-500' }
];

// Sample blog data
export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Future of Real Estate: Trends to Watch in 2024',
    excerpt: 'Discover the emerging trends that will shape the real estate market in the coming year.',
    body: [
      'The real estate market is constantly evolving, and 2024 promises to bring significant changes driven by technology, sustainability, and shifting consumer preferences.',
      'One of the most notable trends is the rise of smart homes. With advancements in IoT and AI, properties are becoming more connected and efficient than ever before.',
      'Sustainability is no longer a luxury but a necessity. Green buildings with energy-efficient systems are gaining popularity among both buyers and investors.',
      'Remote work continues to influence housing choices, with more people seeking homes with dedicated office spaces and better work-life balance environments.',
      'Urbanization patterns are shifting, with a growing interest in suburban and rural properties that offer more space and affordability.'
    ],
    category: 'Market Trends',
    author: 'Sarah Johnson',
    readTime: 8,
    status: 'published',
    featured: true,
    tags: ['Real Estate', 'Trends', '2024', 'Technology', 'Sustainability'],
    keyPoints: [
      'Smart home integration becoming standard',
      'Sustainable construction on the rise',
      'Remote work influencing location choices',
      'Suburban markets gaining momentum',
      'Technology streamlining transactions'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    views: 1250,
    likes: 89,
    comments: 24
  },
  {
    id: '2',
    title: 'Investment Strategies for First-Time Real Estate Investors',
    excerpt: 'A comprehensive guide to getting started with real estate investment.',
    body: [
      'Real estate investment can be intimidating for beginners, but with the right strategy, it can be highly rewarding.',
      'Start by defining your investment goals. Are you looking for rental income, long-term appreciation, or both?',
      'Location is everything in real estate. Research markets with strong growth potential, good infrastructure, and stable employment rates.',
      'Financial preparation is crucial. Understand your budget, explore financing options, and always maintain an emergency fund.',
      'Consider starting with REITs or crowdfunding platforms if direct property investment seems daunting.'
    ],
    category: 'Investment',
    author: 'Michael Chen',
    readTime: 6,
    status: 'published',
    featured: true,
    tags: ['Investment', 'Beginners', 'Strategy', 'Finance', 'REITs'],
    keyPoints: [
      'Define clear investment objectives',
      'Research markets thoroughly',
      'Secure proper financing',
      'Start small and scale gradually',
      'Consider alternative investment vehicles'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    views: 890,
    likes: 67,
    comments: 18
  },
  {
    id: '3',
    title: 'Luxury Property Buying Guide: What to Look For',
    excerpt: 'Essential considerations when investing in high-end real estate.',
    body: [
      'Purchasing luxury property involves unique considerations beyond typical real estate transactions.',
      'Prime location is non-negotiable. Look for properties in established, prestigious neighborhoods with proven value retention.',
      'Quality of construction and materials is paramount in luxury homes. Pay attention to craftsmanship and premium finishes.',
      'Privacy and security features are often top priorities for luxury buyers, including gated communities and advanced security systems.',
      'Lifestyle amenities such as smart home technology, wellness facilities, and entertainment spaces add significant value.'
    ],
    category: 'Luxury',
    author: 'Robert Williams',
    readTime: 7,
    status: 'published',
    featured: false,
    tags: ['Luxury', 'High-End', 'Investment', 'Premium', 'Amenities'],
    keyPoints: [
      'Location is the most important factor',
      'Quality construction and materials',
      'Enhanced privacy and security',
      'Premium amenities and features',
      'Long-term value retention'
    ],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2024-01-05T11:45:00Z',
    updatedAt: '2024-01-05T11:45:00Z',
    views: 540,
    likes: 42,
    comments: 12
  },
  {
    id: '4',
    title: 'Sustainable Living: Green Features That Increase Home Value',
    excerpt: 'How eco-friendly upgrades can boost your property value.',
    body: [
      'Sustainability is becoming a major factor in home valuation and buyer decisions.',
      'Energy-efficient systems like solar panels, smart thermostats, and LED lighting can significantly reduce utility costs.',
      'Water conservation features such as rainwater harvesting systems and low-flow fixtures are increasingly popular.',
      'Sustainable materials like bamboo flooring, recycled countertops, and non-toxic paints appeal to environmentally conscious buyers.',
      'Green certifications like LEED or Energy Star ratings can command premium prices in the market.'
    ],
    category: 'Interior Design',
    author: 'Emma Rodriguez',
    readTime: 5,
    status: 'published',
    featured: false,
    tags: ['Sustainability', 'Green', 'Eco-Friendly', 'Energy', 'Value'],
    keyPoints: [
      'Energy efficiency reduces costs',
      'Water conservation is valuable',
      'Sustainable materials are in demand',
      'Certifications increase credibility',
      'Green features attract premium buyers'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2024-01-03T09:15:00Z',
    updatedAt: '2024-01-03T09:15:00Z',
    views: 320,
    likes: 28,
    comments: 8
  },
  {
    id: '5',
    title: 'Commercial Real Estate: Navigating Office Space Trends',
    excerpt: 'Understanding the changing landscape of commercial properties post-pandemic.',
    body: [
      'The commercial real estate sector has undergone significant transformation in recent years.',
      'Hybrid work models have changed office space requirements, with more emphasis on flexible layouts and collaboration spaces.',
      'Sustainability is now a key consideration for corporate tenants, affecting both new constructions and renovations.',
      'Technology integration for smart buildings has become standard, improving efficiency and tenant experience.',
      'Location strategies are evolving, with many companies seeking suburban or mixed-use developments.'
    ],
    category: 'Commercial',
    author: 'David Kim',
    readTime: 6,
    status: 'draft',
    featured: false,
    tags: ['Commercial', 'Office', 'Business', 'Workplace', 'Trends'],
    keyPoints: [
      'Flexible office layouts are essential',
      'Sustainability drives tenant decisions',
      'Smart building technology is standard',
      'Location strategies are evolving',
      'Hybrid work impacts space needs'
    ],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2024-01-01T16:40:00Z',
    updatedAt: '2024-01-02T10:20:00Z',
    views: 0,
    likes: 0,
    comments: 0
  },
  {
    id: '6',
    title: 'Legal Considerations When Buying Property Abroad',
    excerpt: 'Important legal aspects to consider for international real estate investments.',
    body: [
      'Investing in foreign real estate offers opportunities but comes with complex legal considerations.',
      'Understanding local property laws and regulations is essential before making any commitments.',
      'Tax implications vary significantly between countries and can affect your overall return on investment.',
      'Currency exchange risks and international transfer regulations need careful planning.',
      'Working with local legal experts who understand both local laws and international investment is highly recommended.'
    ],
    category: 'Legal Advice',
    author: 'Jennifer Lee',
    readTime: 9,
    status: 'published',
    featured: false,
    tags: ['Legal', 'International', 'Investment', 'Tax', 'Regulations'],
    keyPoints: [
      'Research local property laws thoroughly',
      'Understand tax implications',
      'Consider currency exchange risks',
      'Use local legal expertise',
      'Plan for cross-border transactions'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2023-12-28T13:25:00Z',
    updatedAt: '2023-12-30T15:10:00Z',
    views: 410,
    likes: 31,
    comments: 15
  },
  {
    id: '7',
    title: 'Interior Design Tips for Small Spaces',
    excerpt: 'Maximizing functionality and style in compact living areas.',
    body: [
      'Small spaces can feel spacious and luxurious with the right design approach.',
      'Multifunctional furniture is key in compact areas. Look for pieces that serve multiple purposes.',
      'Light colors and strategic lighting can create the illusion of more space and improve mood.',
      'Vertical storage solutions maximize floor space while keeping essentials organized.',
      'Mirrors strategically placed can reflect light and make rooms appear larger.'
    ],
    category: 'Interior Design',
    author: 'Olivia Martinez',
    readTime: 4,
    status: 'published',
    featured: false,
    tags: ['Design', 'Small Spaces', 'Interior', 'Organization', 'Decor'],
    keyPoints: [
      'Use multifunctional furniture',
      'Light colors expand visual space',
      'Maximize vertical storage',
      'Strategic lighting enhances space',
      'Mirrors create depth'
    ],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2023-12-25T10:00:00Z',
    updatedAt: '2023-12-25T10:00:00Z',
    views: 280,
    likes: 35,
    comments: 9
  },
  {
    id: '8',
    title: 'Property Management Best Practices',
    excerpt: 'Effective strategies for maintaining and maximizing rental property value.',
    body: [
      'Good property management is essential for preserving asset value and ensuring tenant satisfaction.',
      'Regular maintenance prevents costly repairs and keeps properties in top condition.',
      'Clear communication with tenants builds trust and reduces conflicts.',
      'Staying updated with local regulations and compliance requirements is crucial.',
      'Technology tools can streamline rent collection, maintenance requests, and communication.'
    ],
    category: 'Property Management',
    author: 'Thomas Wilson',
    readTime: 5,
    status: 'archived',
    featured: false,
    tags: ['Management', 'Rental', 'Maintenance', 'Tenants', 'Operations'],
    keyPoints: [
      'Preventive maintenance saves money',
      'Clear tenant communication is vital',
      'Stay compliant with regulations',
      'Use technology for efficiency',
      'Regular property inspections'
    ],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdAt: '2023-12-20T08:45:00Z',
    updatedAt: '2023-12-22T14:30:00Z',
    views: 190,
    likes: 22,
    comments: 7
  }
];

// Helper functions
export const getBlogById = (id: string): Blog | undefined => {
  return sampleBlogs.find(blog => blog.id === id);
};

export const getBlogsByStatus = (status: Blog['status']): Blog[] => {
  return sampleBlogs.filter(blog => blog.status === status);
};

export const getFeaturedBlogs = (): Blog[] => {
  return sampleBlogs.filter(blog => blog.featured);
};

export const getBlogsByCategory = (category: string): Blog[] => {
  return sampleBlogs.filter(blog => blog.category === category);
};

export const getCategoriesWithCount = () => {
  const categoryCounts: Record<string, number> = {};
  
  sampleBlogs.forEach(blog => {
    categoryCounts[blog.category] = (categoryCounts[blog.category] || 0) + 1;
  });
  
  return blogCategories.map(category => ({
    name: category,
    count: categoryCounts[category] || 0
  }));
};

export const getStatusStats = () => {
  const stats = {
    draft: 0,
    published: 0,
    archived: 0
  };
  
  sampleBlogs.forEach(blog => {
    stats[blog.status]++;
  });
  
  return stats;
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};