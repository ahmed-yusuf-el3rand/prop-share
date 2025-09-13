import { useState, useEffect, useMemo } from "react";
import { propertiesData } from "../propertiesData";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "../components/common/PropertyCard";
import { MapPin, DollarSign, Percent, Home } from "lucide-react";

const ExplorePage = () => {
  const navigate = useNavigate();
  const locationObj = useLocation();
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [minOwnership, setMinOwnership] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(locationObj.search);
    const locationFromQuery = params.get("location");
    if (locationFromQuery) {
      setLocation(locationFromQuery);
    }
  }, [locationObj]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    navigate({ search: params.toString() }, { replace: true });
  }, [location]);

  const matchesLocation = (prop) =>
    location === "" ||
    prop.location.toLowerCase().includes(location.toLowerCase());

  const matchesPrice = (prop) => {
    if (priceRange === "") return true;
    if (priceRange === "100000-500000")
      return prop.price >= 100000 && prop.price <= 500000;
    if (priceRange === "500000-1000000")
      return prop.price > 500000 && prop.price <= 1000000;
    if (priceRange === "1000000+") return prop.price > 1000000;
    return true;
  };

  const matchesType = (prop) => type === "" || prop.type === type;

  const matchesMinOwnership = (prop) =>
    minOwnership === "" || prop.ownershipProgress >= parseFloat(minOwnership);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter(
      (prop) =>
        matchesLocation(prop) &&
        matchesPrice(prop) &&
        matchesType(prop) &&
        matchesMinOwnership(prop)
    );
  }, [location, priceRange, type, minOwnership]);

  return (
    <div className="m-6 md:m-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Discover Properties
      </h1>

      <div className="bg-white md:p-6 md:rounded-lg md:shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
          <InputField
            label="Min Ownership %"
            type="number"
            value={minOwnership}
            onChange={(e) => setMinOwnership(e.target.value)}
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
              handleBuyShare={() => {
                navigate(`/properties/${property.id}`, {
                  state: { isPurchaseModalOpen: true },
                });
              }}
              onClick={() => navigate(`/properties/${property.id}`)}
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

export default ExplorePage;
