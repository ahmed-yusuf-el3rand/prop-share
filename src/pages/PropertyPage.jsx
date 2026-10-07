import { owners } from "../mock/owners";
import { useEffect } from "react";
import SellModal from "../components/modals/SellModal";
import { property } from "../mock/property";
import PurchaseModal from "../components/modals/PurchaseModal";
import PercentagesGraph from "../features/propertyPage/PercentagesGraph";
import PropertyDetails from "../features/propertyPage/PropertyDetails";
import { useProperty } from "../hooks/properties/useProperty";
import { Loader2 } from "lucide-react";

const PropertyPage = (propertyId) => {
  const {
    data,
    isLoading,
    isPurchaseModalOpen,
    setIsPurchaseModalOpen,
    isSellModalOpen,
    setIsSellModalOpen,
    message,
    setMessage,
    location,
    handleCancelOffer,
  } = useProperty(propertyId);

  useEffect(() => {
    if (location.state?.isPurchaseModalOpen) {
      setIsPurchaseModalOpen(true);
    }
  }, [location.state]);

  return (
    <div className="max-w-6xl mx-auto p-6 mb-40">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 mt-20">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
          <p className="text-gray-700 font-medium">
            Loading property details...
          </p>
        </div>
      ) : (
        <div className="bg-white overflow-hidden p-6">
          {property ? (
            <div className="md:flex md:space-x-8">
              <PropertyDetails
                property={property}
                handleBuyShare={setIsPurchaseModalOpen}
                handleOfferToSell={setIsSellModalOpen}
                handleCancelOffer={handleCancelOffer}
                message={message}
              />
              <PercentagesGraph ownersData={owners} />
            </div>
          ) : (
            <div className="container p-6 text-center text-gray-600">
              Property not found.
            </div>
          )}
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
