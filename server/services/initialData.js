const sampleProperties = [
  {
    _id: "prop-101",
    title: "The Grand Pavilion Penthouse",
    slug: "grand-pavilion-penthouse-bandra",
    type: "Penthouse",
    purpose: "For Sale",
    price: 385000000,
    priceDisplay: "₹ 38.5 Cr",
    location: {
      city: "Mumbai",
      locality: "Bandra West",
      address: "Pali Hill Promenade, Bandra West, Mumbai",
      zipcode: "400050"
    },
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 6200,
    furnishing: "Furnished",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    verified: true,
    possessionStatus: "Ready to Move",
    description: "An architectural masterpiece offering uninterrupted 360-degree views of the Arabian Sea. Featuring private sky lounge, infinity plunge pool, Italian marble flooring, automation by Crestron, and 4 dedicated basement parking bays.",
    amenities: ["Private Elevator", "Sea View", "Infinity Pool", "Concierge Service", "Home Theater", "Smart Home Automation", "Gymnasium", "24/7 Security"],
    floorPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Surabhi Elite Desk",
      phone: "+91 98200 11223",
      email: "penthouse@surabhirealtor.com"
    },
    createdAt: new Date("2026-01-15")
  },
  {
    _id: "prop-102",
    title: "Aura Oceanfront Luxury Villa",
    slug: "aura-oceanfront-luxury-villa-goa",
    type: "Villa",
    purpose: "For Sale",
    price: 182000000,
    priceDisplay: "₹ 18.2 Cr",
    location: {
      city: "Goa",
      locality: "Candolim",
      address: "Beachfront Villa Quarter, Candolim, North Goa",
      zipcode: "403515"
    },
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 4800,
    furnishing: "Furnished",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    verified: true,
    possessionStatus: "Ready to Move",
    description: "Portuguese-contemporary fusion villa nestled on private beachfront cliffs. Features lush tropical gardens, teak wood sundecks, open-air pavilion, butler pantry, and direct beach access.",
    amenities: ["Private Beach Access", "Private Pool", "Solar Power", "Staff Quarters", "Landscaped Gardens", "CCTV Surveillance"],
    floorPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Surabhi Goa Advisory",
      phone: "+91 98900 44556",
      email: "goa@surabhirealtor.com"
    },
    createdAt: new Date("2026-02-01")
  },
  {
    _id: "prop-103",
    title: "Verdant Heights Golf Residence",
    slug: "verdant-heights-golf-residence-gurugram",
    type: "Apartment",
    purpose: "For Sale",
    price: 49500000,
    priceDisplay: "₹ 4.95 Cr",
    location: {
      city: "Gurugram",
      locality: "Golf Course Extension Road",
      address: "Sector 65, Golf Course Ext Road, Gurugram",
      zipcode: "122018"
    },
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2950,
    furnishing: "Semi-Furnished",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    verified: true,
    possessionStatus: "Ready to Move",
    description: "Ultra-luxury high-rise apartment overlooking championship golf greens. VRV air-conditioning, double-height wrap-around balcony, modular Poggenpohl kitchen, and Olympic-size club amenities.",
    amenities: ["Golf View", "Clubhouse", "Tennis Court", "Temperature Controlled Pool", "Spa & Sauna", "EV Charging"],
    floorPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Surabhi NCR Prime",
      phone: "+91 98111 88990",
      email: "ncr@surabhirealtor.com"
    },
    createdAt: new Date("2026-02-10")
  },
  {
    _id: "prop-104",
    title: "Skylight Executive Commercial Suite",
    slug: "skylight-executive-commercial-suite-bengaluru",
    type: "Commercial",
    purpose: "For Rent",
    price: 450000,
    priceDisplay: "₹ 4.5 Lakh / mo",
    location: {
      city: "Bengaluru",
      locality: "UB City / MG Road",
      address: "CBD Financial District, MG Road, Bengaluru",
      zipcode: "560001"
    },
    bedrooms: 0,
    bathrooms: 4,
    areaSqFt: 3500,
    furnishing: "Furnished",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    verified: true,
    possessionStatus: "Ready to Move",
    description: "Grade-A Plug-and-Play commercial office space with 45 workstations, 3 executive cabins, 16-seater board room, server room, and high-speed fiber connectivity.",
    amenities: ["100% Power Backup", "High-Speed Elevators", "Central AC", "Valet Parking", "Cafeteria", "Biometric Access"],
    floorPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Surabhi Commercial Desk",
      phone: "+91 98450 77889",
      email: "commercial@surabhirealtor.com"
    },
    createdAt: new Date("2026-02-18")
  },
  {
    _id: "prop-105",
    title: "Celestial Heights 4BHK Sky Mansion",
    slug: "celestial-heights-4bhk-sky-mansion-worli",
    type: "Apartment",
    purpose: "For Sale",
    price: 245000000,
    priceDisplay: "₹ 24.5 Cr",
    location: {
      city: "Mumbai",
      locality: "Worli Sea Face",
      address: "Worli Sea Face Boulevard, Mumbai",
      zipcode: "400018"
    },
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 4100,
    furnishing: "Furnished",
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    verified: true,
    possessionStatus: "Ready to Move",
    description: "Opulent residence on sea-facing high floor. German double-glazed glass windows, Italian designer furniture, wine cellar, private lobby, and signature clubhouse access.",
    amenities: ["Sea View", "Private Keycard Elevator", "Wine Cellar", "Infinity Pool", "Squash Court", "Concierge"],
    floorPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Surabhi Elite Desk",
      phone: "+91 98200 11223",
      email: "mumbai@surabhirealtor.com"
    },
    createdAt: new Date("2026-03-01")
  },
  {
    _id: "prop-106",
    title: "The Heritage Colonial Estate",
    slug: "heritage-colonial-estate-lonavala",
    type: "Independent House",
    purpose: "For Sale",
    price: 95000000,
    priceDisplay: "₹ 9.5 Cr",
    location: {
      city: "Lonavala",
      locality: "Tungarli",
      address: "Hill View Valley Road, Lonavala",
      zipcode: "410401"
    },
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: 5500,
    furnishing: "Furnished",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80"
    ],
    coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    verified: true,
    possessionStatus: "Ready to Move",
    description: "Exclusive getaway estate spread over 1.5 acres of private hill territory. Heated swimming pool, fireplace lounge, organic farm patch, and separate guest bungalow.",
    amenities: ["Private Pool", "Hill View", "Organic Garden", "Fireplace", "Outhouse", "Solar Powered"],
    floorPlan: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    agent: {
      name: "Surabhi Estate Advisory",
      phone: "+91 98220 33445",
      email: "estates@surabhirealtor.com"
    },
    createdAt: new Date("2026-03-05")
  }
];

