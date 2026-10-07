import InputField from "../common/InputField";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { DollarSign, Percent } from "lucide-react";
import { useOfferPercentage } from "../../hooks/properties/useOfferPercentage";

const SellModal = ({ isOpen, onClose, property, onConfirm }) => {
  const {
    isOffering,
    isError,
    price,
    percentage,
    message,
    handlePercentageChange,
    handlePriceChange,
    handleSell,
  } = useOfferPercentage({isOpen,onClose,property,onConfirm});

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

      <Button onClick={handleSell} className="w-full mt-4">
        Confirm
      </Button>
    </Modal>
  );
};

export default SellModal;
