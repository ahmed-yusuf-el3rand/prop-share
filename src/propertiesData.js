// src/data/properties.js

// 📦 All property listings (main catalog)
export const properties= [
  {
    id: "prop1",
    name: "Luxury Beachfront Villa",
    location: "Miami, FL",
    price: 1200000,
    type: "House",
    availability: "fractional",
    status: "ready",
    ownershipProgress: 75,
    description:
      "Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Perfect for fractional ownership.",
    image: "https://placehold.co/600x400/a0a0a0/ffffff?text=Beach+Villa",
    images: [
      "https://placehold.co/600x400/a0a0a0/ffffff?text=Beach+Villa+1",
      "https://placehold.co/600x400/909090/ffffff?text=Beach+Villa+2",
      "https://placehold.co/600x400/808080/ffffff?text=Beach+Villa+3",
    ],
  },
  {
    id: "prop2",
    name: "Downtown Condo",
    location: "New York, NY",
    price: 450000,
    type: "Apartment",
    availability: "fractional",
    status: "desire",
    ownershipProgress: 30,
    description:
      "Modern condo in the heart of NYC, close to all major attractions and public transport. Great investment opportunity.",
    image: "https://placehold.co/600x400/b0b0b0/ffffff?text=NYC+Condo",
    images: [
      "https://placehold.co/600x400/b0b0b0/ffffff?text=NYC+Condo+1",
      "https://placehold.co/600x400/c0c0c0/ffffff?text=NYC+Condo+2",
    ],
  },
  {
    id: "prop3",
    name: "Commercial Office Space",
    location: "London, UK",
    price: 2500000,
    type: "Commercial",
    priority: "high",
    availability: "full",
    status: "ready",
    ownershipProgress: 0,
    description:
      "Prime commercial office space in a bustling business district. Ideal for a growing company or as a rental investment.",
    image: "https://placehold.co/600x400/c0c0c0/ffffff?text=Office+Space",
    images: [
      "https://placehold.co/600x400/c0c0c0/ffffff?text=Office+Space+1",
      "https://placehold.co/600x400/d0d0d0/ffffff?text=Office+Space+2",
    ],
  },
  {
    id: "prop4",
    name: "Suburban Family Home",
    location: "Austin, TX",
    price: 600000,
    type: "House",
    availability: "full",
    status: "ready",
    ownershipProgress: 90,
    description:
      "Spacious family home in a quiet suburban neighborhood with excellent schools and amenities.",
    image: "https://placehold.co/600x400/d0d0d0/ffffff?text=Family+Home",
    images: [
      "https://placehold.co/600x400/d0d0d0/ffffff?text=Family+Home+1",
      "https://placehold.co/600x400/e0e0e0/ffffff?text=Family+Home+2",
      "https://placehold.co/600x400/f0f0f0/ffffff?text=Family+Home+3",
    ],
  },
  {
    id: "prop6",
    name: "Cozy Apartment for Rent",
    location: "Seattle, WA",
    price: 2500,
    type: "Apartment",
    availability: "rent",
    status: "ready",
    ownershipProgress: 100,
    description:
      "A cozy 1-bedroom apartment available for long-term rent in a vibrant Seattle neighborhood.",
    image: "https://placehold.co/600x400/e6e6fa/000000?text=Rent+Apartment",
    images: [
      "https://placehold.co/600x400/e6e6fa/000000?text=Rent+Apartment+1",
      "https://placehold.co/600x400/d8bfd8/000000?text=Rent+Apartment+2",
    ],
  },
];

// 🕐 Properties in a pending state (e.g., payment, documents)
export const pendingProperties = [
  {
    id: "prop3",
    propertyName: "Commercial Office Space",
    propertyImage: "https://placehold.co/64x64/c0c0c0/000000?text=Office",
    price: 2500000,
    currentOwnedPercentage: 0,
    targetPercentage: 100,
    status: "Awaiting full payment",
    location: "London, UK",
  },
  {
    id: "prop4",
    propertyName: "Suburban Family Home",
    propertyImage: "https://placehold.co/64x64/d0d0d0/000000?text=Home",
    price: 600000,
    status: "Documentation in progress",
    currentOwnedPercentage: 50,
    targetPercentage: 100,
    location: "Austin, TX",
  },
];

// 💸 Rent profit dashboard data
export const rentProfits = {
  total: 15000,
  lastPayout: 1200,
  lastPayoutDate: "2024-06-15",
  notifications: [
    "New rent payout received for Luxury Beachfront Villa.",
    "Your share of maintenance fees for Downtown Condo is due.",
    'Property "Green Valley House" has reached 50% ownership.',
    'Upcoming fractional sale for "City Center Apartment" on 2024-07-20.',
  ],
  propertyProfits: [
    { name: "Luxury Beachfront Villa", profit: 800 },
    { name: "Downtown Condo", profit: 400 },
    { name: "Suburban Family Home", profit: 300 },
  ],
};

// 💰 Sale profits dashboard data
export const sellingProfits = {
  total: 25000,
  lastPayout: 5000,
  lastPayoutDate: "2024-05-20",
};

export const propertySellingProfits = [
  { name: "Downtown Condo", profit: 2500 },
  { name: "Commercial Office Space", profit: 10000 },
  { name: "Luxury Beachfront Villa", profit: 12500 },
];

// 🏠 Owned properties by the user
export const ownedPropertiesData = [
  {
    id: "prop1",
    name: "Luxury Beachfront Villa",
    location: "Miami, FL",
    percentageHeld: 5,
    value: 60000,
    image: "https://placehold.co/64x64/a0a0a0/ffffff?text=Villa",
    images: [
      "https://placehold.co/600x400/a0a0a0/ffffff?text=Beach+Villa+1",
      "https://placehold.co/600x400/909090/ffffff?text=Beach+Villa+2",
      "https://placehold.co/600x400/808080/ffffff?text=Beach+Villa+3",
    ],
    lastProfit: 800,
    description:
      "Stunning beachfront villa with panoramic ocean views, private pool, and direct beach access. Perfect for fractional ownership.",
    isOfferedToSell: false,
    isOfferedToRent: false,
    propertyStatus: "Active",
  },
  {
    id: "prop2",
    name: "Downtown Condo",
    location: "New York, NY",
    percentageHeld: 2,
    value: 9000,
    image: "https://placehold.co/64x64/b0b0b0/ffffff?text=Condo",
    images: [
      "https://placehold.co/600x400/b0b0b0/ffffff?text=NYC+Condo+1",
      "https://placehold.co/600x400/c0c0c0/ffffff?text=NYC+Condo+2",
    ],
    lastProfit: 400,
    description:
      "Modern condo in the heart of NYC, close to all major attractions and public transport. Great investment opportunity.",
    isOfferedToSell: true,
    isOfferedToRent: false,
    propertyStatus: "Pending Sale",
  },
  {
    id: "prop5",
    name: "Cozy Mountain Cabin",
    location: "Aspen, CO",
    percentageHeld: 10,
    value: 30000,
    image: "https://placehold.co/64x64/e0e0e0/000000?text=Cabin",
    images: [
      "https://placehold.co/600x400/e0e0e0/000000?text=Cabin+1",
      "https://placehold.co/600x400/d0d0d0/000000?text=Cabin+2",
      "https://placehold.co/600x400/c0c0c0/000000?text=Cabin+3",
    ],
    description: "A cozy cabin in the mountains, perfect for winter getaways.",
    isOfferedToSell: false,
    isOfferedToRent: true,
    propertyStatus: "Pending Rent",
  },
];
