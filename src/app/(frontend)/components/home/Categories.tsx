"use client";

import Link from "next/link";
import { categories } from "@/data";
import { ChevronRightIcon } from "@/assets/icons";

export function Categories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-amber-600 text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-0.5 bg-amber-400" />
            EXPLORE PROPERTIES
          </span>
          <h2 className="text-gray-900 text-4xl lg:text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-amber-500">Property Type</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Browse through our diverse collection of premium properties tailored to your lifestyle.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            // Map each category to a specific image
            const getCategoryImage = (label: string): string => {
              const imageMap: Record<string, string> = {
                'Modern Homes': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Luxury Estates': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&q=80',
                'Apartments': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Villas': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                'Commercial': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Beachfront': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Urban Living': 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'Investment': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
              };
              return imageMap[label] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
            };

            const getCategoryIcon = (label: string): string => {
              const iconMap: Record<string, string> = {
                'Modern Homes': '🏠',
                'Luxury Estates': '🏰',
                'Apartments': '🏢',
                'Villas': '🏡',
                'Commercial': '🏪',
                'Beachfront': '🏖️',
                'Urban Living': '🏙️',
                'Investment': '📈',
              };
              return iconMap[label] || '🏠';
            };

            const getPriceRange = (label: string): string => {
              const priceMap: Record<string, string> = {
                'Modern Homes': '$450K - $2M',
                'Luxury Estates': '$1.2M - $10M',
                'Apartments': '$250K - $800K',
                'Villas': '$800K - $5M',
                'Commercial': '$500K - $15M',
                'Beachfront': '$1M - $8M',
                'Urban Living': '$300K - $1.5M',
                'Investment': '$200K - $3M',
              };
              return priceMap[label] || '$250K+';
            };

            return (
              <Link
                key={cat.id}
                href={`/properties?category=${cat.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* Main Category Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${getCategoryImage(cat.label)})`
                    }}
                  />

                  {/* Dark Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                  {/* Category Icon */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <span className="text-lg">{getCategoryIcon(cat.label)}</span>
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-xs font-semibold">{cat.count}+</span>
                    </div>
                  </div>

                  {/* Category Title Over Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-bold">{cat.label}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-amber-300 text-sm font-medium">{getPriceRange(cat.label)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-amber-600 text-sm font-semibold flex items-center gap-1">
                      Browse Properties
                      <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="text-gray-400 text-xs">
                      Available now
                    </span>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}