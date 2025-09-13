import Modal from "../components/common/Modal";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import formatCurrency from "../utils/formatCurrency";
import InputField from "../components/common/InputField";
import { CheckCircle, DollarSign, Percent } from "lucide-react";
import calculatePurchase from "../utils/calculatePurchase";

const PurchaseModal = ({ isOpen, onClose, property, onConfirm }) => {
  const [purchaseType, setPurchaseType] = useState("percentage");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
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

    const { percentage, amount } = calculatePurchase(
      purchaseType,
      inputValue,
      property.price
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
          amount
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
      property.price
    );

    if (percentage > maxPercentage) {
      setMessage({
        type: "error",
        text: `You must buy at most ${maxPercentage}% of the property`,
      });
      return;
    }

    onConfirm({
      type: "success",
      text: ` Now You have ${percentage.toFixed(
        2
      )}% of this property for${formatCurrency(amount)}.`,
    });

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

      {message && (
        <div
          className={`mb-4 text-sm font-medium mt-2 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

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
