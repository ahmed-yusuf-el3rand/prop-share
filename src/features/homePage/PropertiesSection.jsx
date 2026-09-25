import { useHomeProperties } from "../../hooks/properties/useHomeProperties";
import PropertyCard from "../../components/common/PropertyCard";
import { properties } from "../../mock/properties";
import { useNavigation } from "../../hooks/useNavigation";
import { Loader2 } from "lucide-react";

const PropertiesSection = () => {
  const { data, isLoading, error } = useHomeProperties;
  const { goToProperty } = useNavigation();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center border-t-2 border-cyan-700 pt-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Properties
        </h2>
        {error && (
          <p className="text-red-500 text-center font-medium">
            Failed to load properties.
          </p>
        )}
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
            <p className="text-gray-700 font-medium">Loading properties...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {properties?.length > 0 ? (
              properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={() => goToProperty(property.id)}
                  onBuyShare={() => goToProperty(property.id, true)}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No properties available at the moment.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertiesSection;
