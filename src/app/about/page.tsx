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
} from "@/assets/icons";

// Unsplash images
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

const stats = [
  { value: "15+", label: "Years Experience", icon: <AwardIcon size={24} className="text-amber-500" /> },
  { value: "500+", label: "Properties Sold", icon: <HomeIcon size={24} className="text-amber-500" /> },
  { value: "98%", label: "Client Satisfaction", icon: <StarIcon size={24} className="text-amber-500" /> },
  { value: "$2.5B+", label: "Total Value Sold", icon: <TrendingUpIcon size={24} className="text-amber-500" /> },
];

const values = [
  {
    title: "Integrity First",
    description: "We believe in complete transparency and honesty in all our dealings.",
    icon: <ShieldCheckIcon size={28} className="text-amber-500" />,
    color: "from-amber-50 to-orange-50",
  },
  {
    title: "Client Focused",
    description: "Your goals are our priority. We tailor our services to your unique needs.",
    icon: <HeartIcon size={28} className="text-amber-500" />,
    color: "from-blue-50 to-cyan-50",
  },
  {
    title: "Market Excellence",
    description: "Deep market knowledge and cutting-edge insights for optimal results.",
    icon: <TargetIcon size={28} className="text-amber-500" />,
    color: "from-green-50 to-emerald-50",
  },
  {
    title: "Global Reach",
    description: "Connecting clients with opportunities across international markets.",
    icon: <GlobeIcon size={28} className="text-amber-500" />,
    color: "from-purple-50 to-violet-50",
  },
];

const teamMembers = [
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${IMAGES.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div
            className="transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium tracking-wide">
                ABOUT US
              </span>
            </div>

            <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Building Dreams,{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Creating Legacies
              </span>
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mb-8">
              For over 15 years, LuxeProperties has been the trusted name in luxury real estate. 
              We don't just sell properties; we craft exceptional living experiences and build lasting relationships.
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
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-gray-300 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
                <span className="w-8 h-0.5 bg-amber-400" />
                OUR STORY
              </span>
              <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
                Redefining Luxury <span className="text-amber-500">Real Estate</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Founded in 2010 by Michael Rodriguez, LuxeProperties began as a boutique agency 
                with a vision to transform the luxury real estate experience. What started as a 
                single office in Beverly Hills has grown into a globally recognized brand.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Our success is built on a foundation of trust, expertise, and an unwavering 
                commitment to our clients' success. We've consistently delivered exceptional 
                results by combining traditional values with innovative approaches.
              </p>

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
                  className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 text-center"
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
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                
                {/* Floating Card */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <AwardIcon size={28} color="white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">Award Winning</div>
                        <div className="text-gray-600">Best Luxury Real Estate Agency 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-0.5 bg-amber-400" />
              OUR VALUES
            </span>
            <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
              What <span className="text-amber-500">Drives Us</span>
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide every decision and action at LuxeProperties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-gray-900 text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
                
                {/* Hover line */}
                <div className="mt-6 pt-4 border-t border-gray-100 relative">
                  <div className="absolute -top-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
              <span className="w-8 h-0.5 bg-amber-400" />
              MEET THE TEAM
            </span>
            <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
              Expert <span className="text-amber-500">Leadership</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our team of seasoned professionals brings decades of combined experience in luxury real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Social Links (Hover) */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2">
                      {['LinkedIn', 'Twitter'].map((social) => (
                        <button
                          key={social}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors duration-300"
                        >
                          <span className="text-xs font-semibold text-gray-700">{social.charAt(0)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-gray-900 text-xl font-bold mb-1">{member.name}</h3>
                  <div className="text-amber-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-500 text-sm mb-4">{member.experience}</p>
                  
                  {/* Specialties */}
                  <div className="space-y-2">
                    <div className="text-gray-700 text-sm font-semibold">Specialties:</div>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <button className="mt-6 w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:border-amber-400 hover:text-amber-600 transition-all duration-300 text-sm font-medium">
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
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(30, 58, 138, 0.8)), url(${IMAGES.meeting})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/80" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-semibold tracking-wide">
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
              className="bg-white/10 backdrop-blur-sm text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
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
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm mb-4">
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