import { useHomeProperties } from "../../hooks/properties/useHomeProperties";
import PropertyCard from "../../components/common/PropertyCard";
import { properties } from "../../mock/properties";
import { useNavigate } from "react-router-dom";

const PropertiesSection = () => {
  const { data, isLoading, error } = useHomeProperties;
  const navigate = useNavigate();
  const goToProperty = (id, openPurchase = false) => {
    navigate(
      `/properties/${id}`,
      openPurchase ? { state: { isPurchaseOpen: true } } : undefined,
    );
  };

  // if (isLoading) return <p>Loading properties...</p>;
  // if (error) return <p className="text-red-500">Failed to load properties.</p>;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Properties
        </h2>

        {properties.length > 0 ? (
          <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => goToProperty(property.id)}
                onBuyShare={() => goToProperty(property.id, true)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No properties available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
