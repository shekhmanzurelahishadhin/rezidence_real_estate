// ─── PROPERTY ─────────────────────────────────────────────────────────────

export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  category: string;
  tag?: string;
  description: string;
  detailDescription: string; // longer text for the detail page
  features: string[];
  yearBuilt: number;
  agent: { name: string; phone: string; email: string };
  gradient: string;
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Futuristic Haven",
    address: "Palm Springs, CA",
    price: 4750000,
    beds: 4,
    baths: 4,
    sqft: 3200,
    category: "Luxury Villa",
    tag: "Featured",
    description: "A stunning futuristic villa nestled in the heart of Palm Springs. Floor-to-ceiling glass walls frame desert panoramas while a sleek open-plan interior delivers modern luxury.",
    detailDescription: "Futuristic Haven is a masterclass in desert architecture — a home that doesn't just sit in the landscape but becomes part of it. The open-plan living area is anchored by a two-story glass wall that frames the San Jacinto Mountains in every direction. Recessed LED lighting, heated concrete floors, and a custom kitchen with an integrated island create a space that's as functional as it is breathtaking. Step outside and you'll find a 40-foot infinity pool that appears to dissolve into the horizon, a landscaped fire pit lounge, and a private cinema room tucked beneath the ground floor. Every detail — from the sliding pocket doors to the voice-controlled smart systems — has been designed to disappear, letting the architecture and the desert do the talking.",
    features: ["Infinity Pool", "Smart Home", "Parking Space", "Home Theater", "Fire Pit Lounge", "Private Cinema"],
    yearBuilt: 2023,
    agent: { name: "Sarah Chen", phone: "+1 (310) 555-0101", email: "sarah@homely.com" },
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Modern Luxe Villa",
    address: "20 S Aurora Ave, Miami",
    price: 1650500,
    beds: 4,
    baths: 3,
    sqft: 560,
    category: "Luxury Villa",
    tag: "Hot",
    description: "Experience luxury living at Modern Luxe Villa. This smart home offers energy efficiency, natural light, security systems, outdoor spaces, and 2 bar areas—perfect for 8+ guests.",
    detailDescription: "Modern Luxe Villa redefines what a Miami home can be. Situated on a quiet street just blocks from the beach, this property balances bold design with tropical ease. The ground floor is one continuous living space — a kitchen island in white marble flows into a dining area that opens onto a covered patio and plunge pool. Upstairs, four generously sized bedrooms each have their own character: the master suite features a freestanding soaking tub and a rain shower with floor-to-ceiling glass. The two bar areas — one indoors, one poolside — make this home effortless for entertaining. A full solar array and smart-home integration keep energy costs remarkably low while the security system provides 24/7 peace of mind.",
    features: ["2 Bar Areas", "Smart Home", "Parking Space", "Security System", "Solar Panels", "Plunge Pool"],
    yearBuilt: 2024,
    agent: { name: "Marcus Webb", phone: "+1 (305) 555-0202", email: "marcus@homely.com" },
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Ocean Ridge Estate",
    address: "Malibu Beach, CA",
    price: 6200000,
    beds: 5,
    baths: 4,
    sqft: 4800,
    category: "Residential Home",
    tag: "New",
    description: "Perched on the cliffs of Malibu, this estate delivers unobstructed Pacific views. Bi-fold doors dissolve the boundary between indoor living and the ocean beyond.",
    detailDescription: "Ocean Ridge Estate occupies one of the last truly private cliff-top parcels in Malibu — a 0.6-acre lot with unobstructed views from sunrise to sunset. The home was designed by a LA-based architecture firm with a single directive: let the ocean in. Every room faces west. The main living area features a 30-foot bi-fold glass wall that retracts completely in summer, and a long concrete fireplace that extends outdoors for cooler evenings. The property includes a guest house with its own kitchen and bedroom, a private beach access path carved into the cliff, a wine cellar stocked for 400 bottles, and a heated lap pool oriented to catch the morning light.",
    features: ["Ocean View", "Private Beach", "Wine Cellar", "Guest House", "Heated Lap Pool", "Cliff Access"],
    yearBuilt: 2022,
    agent: { name: "Emily Torres", phone: "+1 (310) 555-0303", email: "emily@homely.com" },
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    title: "Sky Tower Penthouse",
    address: "Manhattan, New York",
    price: 8900000,
    beds: 4,
    baths: 3,
    sqft: 3600,
    category: "Apartment",
    tag: "",
    description: "The ultimate Manhattan address. A full-floor penthouse with 360° skyline views, a private terrace, and concierge-level services built into every detail.",
    detailDescription: "Sky Tower Penthouse occupies the entire 48th floor of one of Manhattan's most architecturally significant residential towers. The open-plan layout wraps around a full-perimeter terrace — 1,200 square feet of outdoor space with views stretching from the Hudson to the East River. Inside, 12-foot ceilings and floor-to-ceiling glass create a sense of limitless space. The kitchen features a 14-foot marble island, Sub-Zero refrigeration, and a La Cornue range. The master suite is a sanctuary unto itself: a spa bathroom with a soaking tub positioned directly in front of a floor-to-ceiling window, and a walk-in closet that rivals a boutique. Building amenities include a 24-hour doorman, concierge, gym, and rooftop residents' lounge.",
    features: ["Rooftop Terrace", "Concierge", "Gym", "Doorman", "Marble Kitchen", "Spa Bathroom"],
    yearBuilt: 2021,
    agent: { name: "David Park", phone: "+1 (212) 555-0404", email: "david@homely.com" },
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
  {
    id: 5,
    title: "Desert Zen Retreat",
    address: "Scottsdale, AZ",
    price: 2850000,
    beds: 3,
    baths: 3,
    sqft: 2900,
    category: "Residential Home",
    tag: "",
    description: "Rammed earth walls and native desert landscaping create a serene sanctuary. The open layout flows seamlessly into a private courtyard and heated pool.",
    detailDescription: "Desert Zen Retreat is built on the principle that a home should feel inevitable — as though it grew from the ground rather than being placed upon it. Rammed earth walls, reclaimed timber, and polished concrete floors create a palette drawn entirely from the Arizona landscape. The central courtyard is the heart of the home: a private oasis enclosed by living spaces on three sides, featuring a heated pool, a fire feature, and native plantings that attract hummingbirds year-round. A dedicated meditation room with a retractable glass ceiling allows stargazing in the desert silence. Solar panels offset 90% of the home's energy needs, and a rainwater harvesting system feeds the landscaping.",
    features: ["Heated Pool", "Zen Garden", "Solar Panels", "Guest Suite", "Meditation Room", "Rainwater Harvesting"],
    yearBuilt: 2023,
    agent: { name: "Sarah Chen", phone: "+1 (480) 555-0505", email: "sarah@homely.com" },
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    id: 6,
    title: "The Glass House",
    address: "Lake Como, IL",
    price: 3400000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    category: "Luxury Villa",
    tag: "",
    description: "A masterpiece of transparent architecture. Every wall is glass, every room a frame for the surrounding forest and lake. Minimalism taken to its logical extreme.",
    detailDescription: "The Glass House is an exercise in radical transparency. Situated on a wooded lakefront lot, the home is essentially a series of glass-walled rooms connected by a single concrete spine. There are no curtains — privacy is achieved through strategic landscaping and the home's deep setback from any road. The living area is one unbroken 40-foot space: a kitchen of white marble and brass at one end, a seating area at the other, and floor-to-ceiling glass on three sides framing the lake and forest. A stone fireplace anchors the space in winter. The master bedroom floats above the tree canopy on a cantilevered platform, and a private dock extends 60 feet into the lake for swimming and kayaking.",
    features: ["Lake View", "Fireplace", "Smart Lighting", "Private Dock", "Cantilevered Master", "Lakefront"],
    yearBuilt: 2020,
    agent: { name: "Emily Torres", phone: "+1 (312) 555-0606", email: "emily@homely.com" },
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  },
  {
    id: 7,
    title: "Urban Loft Studio",
    address: "SoHo, New York",
    price: 1950000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    category: "Apartment",
    tag: "",
    description: "Exposed brick, soaring ceilings, and industrial steel beams define this converted warehouse loft in the heart of SoHo. Perfect for the modern creative professional.",
    detailDescription: "Urban Loft Studio occupies the top two floors of a converted 1920s garment-district warehouse — one of the last true loft conversions available in SoHo. The space opens with 14-foot ceilings, original exposed brick on three walls, and massive industrial steel beams overhead. A mezzanine level houses the two bedrooms, accessed by a custom steel-and-glass staircase. The kitchen is minimalist: white oak cabinets, a waterfall-edge stone countertop, and a farmhouse sink beneath a window that floods the space with northern light. Building perks include rooftop access with panoramic views of Lower Manhattan, a doorman, and a fully equipped gym.",
    features: ["Exposed Brick", "Rooftop Access", "Doorman", "Gym", "14ft Ceilings", "Mezzanine Level"],
    yearBuilt: 2019,
    agent: { name: "Marcus Webb", phone: "+1 (212) 555-0707", email: "marcus@homely.com" },
    gradient: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
  },
  {
    id: 8,
    title: "Executive Suite",
    address: "Century City, CA",
    price: 5600000,
    beds: 0,
    baths: 1,
    sqft: 2200,
    category: "Office Space",
    tag: "",
    description: "A prestige office address in Century City with panoramic city views. Floor-to-ceiling windows, private meeting rooms, and a full concierge service included.",
    detailDescription: "Executive Suite is the pinnacle of modern workspace design, occupying a full floor on the 32nd level of one of Century City's most prestigious towers. The space is configured around a central reception and lounge, with four private offices, two fully-equipped conference rooms, and a quiet focus library. Every room is bathed in natural light — the building's curtain-wall facade delivers unobstructed views from Santa Monica to the San Fernando Valley. A high-speed fibre connection, video-conferencing suites, and a full concierge service (including mail handling, meeting coordination, and visitor management) mean you can focus entirely on your work. Parking for up to 6 vehicles is included in the lease.",
    features: ["City View", "Conference Room", "Concierge", "Parking", "Focus Library", "Video Conferencing"],
    yearBuilt: 2022,
    agent: { name: "David Park", phone: "+1 (310) 555-0808", email: "david@homely.com" },
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
];