const sampleProjects = [
  {
    _id: "proj-201",
    name: "Surabhi Sovereign Towers",
    slug: "surabhi-sovereign-towers",
    developer: "Surabhi Luxury Infrastructure Ltd",
    location: "Worli Waterfront, Mumbai",
    status: "Under Construction",
    priceRange: "₹ 12 Cr - ₹ 35 Cr",
    type: "Ultra-Luxury Residential Skyscraper",
    completionYear: "2027",
    totalUnits: 120,
    acres: 3.5,
    overview: "Sovereign Towers defines high-altitude living with twin 60-storey towers featuring glass facades, private sky decks, infinity pools on the 50th level, and bespoke interior concierge by world-class designers.",
    highlights: ["Twin 60-Storey Towers", "Sky Lounge & Helipad Access", "Miyawaki Forest Garden", "IGBC Platinum Certified Green Building"],
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    bhkTypes: ["3 BHK Luxury", "4 BHK Sky Villa", "5 BHK Duplex Penthouse"],
    amenities: ["Infinity Sky Pool", "Private Cinema", "Cigar Lounge", "Therapeutic Spa", "Padel Tennis Court"],
    featured: true,
    createdAt: new Date("2026-01-10")
  },
  {
    _id: "proj-202",
    name: "Emerald Bay Riviera",
    slug: "emerald-bay-riviera",
    developer: "Surabhi Development Group",
    location: "Reis Magos, North Goa",
    status: "Upcoming",
    priceRange: "₹ 8.5 Cr - ₹ 22 Cr",
    type: "Waterfront Villa Enclave",
    completionYear: "2028",
    totalUnits: 24,
    acres: 8.0,
    overview: "A private gated sanctuary of 24 independent riverfront villas overlooking the Mandovi estuary. Signature infinity pools, private yacht berths, and bespoke architectural finishes.",
    highlights: ["Private Marina & Yacht Club", "Subtropical Botanical Parks", "Fully Managed Rental Desk"],
    coverImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ],
    bhkTypes: ["4 BHK Ocean Villa", "5 BHK Estate Villa"],
    amenities: ["Private Berthing", "Clubhouse", "Wellness Pavilion", "24/7 Security"],
    featured: true,
    createdAt: new Date("2026-02-05")
  }
];

