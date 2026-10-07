import { useMutation, useQueryClient } from "@tanstack/react-query";
import { offerPercentage } from "../../services/propertiesService";
import formatCurrency from "../../utils/formatCurrency";
import { useState, useEffect } from "react";

export const useOfferPercentage = ({
  isOpen,
  onClose,
  property,
  onConfirm,
}) => {
  const [percentage, setPercentage] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState(null);
  const [offerDetails, setOfferDetails] = useState(null);
  const maxPercentage = 100;

  useEffect(() => {
    if (isOpen) {
      setPrice("");
      setPercentage("");
      setMessage(null);
    }
  }, [isOpen]);

  const queryClient = useQueryClient();
  const offerMutation = useMutation({
    mutationFn: () => offerPercentage(offerDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties", offerDetails],
      });
    },
    onError: (error) => {
      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      });
    },
  });

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
    const percentageValue = parseFloat(e.target.value);
    if (isNaN(percentageValue) || percentageValue <= 0) {
      setMessage("");
      return;
    }
    if (percentageValue > maxPercentage) {
      setMessage({
        type: "error",
        text: ` You can sell at most ${maxPercentage}% of the property`,
      });
    } else {
      setMessage({
        type: "success",
        text: `You will offer ${percentageValue}% of this property to sell`,
      });
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    const priceValue = parseFloat(e.target.value);
    if (isNaN(priceValue) || priceValue <= 0) {
      setMessage("");
      return;
    } else {
      setMessage({
        type: "success",
        text: `You offered ${parseFloat(percentage)}% of this property to sell for ${priceValue}`,
      });
    }
  };

  const handleSell = () => {
    const priceValue = parseFloat(price);
    const percentageValue = parseFloat(percentage);
    if (
      isNaN(priceValue) ||
      isNaN(percentageValue) ||
      percentageValue <= 0 ||
      priceValue <= 0
    ) {
      setMessage({
        type: "error",
        text: " Please enter a valid Percentage and Price.",
      });
      return;
    }
    if (percentageValue > maxPercentage) {
      setMessage({
        type: "error",
        text: ` You can sell at most ${maxPercentage}% of the property`,
      });
      return;
    }
    setOfferDetails({
      property,
      percentageValue,
      price,
    });
    try {
      offerMutation.mutateAsync(offerDetails);
    } catch (error) {
      setMessage(error.message);
      return;
    }
    onConfirm({
      type: "success",
      text: `You offered ${percentage}% of this property to sell for ${formatCurrency(
        price,
      )}.`,
    });
    onClose();
  };

  return {
    isOffering: offerMutation.isLoading,
    isError: offerMutation.isError,
    percentage,
    setPercentage,
    price,
    setPrice,
    message,
    setMessage,
    maxPercentage,
    handlePriceChange,
    handlePercentageChange,
    handleSell,
  };
};
