// app/(backend)/admin/team/data.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  experience: number;
  specialties: string[];
  email: string;
  phone: string;
  image: string;
  social: {
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
  active: boolean;
  order: number;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    department: "Executive Leadership",
    bio: "With over 20 years of experience in luxury real estate, Sarah has built a reputation for excellence and integrity. She leads the company with a vision for innovation and client-centric service.",
    experience: 20,
    specialties: ["Luxury Properties", "Strategic Planning", "Business Development"],
    email: "sarah.johnson@luxeproperties.com",
    phone: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      instagram: "https://instagram.com/sarahjohnson",
      facebook: "https://facebook.com/sarahjohnson"
    },
    active: true,
    order: 0
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Chief Investment Officer",
    department: "Executive Leadership",
    bio: "Michael brings 15 years of investment expertise to the team. His deep understanding of market trends and financial analysis has helped countless clients make profitable real estate investments.",
    experience: 15,
    specialties: ["Investment Analysis", "Market Research", "Portfolio Management"],
    email: "michael.chen@luxeproperties.com",
    phone: "+1 (555) 234-5678",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen",
      instagram: "",
      facebook: ""
    },
    active: true,
    order: 1
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    role: "Head of Luxury Sales",
    department: "Sales",
    bio: "Emma's passion for architecture and design, combined with her exceptional sales skills, makes her the perfect leader for our luxury division. She has closed over $500M in luxury properties.",
    experience: 12,
    specialties: ["Luxury Sales", "Client Relations", "Negotiation"],
    email: "emma.rodriguez@luxeproperties.com",
    phone: "+1 (555) 345-6789",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "https://linkedin.com/in/emmarodriguez",
      twitter: "",
      instagram: "https://instagram.com/emmarodriguez",
      facebook: ""
    },
    active: true,
    order: 2
  },
  {
    id: "4",
    name: "David Kim",
    role: "Director of Operations",
    department: "Operations",
    bio: "David ensures that every transaction runs smoothly from start to finish. His attention to detail and operational expertise have streamlined our processes and enhanced client satisfaction.",
    experience: 10,
    specialties: ["Operations Management", "Process Optimization", "Team Leadership"],
    email: "david.kim@luxeproperties.com",
    phone: "+1 (555) 456-7890",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: "https://twitter.com/davidkim",
      instagram: "",
      facebook: ""
    },
    active: true,
    order: 3
  }
];

// Helper functions
export const getActiveTeamMembers = (): TeamMember[] => {
  return mockTeamMembers.filter(m => m.active).sort((a, b) => a.order - b.order);
};

export const getTeamMembersByDepartment = (department: string): TeamMember[] => {
  return mockTeamMembers.filter(m => m.department === department);
};

export const getDepartments = (): string[] => {
  return Array.from(new Set(mockTeamMembers.map(m => m.department)));
};

export const getTotalExperience = (): number => {
  return mockTeamMembers.reduce((sum, m) => sum + m.experience, 0);
};