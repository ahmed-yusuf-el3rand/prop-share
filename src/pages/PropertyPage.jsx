import { owners } from "../mock/owners";
import { useEffect, useState } from "react";
import SellModal from "../modals/SellModal";
import { useLocation } from "react-router-dom";
import { property } from "../mock/property";
import PurchaseModal from "../modals/PurchaseModal";
import PercentagesGraph from "../features/propertyPage/PercentagesGraph";
import PropertyDetails from "../features/propertyPage/PropertyDetails";
import { usePropertyDetails } from "../hooks/properties/usePropertyDetails";

const PropertyPage = (propertyId) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const { data } = usePropertyDetails(propertyId);

  useEffect(() => {
    if (location.state?.isPurchaseModalOpen) {
      setIsPurchaseModalOpen(true);
    }
  }, [location.state]);

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        Property not found.
      </div>
    );
  }

  const cancelOffer = () => {
    property.status = "unowned";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mb-24">
      <div className="bg-white overflow-hidden p-6">
        <div className="md:flex md:space-x-8">
          <PropertyDetails
            property={property}
            handleBuyShare={setIsPurchaseModalOpen}
            handleOfferToSell={setIsSellModalOpen}
            handleCancelOffer={cancelOffer}
            message={message}
          />
          <PercentagesGraph ownersData={owners} />
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        property={property}
        onConfirm={setMessage}
      />

      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        property={property}
        onConfirm={setMessage}
      />
    </div>
  );
};

export default PropertyPage;
