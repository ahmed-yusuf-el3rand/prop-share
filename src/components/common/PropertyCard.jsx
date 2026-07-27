import Button from "./buttons/Button.jsx";
import { Percent } from "lucide-react";
import { useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";
import formatCurrency from "../../utils/formatCurrency.js";

const PropertyCard = ({ property, onClick, onBuyShare }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        const newScrollLeft = scrollLeft + clientWidth;

        if (newScrollLeft >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
          });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 cursor-pointer"
      onClick={onClick}
    >
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
          <span>{property.type}</span>
        </p>
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-2xl font-bold text-cyan-600">
            {formatCurrency(property.price)}
          </span>
          <span className="text-sm text-gray-500">
            {property.ownershipProgress}% Owned
          </span>
        </div>

        <div className="mb-4">
          <ProgressBar progress={property.ownershipProgress} />
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onBuyShare();
          }}
          className="w-full bg-cyan-600 hover:bg-cyan-700"
          icon={Percent}
        >
          Buy Share
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
