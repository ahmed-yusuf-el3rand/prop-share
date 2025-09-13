import { ownersData } from "../ownersData";
import { useEffect, useState } from "react";
import SellModal from "../modals/SellModal";
import { useLocation } from "react-router-dom";
import { propertyData } from "../propertyData";
import PurchaseModal from "../modals/PurchaseModal";
import PercentagesGraph from "../features/propertyPage/PercentagesGraph";
import PropertyDetails from "../features/propertyPage/PropertyDetails";

const PropertyPage = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.isPurchaseModalOpen) {
      setIsPurchaseModalOpen(true);
    }
  }, [location.state]);

  if (!propertyData) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        Property not found.
      </div>
    );
  }

  const cancelOffer = () => {
    propertyData.status = "unowned";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mb-24">
      <div className="bg-white overflow-hidden p-6">
        <div className="md:flex md:space-x-8">
          <PropertyDetails
            property={propertyData}
            handleBuyShare={setIsPurchaseModalOpen}
            handleOfferToSell={setIsSellModalOpen}
            handleCancelOffer={cancelOffer}
            message={message}
          />
          <PercentagesGraph ownersData={ownersData} />
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        property={propertyData}
        onConfirm={setMessage}
      />

      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        property={propertyData}
        onConfirm={setMessage}
      />
    </div>
  );
};

export default PropertyPage;
