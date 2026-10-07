import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyShare } from "../../services/propertiesService";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import formatCurrency from "../../utils/formatCurrency";
import calculatePurchase from "../../utils/calculatePurchase";

export const useBuyShare = ({ isOpen, onClose, property, onConfirm }) => {
  const [purchaseType, setPurchaseType] = useState("percentage");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const { user } = useAuth();
  const maxPercentage = 100;
  const [purchasingDetails, setPurchasingDetails] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setMessage("");
    }
  }, [isOpen]);

  const queryClient = useQueryClient();
  const buyShareMutation = useMutation({
    mutationFn: () => buyShare(purchasingDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties", purchasingDetails],
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

  const handleChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setValue(e.target.value);
    if (isNaN(inputValue) || inputValue <= 0) {
      setMessage("");
      return;
    }

    const { percentage, amount } = calculatePurchase(
      purchaseType,
      inputValue,
      property.price,
    );

    if (percentage > maxPercentage) {
      setMessage({
        type: "error",
        text: `You must buy at most ${maxPercentage}% of the property`,
      });
    } else {
      setMessage({
        type: "success",
        text: `You are buying ${percentage}% of this property for ${formatCurrency(
          amount,
        )}.`,
      });
    }
  };

  const handlePurchase = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue) || inputValue <= 0) {
      setMessage({
        type: "error",
        text: "Please enter a valid amount or percentage.",
      });
      return;
    }
    if (!user) {
      setMessage({
        type: "error",
        text: "Please sign up or log in to buy a share.",
      });
      return;
    }
    if (!user.paymentMethods || user.paymentMethods.length === 0) {
      setMessage({
        type: "error",
        text: "No payment method added. Please add one in settings.",
      });
      return;
    }

    const { percentage, amount } = calculatePurchase(
      purchaseType,
      inputValue,
      property.price,
    );

    if (percentage > maxPercentage) {
      setMessage({
        type: "error",
        text: `You must buy at most ${maxPercentage}% of the property`,
      });
      return;
    }

    setPurchasingDetails({
      property: property,
      value: value,
      percentage: percentage,
    });

    try {
      buyShareMutation.mutateAsync(purchasingDetails);
    } catch (error) {
      setMessage(error.message);
      return;
    }

    onConfirm({
      type: "success",
      text: `Now You have ${percentage.toFixed(2)}% of this property for${formatCurrency(amount)}.`,
    });

    onClose();
  };

  return {
    message,
    value,
    purchaseType,
    setPurchaseType,
    handleChange,
    handlePurchase,
  };
};