const sampleBlogs = [
  {
    _id: "blog-301",
    title: "2026 Luxury Real Estate Outlook: Key Trends Shaping High-Net-Worth Property Investments",
    slug: "2026-luxury-real-estate-outlook-trends",
    category: "Market Insights",
    author: "Aditya Surabhi, Founder",
    readTime: "6 min read",
    excerpt: "Discover why luxury residential real estate remains the primary wealth preservation vehicle in 2026, with an emphasis on sea-facing ultra-luxurious sky mansions and smart villas.",
    content: `Luxury real estate in India continues to outperform traditional asset classes in 2026. High-net-worth individuals (HNIs) are increasingly prioritising prime locations, sustainable smart architecture, and lifestyle amenities.\n\nKey drivers include:\n1. **Sea-Facing & Golf Residences**: Premium supply in coastal cities like Mumbai and Goa has driven appreciation up by 18% year-on-year.\n2. **Smart Home Integration**: Buyers expect integrated Crestron and Lutron lighting systems, climate management, and facial recognition entry.\n3. **Branded Residences**: Institutional collaborations with international hotel chains provide seamless 5-star concierge services at home.\n\nInvesting early in Grade-A ongoing developments allows investors to capture capital gains prior to project completion. Contact Surabhi Realty Advisory for personalized portfolio allocation.`,
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Investment", "Luxury Homes", "Market Trends", "Real Estate 2026"],
    published: true,
    createdAt: new Date("2026-03-01")
  },
  {
    _id: "blog-302",
    title: "Essential Legal Due Diligence Guide Before Purchasing Premium Real Estate",
    slug: "essential-legal-due-diligence-guide-real-estate",
    category: "Legal & Advisory",
    author: "Surabhi Legal Cell",
    readTime: "4 min read",
    excerpt: "A comprehensive checklist covering RERA registration, title search, encumbrance certificates, occupancy approvals, and tax implications for smooth property transfers.",
    content: `Acquiring multi-crore real estate mandates rigorous legal due diligence. Here is our expert checklist:\n\n1. **RERA Verification**: Ensure the project is registered with RERA and all milestone approvals are updated.\n2. **30-Year Title Search**: Mandate your legal counsel to verify unencumbered ownership rights.\n3. **Commencement Certificate (CC) & Occupancy Certificate (OC)**: Confirm sanctioned building plans.\n4. **Stamp Duty & Capital Gains Strategy**: Optimize property registration taxes legally through structured advice.\n\nSurabhi Realtor offers end-to-end legal title verification for every listed property.`,
    coverImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    tags: ["RERA", "Legal Advice", "Property Checklist", "Due Diligence"],
    published: true,
    createdAt: new Date("2026-03-12")
  }
];

const sampleTestimonials = [
  {
    _id: "test-401",
    name: "Vikramaditya Singhania",
    role: "Managing Director, Apex Global",
    location: "Mumbai",
    rating: 5,
    quote: "Surabhi Realtor secured our Pali Hill penthouse off-market with utmost discretion and efficiency. Their deep market network and transparent advisory are unmatched in India.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    propertyName: "The Grand Pavilion Penthouse",
    active: true,
    createdAt: new Date("2026-02-14")
  },
  {
    _id: "test-402",
    name: "Dr. Sunita & Rajesh Kothari",
    role: "NRI Investors",
    location: "London / Goa",
    rating: 5,
    quote: "Purchasing a sea villa in Goa while living in London felt effortless thanks to the Surabhi team. From video tours to legal closing, everything was handled impeccably.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    propertyName: "Aura Oceanfront Villa",
    active: true,
    createdAt: new Date("2026-02-28")
  }
];

const sampleBanners = [
  {
    _id: "ban-501",
    title: "Redefining Luxury Real Estate Excellence",
    subtitle: "Curated portfolio of prime sea-front penthouses, architectural villas & landmark commercial spaces across India's top locations.",
    badge: "SURABHI EXCLUSIVE REALTY",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Browse Luxury Listings",
    ctaLink: "/properties",
    active: true,
    order: 1,
    createdAt: new Date("2026-01-01")
  },
  {
    _id: "ban-502",
    title: "Surabhi Sovereign Towers - Worli",
    subtitle: "Pre-launch opportunities for Mumbai's iconic sea-facing twin skyscrapers with sky lounge amenities.",
    badge: "FEATURED FLAGSHIP PROJECT",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Sovereign Towers",
    ctaLink: "/projects",
    active: true,
    order: 2,
    createdAt: new Date("2026-01-02")
  }
];

const sampleEnquiries = [
  {
    _id: "enq-601",
    name: "Harish Vardhan",
    email: "h.vardhan@techgroup.io",
    phone: "+91 98765 00112",
    interest: "Buy Luxury Penthouse",
    message: "Interested in scheduling a private site visit for The Grand Pavilion Penthouse in Bandra West.",
    propertyTitle: "The Grand Pavilion Penthouse",
    propertyId: "prop-101",
    preferredTime: "Weekend Morning",
    status: "New Lead",
    notes: "VIP Client. High budget buyer.",
    createdAt: new Date("2026-03-19")
  },
  {
    _id: "enq-602",
    name: "Rohan Kapoor",
    email: "rohan.kapoor@gmail.com",
    phone: "+91 99887 66554",
    interest: "Project Inquiry",
    message: "Requesting floor plans and payment schedule details for Surabhi Sovereign Towers in Worli.",
    propertyTitle: "Surabhi Sovereign Towers",
    propertyId: "proj-201",
    preferredTime: "Anytime on WhatsApp",
    status: "Contacted",
    notes: "Sent digital brochure via email on 20th March.",
    createdAt: new Date("2026-03-20")
  }
];

module.exports = {
  sampleProperties,
  sampleProjects,
  sampleBlogs,
  sampleTestimonials,
  sampleBanners,
  sampleEnquiries
};
