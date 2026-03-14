// app/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  StarIcon,
  UsersIcon,
  ShieldCheckIcon,
  AwardIcon,
  TrendingUpIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  HeartIcon,
  BuildingIcon,
  TargetIcon,
  GlobeIcon,
  CheckCircleIcon,
  LoaderIcon,
  AlertCircleIcon
} from "@/assets/icons";
import { useTheme } from "@/app/ThemeProvider";
import { AboutService, AboutData } from "@/app/(backend)/services/api/about.service";

// Unsplash images (fallback images if API data doesn't include images)
const IMAGES = {
  team: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  meeting: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  founder: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
  agent1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  agent2: "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80",
  agent3: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
};

// Default data in case API fails
const defaultStats = [
  { value: "15+", label: "Years Experience", icon: <AwardIcon size={24} className="text-amber-500" /> },
  { value: "500+", label: "Properties Sold", icon: <HomeIcon size={24} className="text-amber-500" /> },
  { value: "98%", label: "Client Satisfaction", icon: <StarIcon size={24} className="text-amber-500" /> },
  { value: "$2.5B+", label: "Total Value Sold", icon: <TrendingUpIcon size={24} className="text-amber-500" /> },
];

const defaultValues = [
  {
    title: "Integrity First",
    description: "We believe in complete transparency and honesty in all our dealings.",
    icon: <ShieldCheckIcon size={28} className="text-amber-500" />,
    lightColor: "from-amber-50 to-orange-50",
    darkColor: "from-amber-900/20 to-orange-900/20",
  },
  {
    title: "Client Focused",
    description: "Your goals are our priority. We tailor our services to your unique needs.",
    icon: <HeartIcon size={28} className="text-amber-500" />,
    lightColor: "from-blue-50 to-cyan-50",
    darkColor: "from-blue-900/20 to-cyan-900/20",
  },
  {
    title: "Market Excellence",
    description: "Deep market knowledge and cutting-edge insights for optimal results.",
    icon: <TargetIcon size={28} className="text-amber-500" />,
    lightColor: "from-green-50 to-emerald-50",
    darkColor: "from-green-900/20 to-emerald-900/20",
  },
  {
    title: "Global Reach",
    description: "Connecting clients with opportunities across international markets.",
    icon: <GlobeIcon size={28} className="text-amber-500" />,
    lightColor: "from-purple-50 to-violet-50",
    darkColor: "from-purple-900/20 to-violet-900/20",
  },
];

const defaultTeamMembers = [
  {
    name: "Michael Rodriguez",
    role: "Founder & CEO",
    image: IMAGES.founder,
    experience: "20+ years in luxury real estate",
    specialties: ["Luxury Estates", "Commercial Properties", "International Markets"],
  },
  {
    name: "Sarah Chen",
    role: "Lead Agent",
    image: IMAGES.agent1,
    experience: "12+ years experience",
    specialties: ["Modern Homes", "Interior Design", "Property Staging"],
  },
  {
    name: "Jessica Williams",
    role: "Investment Specialist",
    image: IMAGES.agent2,
    experience: "15+ years experience",
    specialties: ["Investment Properties", "Portfolio Management", "Market Analysis"],
  },
  {
    name: "David Kim",
    role: "Legal Consultant",
    image: IMAGES.agent3,
    experience: "18+ years experience",
    specialties: ["Legal Compliance", "Contract Negotiation", "Due Diligence"],
  },
];

const timeline = [
  { year: "2010", title: "Founded", description: "Started with a single office in Beverly Hills" },
  { year: "2013", title: "First $10M Sale", description: "Sold our first luxury estate above $10M" },
  { year: "2016", title: "International Expansion", description: "Expanded services to international markets" },
  { year: "2019", title: "Tech Innovation", description: "Launched proprietary market analysis platform" },
  { year: "2023", title: "Market Leader", description: "Recognized as top luxury real estate agency" },
];

