import property1 from "../assets/property-1.webp";
import property2 from "../assets/property-2.webp";
import property3 from "../assets/property-3.webp";
import property4 from "../assets/property-4.webp";
import property5 from "../assets/property-5.webp";
import property6 from "../assets/property-6.webp";
import property7 from "../assets/property-7.webp";
import property8 from "../assets/property-8.webp";
import property9 from "../assets/property-9.jpg";
import property10 from "../assets/property-10.jpg";

export const properties = [
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
    image: property1,
    images: [property1, property2],
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
    image: property3,
    images: [property3, property4],
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
    image: property5,
    images: [
      property5,
      property6,
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
    image: property7,
    images: [
      property7,
      property8,
    ],
  },
  {
    id: "prop5",
    name: "Cozy Apartment for Rent",
    location: "Seattle, WA",
    price: 2500,
    type: "Apartment",
    availability: "rent",
    status: "ready",
    ownershipProgress: 100,
    description:
      "A cozy 1-bedroom apartment available for long-term rent in a vibrant Seattle neighborhood.",
    image: property9,
    images: [
      property9,
      property10,
    ],
  },
];
