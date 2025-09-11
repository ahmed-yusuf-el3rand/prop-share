import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import { formatCurrency } from "../utils/formatCurrency";
import InputField from "../components/common/InputField";
import { CheckCircle, DollarSign, Percent } from "lucide-react";

const PurchaseModal = ({ isOpen, onClose, property, onConfirm }) => {
  const [purchaseType, setPurchaseType] = useState("percentage");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const maxPercentage = 100;

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setMessage("");
    }
  }, [isOpen]);

  const handleValueChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setValue(e.target.value);

    if (isNaN(inputValue) || inputValue <= 0) {
      setMessage("");
      return;
    }

    let calculatedPercentage = 0;
    let calculatedAmount = 0;

    if (purchaseType === "percentage") {
      calculatedPercentage = inputValue;
      calculatedAmount = (inputValue / 100) * property.price;
    } else {
      calculatedAmount = inputValue;
      calculatedPercentage = (inputValue / property.price) * 100;
    }

    if (calculatedPercentage > maxPercentage) {
      setMessage(
        <span className="text-red-600 text-sm font-medium mt-2">
          You must buy at most {maxPercentage}% of the property
        </span>
      );
    } else {
      setMessage(
        <span className="text-green-600 font-medium text-sm mt-2">
          You are buying {calculatedPercentage.toFixed(2)}% of this property for{" "}
          {formatCurrency(calculatedAmount)}.
        </span>
      );
    }
  };

  const handlePurchase = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue) || inputValue <= 0) {
      setMessage(
        <span className="text-red-600 text-sm font-medium mt-2">
          Please enter a valid amount or percentage.
        </span>
      );
      return;
    }

    let calculatedPercentage = 0;
    let calculatedAmount = 0;

    if (purchaseType === "percentage") {
      calculatedPercentage = inputValue;
      calculatedAmount = (inputValue / 100) * property.price;
    } else {
      calculatedAmount = inputValue;
      calculatedPercentage = (inputValue / property.price) * 100;
    }

    if (!user) {
      setMessage(
        <span className="text-red-600 text-sm font-medium mt-2">
          Please sign up or log in to buy a share.
        </span>
      );
      return;
    }

    if (!user.paymentMethods || user.paymentMethods.length === 0) {
      setMessage(
        <span className="text-red-600 text-sm font-medium mt-2">
          No payment method added. Please add one in settings.
        </span>
      );
      return;
    }

    onConfirm(
      <span className="text-green-600">
        Now You have {calculatedPercentage.toFixed(2)}% of this property for{" "}
        {formatCurrency(calculatedAmount)}.
      </span>
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Buy share of ${property?.name}`}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Purchase By:
        </label>
        <div className="flex space-x-4">
          <Button
            className="flex-1"
            onClick={() => setPurchaseType("percentage")}
            variant={purchaseType === "percentage" ? "primary" : "secondary"}
          >
            Percentage (%)
          </Button>
          <Button
            className="flex-1"
            onClick={() => setPurchaseType("amount")}
            variant={purchaseType === "amount" ? "primary" : "secondary"}
          >
            Amount ($)
          </Button>
        </div>
      </div>

      <InputField
        label={`Enter ${
          purchaseType === "percentage" ? "Percentage (%)" : "Amount ($)"
        }`}
        type="number"
        value={value}
        onChange={handleValueChange}
        placeholder={`e.g., ${purchaseType === "percentage" ? "5" : "50000"}`}
        min="0"
        step={purchaseType === "percentage" ? "0.1" : "1000"}
        icon={purchaseType === "percentage" ? Percent : DollarSign}
      />

      {message && <div className="mb-4">{message}</div>}

      <Button
        onClick={handlePurchase}
        className="w-full mt-4"
        icon={CheckCircle}
      >
        Confirm Purchase
      </Button>
    </Modal>
  );
};
export default PurchaseModal;
