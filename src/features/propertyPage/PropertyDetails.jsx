import Button from "../../components/common/buttons/Button";
import { DollarSign, XCircle, Tag } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import { useRef, useEffect } from "react";

const PropertyDetails = ({
  property,
  handleBuyShare,
  handleOfferToSell,
  handleCancelOffer,
  message,
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
    <div className="md:w-1/2 mb-6">
      <div
        ref={scrollRef}
        className="w-full h-64 overflow-x-auto whitespace-nowrap rounded-lg mb-6 scrollbar-hide"
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
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">{property.name}</h1>

          <p className="text-lg font-semibold text-gray-600">{property.type}</p>
        </div>
        <div className="flex justify-between">
          <p className=" text-lg font-semibold underline text-blue-600">
            {" "}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                property.location,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              {property.location}
            </a>
          </p>
          <p className="font-semibold text-lg">
            Share :{" "}
            <span className="text-lg">
              {formatCurrency(property.sharesValue)}
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold ">
            {formatCurrency(property.price)}
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
            <span
              className={`font-semibold ${
                property.status === "owned"
                  ? "bg-green-100 text-green-800 "
                  : "bg-gray-100 text-gray-800"
              } rounded-full p-2`}
            >
              {property.status}
            </span>
          </p>
        </div>

        <p className="text-gray-700 text-base ">{property.description}</p>
      </div>

      {message && (
        <p
          className={`font-medium mb-6 text-center text-sm mt-2${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="flex space-x-4 mb-6">
        <Button
          onClick={() => {
            handleBuyShare(true);
          }}
          variant="primary"
          className="flex-1 bg-cyan-600 hover:bg-cyan-700"
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
            className={`bg-yellow-400 flex-1 cursor-pointer ${
              property.status === "Owned" ? "hover:bg-yellow-300" : ""
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
