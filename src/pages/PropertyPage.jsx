import { owners } from "../mock/owners";
import { useEffect } from "react";
import SellModal from "../modals/SellModal";
import { property } from "../mock/property";
import PurchaseModal from "../modals/PurchaseModal";
import PercentagesGraph from "../features/propertyPage/PercentagesGraph";
import PropertyDetails from "../features/propertyPage/PropertyDetails";
import { usePropertyDetails } from "../hooks/properties/usePropertyDetails";

const PropertyPage = (propertyId) => {
  const {
    data,
    isLoading,
    isError,
    isPurchaseModalOpen,
    setIsPurchaseModalOpen,
    isSellModalOpen,
    setIsSellModalOpen,
    message,
    setMessage,
    location,
    cancelOffer,
  } = usePropertyDetails(propertyId);

  useEffect(() => {
    if (location.state?.isPurchaseModalOpen) {
      setIsPurchaseModalOpen(true);
    }
  }, [location.state]);

  return (
    <div className="max-w-6xl mx-auto p-6 mb-40">
      {property ? (
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
      ) : (
        <div className="container p-6 text-center text-gray-600">
          Property not found.
        </div>
      )}

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
