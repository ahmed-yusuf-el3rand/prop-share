import { useNavigate } from "react-router-dom";
import { propertiesData } from "../../propertiesData";
import PropertyCard from "../../components/common/PropertyCard";

const PropertiesSection = () => {
  const navigate = useNavigate();
  const properties = propertiesData.slice(0, 4);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Properties
        </h2>

        {properties.length > 0 ? (
          <div className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => navigate(`/properties/${property.id}`)}
                handleBuyShare={() => {
                  navigate(`/properties/${property.id}`, {
                    state: { isPurchaseModalOpen: true },
                  });
                }}
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
