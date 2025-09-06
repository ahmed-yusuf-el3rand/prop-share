import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import FractionalPurchaseModal from "../modals/FractionalPurchaseModal";
import DesireToBuyFullModal from "../modals/DesireToBuyModal";
import OwnerPercentagesGraph from "../features/property/OwnerPercentagesGraph";
import PropertyDetails from "../features/property/PropertyDetails";
import { ownersData } from "../ownersData";
import { property } from "../property";

const Property = ({
  currentUser,
  onShowPaymentSettings,
  onPurchaseSuccess,
  onDesireToBuyFullConfirm,
}) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isDesireToBuyFullModalOpen, setIsDesireToBuyFullModalOpen] =
    useState(false);

  if (!property) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-600">
        Property not found.
      </div>
    );
  }

  const handleBuyFractionNowClick = () => {
    currentUser = true;
    if (!currentUser) {
      setMessage("Please sign up or log in to buy a fraction.");
      return;
    }

    if (
      !currentUser.paymentMethods ||
      currentUser.paymentMethods.length === 0
    ) {
      setMessage("No payment method added. Please add one in settings.");
      onShowPaymentSettings();
      return;
    }
    setIsPurchaseModalOpen(true);
  };

  const handleDesireToBuyFullModalConfirm = (details) => {
    onDesireToBuyFullConfirm(details);
    setHasExpressedDesire(true);
    setMessage(
      `Your desire to buy this property for ${formatCurrency(
        details.desiredPrice
      )} has been registered.`
    );
  };

  const buyShare = () => {
    handleBuyFractionNowClick();
  };
  const offerToSell = () => {
    alert("Offer to sell clicked");
  };
  const cancelOffer = () => {
    alert("Cancel offer clicked");
  };

  return (
    <div className="mx-auto p-6 mb-36">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <div className="md:flex md:space-x-8">
          <PropertyDetails
            property={property}
            handleBuyShare={buyShare}
            handleOfferToSell={offerToSell}
            handleCancelOffer={cancelOffer}
          />
          <OwnerPercentagesGraph ownersData={ownersData} />
        </div>
      </div>

      <FractionalPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        property={property}
        onPurchase={onPurchaseSuccess} // Pass the success handler
      />
      <DesireToBuyFullModal
        isOpen={isDesireToBuyFullModalOpen}
        onClose={() => setIsDesireToBuyFullModalOpen(false)}
        property={property}
        onDesireConfirm={handleDesireToBuyFullModalConfirm}
      />
    </div>
  );
};

export default Property;
