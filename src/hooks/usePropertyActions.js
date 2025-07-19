export const usePropertyActions = (
  properties,
  setProperties,
  ownedProperties,
  setOwnedProperties,
  setCurrentPage,
  setSelectedProperty,
  setSelectedOwnedProperty
) => {
  const handleDesireToBuy = (property) => {
    setSelectedProperty(property);
    setCurrentPage("propertyDetail");
  };

  const handlePurchaseConfirm = (details) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === details.propertyId
          ? {
              ...p,
              ownershipProgress: Math.min(
                100,
                p.ownershipProgress + details.percentage
              ),
            }
          : p
      )
    );
  };

  const handleDesireToBuyFullConfirm = ({ propertyId, desiredPrice }) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId ? { ...p, status: "desire", desiredPrice } : p
      )
    );
  };

  const handleOfferToSell = ({ propertyId }) => {
    setOwnedProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? { ...p, isOfferedToSell: true, propertyStatus: "Pending Sale" }
          : p
      )
    );
  };

  const handleDesireToRent = ({ propertyId }) => {
    setOwnedProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? { ...p, isOfferedToRent: true, propertyStatus: "Pending Rent" }
          : p
      )
    );
  };

  const handleCancelRentOffer = (propertyId) => {
    setOwnedProperties((prev) =>
      prev.map((p) =>
        p.id === propertyId
          ? { ...p, isOfferedToRent: false, propertyStatus: "Active" }
          : p
      )
    );
  };

  const handleRemoveProperty = (propertyId) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setOwnedProperties((prev) => prev.filter((p) => p.id !== propertyId));
    alert(`Property ${propertyId} removed from platform.`);
  };

  const handleEditProperty = (propertyId) => {
    alert(`Simulating edit for property ${propertyId}.`);
  };

  return {
    handleDesireToBuy,
    handlePurchaseConfirm,
    handleDesireToBuyFullConfirm,
    handleOfferToSell,
    handleDesireToRent,
    handleCancelRentOffer,
    handleRemoveProperty,
    handleEditProperty,
  };
};

 export const handleDesireToBuy = (property) => {
    setSelectedProperty(property);
    setCurrentPage("propertyDetail");
  };