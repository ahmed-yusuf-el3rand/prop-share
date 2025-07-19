import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Modal from './Modal'
import InputField from "../components/common/InputField";
import { CheckCircle,DollarSign,Percent } from "lucide-react";
const FractionalPurchaseModal = ({ isOpen, onClose, property, onPurchase }) => {
  const [purchaseType, setPurchaseType] = useState('percentage'); // 'percentage' or 'amount'
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const minPercentage = 2; // Minimum percentage for purchase

  useEffect(() => {
    if (isOpen) {
      setValue('');
      setFeedback('');
    }
  }, [isOpen]);

  const handleValueChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setValue(e.target.value);

    if (isNaN(inputValue) || inputValue <= 0) {
      setFeedback('');
      return;
    }

    let calculatedPercentage = 0;
    let calculatedAmount = 0;

    if (purchaseType === 'percentage') {
      calculatedPercentage = inputValue;
      calculatedAmount = (inputValue / 100) * property.price;
    } else { // purchaseType === 'amount'
      calculatedAmount = inputValue;
      calculatedPercentage = (inputValue / property.price) * 100;
    }

    if (calculatedPercentage < minPercentage) {
      setFeedback(
        <span className="text-red-600 text-sm mt-2 flex items-center gap-1">
          <XCircle size={16} /> You must buy at least {minPercentage}% of the property.
        </span>
      );
    } else {
      setFeedback(
        <span className="text-green-600 text-sm mt-2 flex items-center gap-1">
          <CheckCircle size={16} /> You’re buying {calculatedPercentage.toFixed(2)}% of this property for {formatCurrency(calculatedAmount)}.
        </span>
      );
    }
  };

  const handlePurchase = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue) || inputValue <= 0) {
      setFeedback(<span className="text-red-600 text-sm mt-2">Please enter a valid amount or percentage.</span>);
      return;
    }

    let calculatedPercentage = 0;
    let calculatedAmount = 0;

    if (purchaseType === 'percentage') {
      calculatedPercentage = inputValue;
      calculatedAmount = (inputValue / 100) * property.price;
    } else { // purchaseType === 'amount'
      calculatedAmount = inputValue;
      calculatedPercentage = (inputValue / property.price) * 100;
    }

    onPurchase({
      propertyId: property.id,
      percentage: calculatedPercentage,
      amount: calculatedAmount,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Buy Fraction of ${property?.name || ''}`}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Purchase By:</label>
        <div className="flex space-x-4">
          <Button
            variant={purchaseType === 'percentage' ? 'primary' : 'secondary'}
            onClick={() => setPurchaseType('percentage')}
            className="flex-1"
          >
            By Percentage (%)
          </Button>
          <Button
            variant={purchaseType === 'amount' ? 'primary' : 'secondary'}
            onClick={() => setPurchaseType('amount')}
            className="flex-1"
          >
            By Amount ($)
          </Button>
        </div>
      </div>

      <InputField
        label={`Enter ${purchaseType === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}`}
        type="number"
        value={value}
        onChange={handleValueChange}
        placeholder={`e.g., ${purchaseType === 'percentage' ? '5' : '50000'}`}
        min="0"
        step={purchaseType === 'percentage' ? "0.1" : "1000"}
        icon={purchaseType === 'percentage' ? Percent : DollarSign}
      />

      {feedback && <div className="mb-4">{feedback}</div>}

      <Button onClick={handlePurchase} className="w-full mt-4" icon={CheckCircle}>
        Confirm Purchase
      </Button>
    </Modal>
  );
};
export default FractionalPurchaseModal;