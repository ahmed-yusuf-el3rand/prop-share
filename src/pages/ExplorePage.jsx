import { useRef, useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";
import InputField from "../components/common/InputField";
import { useExploreProperties } from "../hooks/properties/useExploreProperties";
import SelectField from "../components/common/SelectField";
import PropertyCard from "../components/common/PropertyCard";
import { MapPin, DollarSign, Percent, Home, Loader2 } from "lucide-react";
import { properties } from "../mock/properties";

const ExplorePage = () => {
  const {
    // data: properties,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    filters,
    handleChange,
  } = useExploreProperties();

  const loadMoreRef = useRef(null);
  const { goToProperty } = useNavigation();
  const filteredProperties = Array.isArray(properties) ? properties : [];

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="m-6 md:m-12">
      <div className="bg-white md:p-6 md:rounded-lg md:shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <InputField
            label="Location"
            name="location"
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g., Cairo"
            icon={MapPin}
          />
          <SelectField
            label="Price Range"
            name="priceRange"
            value={filters.priceRange}
            onChange={(value) => handleChange("priceRange", value)}
            icon={DollarSign}
            options={[
              { value: "", label: "Any Price" },
              { value: "100000-500000", label: "$100K - $500K" },
              { value: "500000-1000000", label: "$500K - $1M" },
              { value: "1000000+", label: "$1M+" },
            ]}
          />
          <SelectField
            label="Property Type"
            name="type"
            value={filters.type}
            onChange={(value) => handleChange("type", value)}
            icon={Home}
            options={[
              { value: "", label: "Any Type" },
              { value: "Apartment", label: "Apartment" },
              { value: "House", label: "House" },
              { value: "Commercial", label: "Commercial" },
            ]}
          />
          <InputField
            label="Min Ownership %"
            name="minOwnership"
            type="number"
            value={filters.minOwnership}
            onChange={(e) => handleChange("minOwnership", e.target.value)}
            placeholder="e.g., 50"
            min="0"
            max="100"
            step="1"
            icon={Percent}
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-center font-medium mb-9">
          Failed to load properties. Please try again later.
        </p>
      )}
      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
          <p className="text-gray-700 font-medium">Loading properties...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties?.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onBuyShare={() => goToProperty(property.id, true)}
                onClick={() => goToProperty(property.id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No properties match your filters.
            </p>
          )}
        </div>
      )}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
};

export default ExplorePage;
