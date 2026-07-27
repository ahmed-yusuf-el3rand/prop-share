import { useEffect, useState } from "react";
import InputField from "../components/common/InputField";
import Button from "../components/common/buttons/Button";
import Modal from "../components/common/Modal";
import { DollarSign, CheckCircle, Percent } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import { useOfferPercentage } from "../hooks/properties/useOfferPercentage";

const SellModal = ({ isOpen, onClose, property, onConfirm }) => {
  const [percentage, setPercentage] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState(null);
  const maxPercentage = 100;
  const { offerProperty, isOffering, isError } = useOfferPercentage;

  useEffect(() => {
    if (isOpen) {
      setPrice("");
      setPercentage("");
      setMessage(null);
    }
  }, [isOpen]);

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
        text: `You offered this percentage of this property to sell for ${priceValue}`,
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

    const offerDetails = {
      property,
      percentageValue,
      price,
    };
    try {
      offerProperty(offerDetails);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Offer to Sell ${property?.name}`}
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
        value={price}
        onChange={handlePriceChange}
        placeholder="e.g., 500000"
        icon={DollarSign}
        min="0"
        step="1000"
        required
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

      <Button onClick={handleSell} className="w-full mt-4" icon={CheckCircle}>
        Confirm
      </Button>
    </Modal>
  );
};

export default SellModal;
