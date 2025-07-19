import { useEffect, useRef } from "react";
import { handleDesireToBuy as onDesireToBuy } from "../../hooks/usePropertyActions";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import { Percent, Home } from "lucide-react";

const PropertyCard = ({ property, onClick }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        const newScrollLeft = scrollLeft + clientWidth; // Scroll by one image width

        if (newScrollLeft >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" }); // Loop back to start
        } else {
          scrollRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
          });
        }
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Scrollable Image Carousel */}
      <div
        ref={scrollRef}
        className="w-full h-48 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.name} ${index + 1}`}
            className="inline-block w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x200/e0e0e0/000000?text=Property`;
            }}
          />
        ))}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {property.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex justify-between items-center">
          <span>{property.location}</span>
          <span className="text-gray-500">{property.type}</span>
        </p>
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(property.price)}
          </span>
          <span className="text-sm text-gray-500">
            {property.ownershipProgress}% Owned
          </span>
        </div>
        <div className="mb-4">
          <ProgressBar progress={property.ownershipProgress} />
        </div>
        {/* Conditional button text based on availability */}
        {property.availability === "fractional" ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDesireToBuy(property);
            }}
            className="w-full"
            icon={Percent}
          >
            Buy Fraction Now
          </Button>
        ) : property.availability === "rent" ? ( // New condition for rent
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDesireToBuy(property);
            }}
            className="w-full"
            icon={Home}
          >
            Express Interest to Rent
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDesireToBuy(property);
            }}
            className="w-full"
            icon={Percent}
          >
            Desire to Buy
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
