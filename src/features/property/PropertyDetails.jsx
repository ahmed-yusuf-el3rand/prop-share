import Button from "../../components/common/Button";
import { DollarSign, XCircle, Tag } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useRef, useEffect } from "react";

const PropertyDetails = ({
  property,
  handleBuyShare,
  handleOfferToSell,
  handleCancelOffer,
}) => {
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
    <div className="md:w-1/2">
      <div
        ref={scrollRef}
        className="w-full h-64 overflow-x-auto whitespace-nowrap rounded-lg mb-6"
      >
        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${property.name} ${index + 1}`}
            className="inline-block w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x400/e0e0e0/000000?text=Property+${
                index + 1
              }`;
            }}
          />
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{property.name}</h1>
        <p className="text-gray-600 text-l">{property.location}</p>
        <p className="text-blue-600 text-3xl font-bold ">
          {formatCurrency(property.price)}
        </p>
        <p className="font-semibold text-gray-700">
          SHARES VALUE:{" "}
          <span className="text-blue-600">
            {formatCurrency(property.sharesValue)}
          </span>
        </p>
        <p>
          <span
            className={`font-semibold ${
              property.availability === "Available"
                ? "bg-green-100 text-green-800 "
                : "bg-gray-100 text-gray-800"
            } rounded-full p-2`}
          >
            {property.availability}
          </span>{" "}
          <span className="font-semibold bg-yellow-100 text-yellow-800 rounded-full p-2">
            {property.status}
          </span>
        </p>
        <p className="text-gray-700 text-base ">{property.description}</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <Button
          onClick={handleBuyShare}
          variant="primary"
          className="flex-1"
          icon={DollarSign}
        >
          Buy Share
        </Button>
        {(property.status === "Owned" || property.status === "Offered") && (
          <Button
            onClick={
              property.status === "Owned"
                ? handleOfferToSell
                : handleCancelOffer
            }
            variant={property.status === "Owned" ? "success" : "danger"}
            className={`flex-1 cursor-pointer ${
              property.status === "Owned" ? "hover:bg-green-700" : ""
            }`}
            icon={property.status === "Owned" ? Tag : XCircle}
          >
            {property.status === "Owned" ? " Offer To Sell" : " Cancel Offer"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
