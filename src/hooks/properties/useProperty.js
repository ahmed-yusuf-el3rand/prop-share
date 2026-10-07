import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getPropertyDetails,
  cancelOffer,
} from "../../services/propertiesService";

export const useProperty = (propertyId) => {
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

  const cancelMutation = useMutation({
    mutationFn: () => cancelOffer(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties"],
      });
    },
    onError: (error) => {
      setMessage({
        type: "error",
        text: error?.message ?? "Something went wrong. Please try again.",
      });
    },
  });

  const handleCancelOffer = () => {
    try {
      cancelMutation.mutateAsync(propertyId);
    } catch (error) {
      setMessage(error.message);
      return;
    }
  };

  return {
    ...query,
    isPurchaseModalOpen,
    setIsPurchaseModalOpen,
    isSellModalOpen,
    setIsSellModalOpen,
    location,
    message,
    setMessage,
    handleCancelOffer,
  };
};
