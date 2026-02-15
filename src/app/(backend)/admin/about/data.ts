// app/(backend)/admin/about/data.ts
export interface AboutData {
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
}

export const mockAboutData: AboutData = {
  hero: {
    title: "Building Dreams, Creating Legacies",
    subtitle: "For over 15 years, LuxeProperties has been the trusted name in luxury real estate. We don't just sell properties; we craft exceptional living experiences and build lasting relationships."
  },
  story: {
    title: "Our Journey in Real Estate",
    content: [
      "Founded in 2009, LuxeProperties began with a simple vision: to transform the real estate experience through exceptional service and unwavering integrity. What started as a small team of passionate agents has grown into one of the most respected names in luxury real estate.",
      "Over the years, we've helped thousands of clients find their dream homes and make smart investment decisions. Our commitment to excellence has earned us numerous awards and, more importantly, the trust of our community.",
      "Today, we continue to innovate and adapt to the changing market while staying true to our core values. We believe that every property has a story, and we're honored to help our clients write their next chapter."
    ]
  },
  mission: "To provide exceptional real estate services that exceed client expectations through integrity, innovation, and personalized attention.",
  vision: "To be the most trusted and innovative real estate company, setting new standards for excellence in every market we serve.",
  values: [
    {
      title: "Integrity First",
      description: "We conduct business with honesty and transparency, always putting our clients' interests first."
    },
    {
      title: "Excellence Always",
      description: "We strive for excellence in every interaction, from market analysis to closing deals."
    },
    {
      title: "Client-Centric",
      description: "Our clients are at the heart of everything we do, receiving personalized attention and tailored solutions."
    },
    {
      title: "Innovation Driven",
      description: "We embrace technology and innovation to provide the best possible service and market insights."
    }
  ],
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "2,500+", label: "Properties Sold" },
    { value: "50+", label: "Industry Awards" },
    { value: "98%", label: "Client Satisfaction" }
  ]
};

// Helper function to get about data
export const getAboutData = (): AboutData => {
  return mockAboutData;
};

// Helper function to update about data (would connect to API in real app)
export const updateAboutData = (data: AboutData): AboutData => {
  // In a real app, this would make an API call
  console.log('Updating about data:', data);
  return data;
};