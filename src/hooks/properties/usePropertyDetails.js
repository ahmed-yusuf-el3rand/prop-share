import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPropertyDetails } from "../../services/propertiesService";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const usePropertyDetails = (propertyId) => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const location = useLocation();

  const query = useQuery({
    queryKey: ["properties", propertyId],
    queryFn: ({ signal }) => getPropertyDetails(propertyId, { signal }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const cancelOffer = (property) => {
    property.status = "unowned";
  };

  return {
    ...query,
    isPurchaseModalOpen,
    setIsPurchaseModalOpen,
    isSellModalOpen,
    setIsSellModalOpen,
    location,
    cancelOffer,
    message,
    setMessage,
  };
};