export default function AboutPage() {
  const { isDarkMode } = useTheme();
  const [visible, setVisible] = useState(false);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AboutService.getPublicData();
      setAboutData(data);
    } catch (err) {
      console.error('Error fetching about data:', err);
      setError('Failed to load about us data. Using default content.');
    } finally {
      setLoading(false);
    }
  };

  // Use API data if available, otherwise use defaults
  const stats = aboutData?.stats?.map(stat => ({
    ...stat,
    icon: getIconForStat(stat.label)
  })) || defaultStats;

  const values = aboutData?.values?.map((value, index) => ({
    ...value,
    icon: getIconForValue(index),
    lightColor: getLightColorForValue(index),
    darkColor: getDarkColorForValue(index)
  })) || defaultValues;

  const storyContent = aboutData?.story?.content || [
    "Founded in 2010 by Michael Rodriguez, LuxeProperties began as a boutique agency with a vision to transform the luxury real estate experience. What started as a single office in Beverly Hills has grown into a globally recognized brand.",
    "Our success is built on a foundation of trust, expertise, and an unwavering commitment to our clients' success. We've consistently delivered exceptional results by combining traditional values with innovative approaches."
  ];

  const storyTitle = aboutData?.story?.title || "Redefining Luxury Real Estate";
  const heroTitle = aboutData?.hero?.title || "Building Dreams, Creating Legacies";
  const heroSubtitle = aboutData?.hero?.subtitle || "For over 15 years, LuxeProperties has been the trusted name in luxury real estate. We don't just sell properties; we craft exceptional living experiences and build lasting relationships.";
  const mission = aboutData?.mission || "To provide exceptional real estate services that exceed client expectations through integrity, innovation, and personalized attention.";
  const vision = aboutData?.vision || "To be the most trusted and innovative real estate company, setting new standards for excellence in every market we serve.";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoaderIcon size={48} className="animate-spin text-amber-500 mx-auto mb-4" />
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
            Loading about us information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Error Banner */}
      {error && (
        <div className={`fixed top-20 left-0 right-0 z-50 mx-auto max-w-7xl px-4`}>
          <div className={`rounded-lg p-4 flex items-center gap-3 ${
            isDarkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-50 text-yellow-700"
          }`}>
            <AlertCircleIcon size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden transition-all duration-500"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, #111827 0%, #1e293b 50%, #0f172a 100%)'
            : 'linear-gradient(135deg, #111827 0%, #111827 50%, #1e3a8a 100%)'
        }}
      >
        <div
          className={`absolute inset-0 transition-all duration-500`}
          style={{
            backgroundImage: `url(${IMAGES.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isDarkMode ? 0.15 : 0.2
          }}
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode 
            ? "bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent" 
            : "bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div
            className="transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border transition-all duration-500 ${
              isDarkMode 
                ? "bg-white/5 border-white/10" 
                : "bg-white/10 border-white/20"
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse transition-all duration-500 ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              <span className={`text-sm font-medium tracking-wide transition-colors duration-500 ${
                isDarkMode ? "text-amber-300" : "text-amber-400"
              }`}>
                ABOUT US
              </span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              {heroTitle.split('Creating Legacies')[0]}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Creating Legacies
              </span>
            </h1>

            <p className={`text-xl leading-relaxed max-w-3xl mb-8 transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-300"
            }`}>
              {heroSubtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`backdrop-blur-sm p-3 rounded-xl border transition-all duration-500 ${
                      isDarkMode 
                        ? "bg-white/5 border-white/10" 
                        : "bg-white/10 border-white/20"
                    }`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDarkMode ? "text-gray-300" : "text-gray-300"
                      }`}>{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-white to-gray-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 transition-colors duration-500 ${
                isDarkMode ? "text-amber-400" : "text-amber-600"
              }`}>
                <span className={`w-8 h-0.5 transition-colors duration-500 ${
                  isDarkMode ? "bg-amber-400" : "bg-amber-400"
                }`} />
                OUR STORY
              </span>
              <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {storyTitle}
              </h2>
              {storyContent.map((paragraph, index) => (
                <p key={index} className={`text-lg mb-6 transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get In Touch
                  <ArrowRightIcon size={20} />
                </Link>
                <Link
                  href="/properties"
                  className={`border-2 font-semibold px-8 py-3 rounded-xl transition-all duration-300 text-center ${
                    isDarkMode 
                      ? "border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400" 
                      : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  View Properties
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div
                  className="h-[500px]"
                  style={{
                    backgroundImage: `url(${IMAGES.office})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-gradient-to-t from-gray-900/50 to-transparent" 
                    : "bg-gradient-to-t from-gray-900/40 to-transparent"
                }`} />
                
                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className={`backdrop-blur-sm rounded-2xl p-6 shadow-xl transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gray-800/90 border border-gray-700" 
                      : "bg-white/95"
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <AwardIcon size={28} color="white" />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold transition-colors duration-500 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>Award Winning</div>
                        <div className={`transition-colors duration-500 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>Best Luxury Real Estate Agency 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Element */}
              <div className={`absolute -bottom-6 -right-6 w-48 h-48 rounded-full blur-3xl -z-10 transition-all duration-500 ${
                isDarkMode 
                  ? "bg-gradient-to-br from-amber-400/10 to-orange-500/10" 
                  : "bg-gradient-to-br from-amber-400/20 to-orange-500/20"
              }`} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gray-800" 
          : "bg-gray-50"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className={`p-8 rounded-2xl ${
              isDarkMode 
                ? "bg-gray-700 border border-gray-600" 
                : "bg-white shadow-lg"
            }`}>
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <TargetIcon size={32} className="text-amber-600" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Our Mission
              </h3>
              <p className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {mission}
              </p>
            </div>

            {/* Vision */}
            <div className={`p-8 rounded-2xl ${
              isDarkMode 
                ? "bg-gray-700 border border-gray-600" 
                : "bg-white shadow-lg"
            }`}>
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <GlobeIcon size={32} className="text-amber-600" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Our Vision
              </h3>
              <p className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "from-gray-800 to-gray-900" 
          : "from-gray-50 to-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 transition-colors duration-500 ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}>
              <span className={`w-8 h-0.5 transition-colors duration-500 ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              OUR VALUES
            </span>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              What <span className="text-amber-500">Drives Us</span>
            </h2>
            <p className={`text-lg transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              The principles that guide every decision and action at LuxeProperties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                  isDarkMode 
                    ? "bg-gray-800 border border-gray-700 hover:border-gray-600" 
                    : "bg-white"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                  isDarkMode ? value.darkColor : value.lightColor
                } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>{value.title}</h3>
                <p className={`transition-colors duration-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>{value.description}</p>
                
                {/* Hover line */}
                <div className={`mt-6 pt-4 border-t relative transition-colors duration-500 ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                }`}>
                  <div className="absolute -top-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gray-800" 
          : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 transition-colors duration-500 ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}>
              <span className={`w-8 h-0.5 transition-colors duration-500 ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              OUR JOURNEY
            </span>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Milestones That <span className="text-amber-500">Define Us</span>
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`} />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${
                    index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  }`}>
                    <div className={`inline-block p-6 rounded-2xl ${
                      isDarkMode 
                        ? "bg-gray-700 border border-gray-600" 
                        : "bg-gray-50 shadow-lg"
                    }`}>
                      <span className="text-amber-500 font-bold text-xl mb-2 block">
                        {item.year}
                      </span>
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`py-20 transition-all duration-500 ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-800" 
          : "bg-gradient-to-b from-gray-50 to-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-4 transition-colors duration-500 ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}>
              <span className={`w-8 h-0.5 transition-colors duration-500 ${
                isDarkMode ? "bg-amber-400" : "bg-amber-400"
              }`} />
              MEET THE TEAM
            </span>
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-500 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Expert <span className="text-amber-500">Leadership</span>
            </h2>
            <p className={`text-lg transition-colors duration-500 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Our team of seasoned professionals brings decades of combined experience in luxury real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultTeamMembers.map((member) => (
              <div
                key={member.name}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${
                  isDarkMode 
                    ? "bg-gray-800 border border-gray-700 hover:border-gray-600" 
                    : "bg-white"
                }`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isDarkMode 
                      ? "bg-gradient-to-t from-black/50 to-transparent" 
                      : "bg-gradient-to-t from-black/40 to-transparent"
                  }`} />
                  
                  {/* Social Links (Hover) */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2">
                      {['LinkedIn', 'Twitter'].map((social) => (
                        <button
                          key={social}
                          className={`backdrop-blur-sm p-2 rounded-lg transition-colors duration-300 ${
                            isDarkMode 
                              ? "bg-gray-700/80 hover:bg-gray-700" 
                              : "bg-white/90 hover:bg-white"
                          }`}
                        >
                          <span className={`text-xs font-semibold transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}>{social.charAt(0)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-1 transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>{member.name}</h3>
                  <div className="text-amber-500 font-semibold mb-3">{member.role}</div>
                  <p className={`text-sm mb-4 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>{member.experience}</p>
                  
                  {/* Specialties */}
                  <div className="space-y-2">
                    <div className={`text-sm font-semibold transition-colors duration-500 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>Specialties:</div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-500 ${
                            isDarkMode 
                              ? "bg-amber-900/30 text-amber-300" 
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button className={`mt-6 w-full border py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    isDarkMode 
                      ? "border-gray-700 text-gray-300 hover:border-amber-500 hover:text-amber-400" 
                      : "border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
                  }`}>
                    Contact {member.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(30, 58, 138, 0.8)), url(${IMAGES.meeting})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={`absolute inset-0 transition-all duration-500 ${
            isDarkMode 
              ? "bg-gradient-to-br from-gray-900/95 via-blue-900/85 to-purple-900/85" 
              : "bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/80"
          }`} />
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
            isDarkMode ? "bg-amber-400/5" : "bg-amber-500/10"
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
            isDarkMode ? "bg-blue-400/5" : "bg-blue-500/10"
          }`} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border transition-all duration-500 ${
            isDarkMode 
              ? "bg-white/5 border-white/10" 
              : "bg-white/10 border-white/20"
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse transition-all duration-500 ${
              isDarkMode ? "bg-amber-400" : "bg-amber-400"
            }`} />
            <span className={`text-sm font-semibold tracking-wide transition-colors duration-500 ${
              isDarkMode ? "text-amber-300" : "text-amber-400"
            }`}>
              LET'S WORK TOGETHER
            </span>
          </div>

          <h2 className="text-white text-4xl lg:text-6xl font-bold mb-8">
            Ready to Find Your <span className="text-amber-400">Perfect Property?</span>
          </h2>

          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have trusted us with their real estate journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-10 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
            >
              Schedule Consultation
              <ArrowRightIcon size={22} />
            </Link>
            <Link
              href="/properties"
              className={`backdrop-blur-sm text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 border ${
                isDarkMode 
                  ? "bg-white/5 border-white/10 hover:bg-white/10" 
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
            >
              Browse Properties
            </Link>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/20">
            {[
              { icon: <PhoneIcon size={24} className="text-amber-400" />, label: "Call Us", value: "+1 (555) 123-4567" },
              { icon: <MailIcon size={24} className="text-amber-400" />, label: "Email", value: "info@luxeproperties.com" },
              { icon: <MapPinIcon size={24} className="text-amber-400" />, label: "Visit", value: "123 Luxury Ave, Beverly Hills" },
            ].map((contact, i) => (
              <div key={i} className="text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-sm mb-4 transition-all duration-500 ${
                  isDarkMode 
                    ? "bg-white/5" 
                    : "bg-white/10"
                }`}>
                  {contact.icon}
                </div>
                <div className="text-lg font-bold text-white mb-1">{contact.value}</div>
                <div className="text-gray-300 text-sm">{contact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper functions
function getIconForStat(label: string) {
  if (label.includes('Experience')) return <AwardIcon size={24} className="text-amber-500" />;
  if (label.includes('Sold')) return <HomeIcon size={24} className="text-amber-500" />;
  if (label.includes('Satisfaction')) return <StarIcon size={24} className="text-amber-500" />;
  if (label.includes('Value')) return <TrendingUpIcon size={24} className="text-amber-500" />;
  return <AwardIcon size={24} className="text-amber-500" />;
}

function getIconForValue(index: number) {
  const icons = [
    <ShieldCheckIcon key="shield" size={28} className="text-amber-500" />,
    <HeartIcon key="heart" size={28} className="text-amber-500" />,
    <TargetIcon key="target" size={28} className="text-amber-500" />,
    <GlobeIcon key="globe" size={28} className="text-amber-500" />
  ];
  return icons[index % icons.length];
}

function getLightColorForValue(index: number) {
  const colors = [
    "from-amber-50 to-orange-50",
    "from-blue-50 to-cyan-50",
    "from-green-50 to-emerald-50",
    "from-purple-50 to-violet-50"
  ];
  return colors[index % colors.length];
}

function getDarkColorForValue(index: number) {
  const colors = [
    "from-amber-900/20 to-orange-900/20",
    "from-blue-900/20 to-cyan-900/20",
    "from-green-900/20 to-emerald-900/20",
    "from-purple-900/20 to-violet-900/20"
  ];
  return colors[index % colors.length];
}