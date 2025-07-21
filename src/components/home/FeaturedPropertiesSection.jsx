import { properties } from "../../propertiesData";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../property/PropertyCard";
import { handleDesireToBuy as onDesireToBuy } from "../../hooks/usePropertyActions";
import Button from "../common/Button";
import { LayoutGrid } from "lucide-react";

const FeaturedPropertiesSection = () => {
  const featuredProperties = properties.slice(0, 4);
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Featured Properties
        </h2>

        {featuredProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onDesireToBuy={onDesireToBuy}
                onClick={() => navigate(`/properties/${property.id}`)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No featured properties available at the moment.
          </p>
        )}

        <div className="flex justify-center mt-12">
          <Button
            className="px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg bg-blue-600 text-white rounded-lg shadow"
            icon={LayoutGrid}
            onClick={() => navigate("/search")}
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
