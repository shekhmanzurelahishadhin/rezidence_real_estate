"use client";

export function Marquee() {
  const items = [
    "🏆 AWARD-WINNING REAL ESTATE AGENCY",
    "🔑 500+ PROPERTIES SOLD THIS YEAR",
    "⭐ 98% CLIENT SATISFACTION RATE",
    "💰 GET FREE PROPERTY VALUATION TODAY",
    "📱 DOWNLOAD OUR MOBILE APP",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-blue-900 overflow-hidden py-6">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="animate-marquee flex gap-12">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 text-white/80 text-sm font-semibold tracking-wider whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {item}
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
        ))}
      </div>
    </div>
  );
}