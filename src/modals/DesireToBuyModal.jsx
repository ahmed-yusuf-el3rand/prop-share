import { useEffect, useState } from "react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import Modal from "./Modal";
import { DollarSign,CheckCircle } from "lucide-react";
// New Modal for 'Desire to Buy Fraction' for full properties
const DesireToBuyFullModal = ({ isOpen, onClose, property, onDesireConfirm }) => {
  const [desiredPrice, setDesiredPrice] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDesiredPrice('');
      setMessage('');
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const price = parseFloat(desiredPrice);
    if (isNaN(price) || price <= 0) {
      setMessage(<span className="text-red-600 text-sm">Please enter a valid desired price.</span>);
      return;
    }
    onDesireConfirm({ propertyId: property.id, desiredPrice: price });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Desire to Buy ${property?.name || ''}`}>
      <p className="text-gray-700 mb-4">
        You are expressing a desire to buy this full property. Please enter your desired purchase price.
      </p>
      <InputField
        label="Desired Price ($)"
        type="number"
        value={desiredPrice}
        onChange={(e) => setDesiredPrice(e.target.value)}
        placeholder={`e.g., ${property?.price || '500000'}`}
        icon={DollarSign}
        min="0"
        step="1000"
        required
      />
      {message && <p className="mb-4">{message}</p>}
      <Button onClick={handleConfirm} className="w-full mt-4" icon={CheckCircle}>
        Submit Desire
      </Button>
    </Modal>
  );
};

export default DesireToBuyFullModal;