import Modal from "../common/Modal";
import Button from "../common/Button";
import InputField from "../common/InputField";
import { DollarSign, Percent } from "lucide-react";
import { useBuyShare } from "../../hooks/properties/useBuyShare";

const PurchaseModal = ({ isOpen, onClose, property, onConfirm }) => {
  const {
    message,
    value,
    purchaseType,
    setPurchaseType,
    handleChange,
    handlePurchase,
  } = useBuyShare({
    isOpen,
    onClose,
    property,
    onConfirm,
  });

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
        onChange={handleChange}
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

      <Button onClick={handlePurchase} className="w-full mt-4">
        Confirm Purchase
      </Button>
    </Modal>
  );
};
export default PurchaseModal;
