import { useState } from "react";
import PurchaseModal from "../modals/Purchase";
import SellModal from "../modals/Sell";
import PercentagesGraph from "../features/property/PercentagesGraph";
import PropertyDetails from "../features/property/PropertyDetails";
import { ownersData } from "../ownersData";
import { propertyData } from "../propertyData";

const Property = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [message, setMessage] = useState("");

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
    <div className="mx-auto p-6 mb-36">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
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

export default Property;
