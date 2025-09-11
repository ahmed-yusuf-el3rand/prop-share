import { useEffect, useState } from "react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import Modal from "./Modal";
import { DollarSign, CheckCircle, Percent } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

const Sell = ({ isOpen, onClose, property, onConfirm }) => {
  const [percentage, setPercentage] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [message, setMessage] = useState("");
  const maxPercentage = 100;

  useEffect(() => {
    if (isOpen) {
      setAskingPrice("");
      setPercentage("");
      setMessage("");
    }
  }, [isOpen]);

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
    const percentage = parseFloat(e.target.value);
    if (isNaN(percentage) || percentage <= 0) {
      setMessage("");
      return;
    }

    if (percentage > maxPercentage) {
      setMessage(
        <span className="text-red-600 text-sm font-medium mt-2">
          You can sell at most {maxPercentage}% of the property
        </span>
      );
    }
  };

  const handlePriceChange = (e) => {
    setAskingPrice(e.target.value);
    const price = parseFloat(e.target.value);
    if (isNaN(price) || price <= 0) {
      setMessage("");
      return;
    }
  };

  const handleConfirm = () => {
    const price = parseFloat(askingPrice);
    const percentageValue = parseFloat(percentage);
    if (
      isNaN(price) ||
      isNaN(percentageValue) ||
      percentageValue <= 0 ||
      price <= 0
    ) {
      setMessage(
        <span className="text-red-600 text-sm font-medium mt-2">
          Please enter a valid Percentage and Price.
        </span>
      );
    }

    onConfirm(
      <span className="text-green-600 font-medium text-sm mt-2">
        You offered {percentageValue.toFixed(2)}% of this property to sell for{" "}
        {formatCurrency(price)}.
      </span>
    );
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Desire to Buy ${property?.name}`}
    >
      <InputField
        label="Percentage to Sell (%)"
        type="number"
        value={percentage}
        onChange={handlePercentageChange}
        placeholder="e.g., 5"
        icon={Percent}
        min="0"
        step="0.1"
        required
      />
      <InputField
        label="Asking Price ($)"
        type="number"
        value={askingPrice}
        onChange={handlePriceChange}
        placeholder="e.g., 500000"
        icon={DollarSign}
        min="0"
        step="1000"
        required
      />
      {message && <p className="mb-4">{message}</p>}
      <Button
        onClick={handleConfirm}
        className="w-full mt-4"
        icon={CheckCircle}
      >
        Confirm
      </Button>
    </Modal>
  );
};

export default Sell;
