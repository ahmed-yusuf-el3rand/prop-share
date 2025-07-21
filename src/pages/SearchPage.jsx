import { useState } from "react";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import PropertyCard from "../components/property/PropertyCard";
import { MapPin, DollarSign, Calendar, Percent, Home, Tag } from "lucide-react";
import { properties } from "../propertiesData";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const SearchPage = ({ onDesireToBuy, onClick }) => {
  const [location, setLocation] = useState("");
  const locationObj = useLocation();
  const [priceRange, setPriceRange] = useState("");
  const [type, setType] = useState("");
  const [availability, setAvailability] = useState("");
  const [status, setStatus] = useState("");
  const [minOwnershipPercentage, setMinOwnershipPercentage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(locationObj.search);
    const locationFromQuery = params.get("location");
    if (locationFromQuery) {
      setLocation(locationFromQuery);
    }
  }, [locationObj]);

  const filteredProperties = properties.filter((prop) => {
    return (
      (location === "" ||
        prop.location.toLowerCase().includes(location.toLowerCase())) &&
      (priceRange === "" ||
        (priceRange === "100000-500000" &&
          prop.price >= 100000 &&
          prop.price <= 500000) ||
        (priceRange === "500000-1000000" &&
          prop.price > 500000 &&
          prop.price <= 1000000) ||
        (priceRange === "1000000+" && prop.price > 1000000)) &&
      (type === "" || prop.type === type) &&
      (availability === "" || prop.availability === availability) &&
      (status === "" || prop.status === status) &&
      (minOwnershipPercentage === "" ||
        prop.ownershipProgress >= parseFloat(minOwnershipPercentage))
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Discover Properties
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Cairo"
            icon={MapPin}
          />
          <SelectField
            label="Price Range"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            options={[
              { value: "", label: "Any Price" },
              { value: "100000-500000", label: "$100K - $500K" },
              { value: "500000-1000000", label: "$500K - $1M" },
              { value: "1000000+", label: "$1M+" },
            ]}
            icon={DollarSign}
          />
          <SelectField
            label="Property Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: "", label: "Any Type" },
              { value: "Apartment", label: "Apartment" },
              { value: "House", label: "House" },
              { value: "Commercial", label: "Commercial" },
            ]}
            icon={Home}
          />
          <SelectField
            label="Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            options={[
              { value: "", label: "Any Availability" },
              { value: "full", label: "Full" },
              { value: "fractional", label: "Fractional" },
              { value: "rent", label: "For Rent" }, // Added 'rent' option
            ]}
            icon={Calendar}
          />
          {/* <SelectField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "", label: "Any Status" },
              { value: "ready", label: "Ready" },
              { value: "desire", label: "Desire" },
            ]}
            icon={Tag}
          /> */}
          <InputField
            label="Min Ownership %"
            type="number"
            value={minOwnershipPercentage}
            onChange={(e) => setMinOwnershipPercentage(e.target.value)}
            placeholder="e.g., 50"
            min="0"
            max="100"
            step="1"
            icon={Percent}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDesireToBuy={onDesireToBuy}
              onClick={() => onClick(property.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No properties match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