// ─── CATEGORY ─────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  label: string;
  description: string;
  gradient: string;
  count: number;
}

export const categories: Category[] = [
  { id: "residential-home", label: "Residential Homes", description: "Elegant family living with modern comforts.", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", count: 24 },
  { id: "luxury-villa",     label: "Luxury Villas",     description: "Exclusive villas designed for sophisticated living.", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", count: 18 },
  { id: "apartment",        label: "Apartments",        description: "Urban living at its finest, city views included.", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", count: 42 },
  { id: "office-space",     label: "Office Spaces",     description: "Premium workspaces for visionary businesses.", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", count: 11 },
];

// ─── BLOG ─────────────────────────────────────────────────────────────────

export interface Blog {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: number;
  excerpt: string;
  body: string[];
  author: string;
  gradient: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    slug: "apartment-or-house",
    title: "Apartment or House?",
    date: "Feb 13, 2025",
    category: "Options",
    readTime: 5,
    excerpt: "Choosing between an apartment and a house is one of the biggest financial decisions you'll make. We break down the pros, cons, and hidden costs of each path.",
    author: "Sarah Chen",
    body: [
      "The apartment vs. house debate is one every prospective buyer faces — and there's no single right answer. The best choice depends on your lifestyle, budget, long-term goals, and the specific market you're buying in.",
      "Apartments tend to win on convenience and cost predictability. Maintenance is typically handled by the building or HOA, your mortgage is usually lower, and you're often located closer to city amenities. For single professionals or couples without children, the lifestyle fit is hard to beat.",
      "Houses, on the other hand, offer something apartments rarely can: land. That translates to outdoor space, privacy, and the ability to renovate and expand. Over a 10-year horizon, houses in appreciating neighbourhoods tend to outperform apartments on a per-square-foot basis.",
      "The hidden costs are where most buyers get surprised. Apartments come with HOA fees that can range from $200 to $1,500+ per month. Houses carry the full weight of maintenance: roof repairs, HVAC servicing, landscaping, and insurance premiums that climb with property size.",
      "Our recommendation: run a 5-year total-cost-of-ownership calculation before committing. Factor in mortgage payments, HOA or maintenance costs, insurance, property taxes, and expected appreciation. The numbers rarely lie.",
    ],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    slug: "boost-home-value",
    title: "Boost Home Value",
    date: "Feb 09, 2025",
    category: "Guides",
    readTime: 6,
    excerpt: "Small changes can yield massive returns. From curb appeal upgrades to smart-home installations, here are the renovations that move the needle most.",
    author: "Marcus Webb",
    body: [
      "You don't need a six-figure renovation budget to meaningfully increase your home's value. Some of the highest-ROI upgrades cost a fraction of what you'd expect — and some require nothing more than a weekend and a trip to the hardware store.",
      "Start with curb appeal. First impressions account for up to 95% of a buyer's initial emotional response. Fresh paint on the front door, updated house numbers, and a clean entryway can add 5–10% to perceived value before anyone steps inside.",
      "Inside, kitchens and bathrooms deliver the strongest returns. Swapping cabinet hardware, replacing dated light fixtures, and refinishing cabinets can transform a kitchen for under $3,000. Buyers consistently cite kitchens and bathrooms as the rooms that influence their offer price the most.",
      "Smart-home technology is becoming a genuine differentiator. A smart thermostat, keyless entry, and a basic security system cost roughly $800–1,200 combined. They signal to buyers that the home is modern, efficient, and well-maintained.",
      "Don't underestimate energy efficiency. Upgrading to LED lighting, adding insulation in the attic, or installing low-flow fixtures are small investments that reduce utility costs and appeal strongly to environmentally conscious buyers.",
    ],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    slug: "home-buying-tips",
    title: "Home Buying Tips",
    date: "Feb 05, 2025",
    category: "Tips",
    readTime: 4,
    excerpt: "First-time buyer? We've distilled years of market experience into actionable tips that'll help you avoid the most common pitfalls and land your dream home.",
    author: "Emily Torres",
    body: [
      "Buying your first home is equal parts exciting and overwhelming. The market moves fast, the paperwork is dense, and the emotional stakes are high. But with the right preparation, you can navigate the process with confidence.",
      "Get pre-approved, not just pre-qualified. Pre-qualification is a rough estimate based on self-reported numbers. Pre-approval means a lender has verified your income, assets, and credit. In competitive markets, sellers frequently ignore offers without a pre-approval letter.",
      "Don't skip the home inspection — ever. We've seen buyers waive inspections to strengthen offers in bidding wars. It feels strategic in the moment, but it's a gamble with potentially six-figure consequences. A $400 inspection is the cheapest insurance policy you'll ever buy.",
      "Think beyond the listing price. Factor in closing costs (typically 2–5%), property taxes, homeowners insurance, and HOA fees. A home listed at $500K can easily cost $525K+ by the time you close.",
      "Finally, buy for the long game. Don't let short-term market fluctuations paralyse you. If you plan to stay 5+ years, the right home in the right neighbourhood will almost certainly appreciate.",
    ],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 4,
    slug: "investing-in-real-estate",
    title: "Investing in Real Estate",
    date: "Jan 28, 2025",
    category: "Investment",
    readTime: 8,
    excerpt: "Real estate remains one of the most reliable wealth-building vehicles. Learn how to analyse cap rates, leverage financing, and build a portfolio that compounds.",
    author: "David Park",
    body: [
      "Of all asset classes, real estate has the longest track record of consistent wealth creation. Unlike stocks, it's tangible. And unlike bonds, it offers the rare combination of income (rent) and appreciation (price growth) simultaneously.",
      "The foundation of any real estate investment analysis is the cap rate — Net Operating Income divided by property value. A 6% cap rate in a high-growth suburb will almost always outperform a 4% cap rate in a stagnant area over a 10-year horizon.",
      "Cash-on-cash return is the metric that actually measures how much money you're making relative to what you put in. If you buy a $400K property with a $100K down payment and generate $8,000 in annual cash flow, your cash-on-cash return is 8%.",
      "Leverage is your greatest tool — and your greatest risk. A 25% down payment means you own 100% of the upside but only put in 25% of the capital. If a property appreciates 10%, your return on invested capital is actually 40%.",
      "Diversification within real estate matters. A portfolio spread across multiple markets and property types smooths out local market cycles and protects your income stream.",
      "The long game is where real estate truly shines. A $300K property purchased today, appreciating at 4% per year, is worth over $730K in 20 years — before accounting for rent income and mortgage paydown.",
    ],
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
  {
    id: 5,
    slug: "staging-secrets",
    title: "Staging Secrets That Sell",
    date: "Jan 20, 2025",
    category: "Guides",
    readTime: 5,
    excerpt: "Professional stagers reveal the psychology behind buyer decisions. A few strategic tweaks can shave weeks off your selling timeline and add thousands to your price.",
    author: "Sarah Chen",
    body: [
      "Staging is one of the most underestimated levers sellers have. Done well, it doesn't just make a home look prettier — it fundamentally changes how buyers feel when they walk through the door.",
      "The single highest-impact change is decluttering and depersonalising. Buyers need to imagine themselves in the space. Your family photos and collections — however meaningful — make that mental leap harder. Strip it back and let the architecture breathe.",
      "Scent is a surprisingly powerful tool. Fresh flowers, a lightly scented candle, or even freshly baked cookies create an unconscious sense of warmth. Avoid anything artificial or overpowering — subtlety is key.",
      "Lighting transforms a space more than almost any other element. Open every curtain, clean every window, and layer your lighting: overhead for brightness, table lamps for warmth, and accent lighting to draw the eye to focal points.",
      "Finally, create a narrative. The best staged homes tell a story about the life someone could live there. Set the dining table. Place a book on the patio. Staged homes sell for 8–15% more on average and sit on the market for significantly fewer days.",
    ],
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    id: 6,
    slug: "understanding-mortgages",
    title: "Understanding Mortgages",
    date: "Jan 12, 2025",
    category: "Finance",
    readTime: 7,
    excerpt: "Fixed or variable? 15 or 30 years? We decode mortgage jargon and walk you through the math so you can compare lenders with confidence.",
    author: "David Park",
    body: [
      "A mortgage is the single largest financial commitment most people will ever make — yet the majority of buyers spend less time comparing lenders than they do choosing a car. Understanding the mechanics can save you tens of thousands of dollars.",
      "Fixed-rate mortgages offer certainty. Your payment stays the same for the entire term. The trade-off is that fixed rates are typically higher than adjustable counterparts at the outset. But in a volatile rate environment, the peace of mind often outweighs the cost.",
      "Adjustable-rate mortgages (ARMs) start lower and reset periodically — usually every 5 or 7 years. If you plan to sell or refinance before the first reset, an ARM can save you a meaningful amount.",
      "The 15-year vs. 30-year debate comes down to affordability vs. total cost. A 30-year loan on a $400K mortgage at 7% costs roughly $600K in total interest. The same loan over 15 years costs about $250K — but the monthly payment is nearly double.",
      "Points and fees are where lenders often hide their real margin. One point equals 1% of the loan amount paid upfront to buy down your rate. Whether paying points makes sense depends on how long you'll hold the loan.",
      "Our advice: get at least three pre-approval quotes from different lenders. A 0.25% difference on a $400K loan adds up to over $20,000 in interest over 30 years. Shop aggressively and compare the APR, not just the rate.",
    ],
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  },
];


// ─── FAQ ──────────────────────────────────────────────────────────────────

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Can I personalise my Homely home?",
    answer: "Absolutely. Every property we list comes with full customisation options — from interior finishes and landscaping to smart-home integrations. Our design team works closely with you to create a space that's truly yours.",
  },
  {
    question: "Where can I find Homely homes?",
    answer: "We curate properties across the United States, with concentrations in California, New York, Florida, and Arizona. Use the filters on our Properties page to narrow by location, price range, or property type.",
  },
  {
    question: "What steps do I need to buy a Homely home?",
    answer: "The process is straightforward: browse & shortlist → schedule a viewing → make an offer → due diligence & financing → closing. Our agents guide you through every step, handling paperwork and negotiations on your behalf.",
  },
  {
    question: "Do you offer property management services?",
    answer: "Yes. If you're investing, our property management arm handles tenant screening, maintenance coordination, rent collection, and financial reporting — so you can enjoy passive income without the hassle.",
  },
  {
    question: "How long does the buying process typically take?",
    answer: "From first viewing to closing, most purchases complete within 60–90 days. Cash buyers can often close faster. We'll give you a detailed timeline at every stage so there are no surprises.",
  },
];
