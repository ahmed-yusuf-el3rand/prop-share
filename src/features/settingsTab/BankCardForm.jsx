import { useState } from "react";
import Button from "../../components/common/Button";
import StripeField from "../../components/common/StripeField";
import { useBankCard } from "../../hooks/dashboard/settingsTab/useBankCard";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Trash2,
  CreditCard,
  Calendar,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";

const BankCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { bankCard, loading, error, addCard, adding, deleteCard, deleting } =
    useBankCard();

  const [focused, setFocused] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const clientSecret = await createSetupIntent(customerId);

      const { setupIntent, error } = await stripe.confirmCardSetup(
        clientSecret,
        {
          paymentMethod: {
            card: cardElement,
          },
        },
      );
      if (stripeError) {
        setMessage(stripeError.message);
        return;
      }

      const cardDetails = {
        paymentMethodId: paymentMethod.id,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
      };

      await addCard(cardDetails);
      setMessage("Card added successfully");
      elements.getElement(CardNumberElement)?.clear();
      elements.getElement(CardExpiryElement)?.clear();
      elements.getElement(CardCvcElement)?.clear();
    } catch (error) {
      setMessage("Failed to add card");
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id);
      setMessage("Card deleted successfully");
    } catch (error) {
      setMessage("Failed to delete card");
    }
  };

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <CreditCard size={20} /> Banking Card
      </h3>

      <div className="space-y-4 mb-6">
        {bankCard ? (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-4 rounded-md shadow-sm gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <CreditCard size={20} className="text-blue-500 mt-0.5 sm:mt-0" />
              <span className="text-sm sm:text-base truncate">
                {bankCard.brand.toUpperCase()} •••• {bankCard.last4}
              </span>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteCard(bankCard.id)}
              icon={Trash2}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Card"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleAddCard}>
            <div className="grid md:grid-cols-2 gap-4">
              <StripeField
                label="Card Number"
                icon={CreditCard}
                id="cardNumber"
                isFocused={focused}
              >
                <CardNumberElement
                  options={{
                    placeholder: "XXXX XXXX XXXX XXXX",
                    style: { base: { fontSize: "16px" } },
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </StripeField>

              <StripeField label="Expiry Date" icon={Calendar} id="cardExpiry">
                <CardExpiryElement
                  options={{
                    style: {
                      base: { fontSize: "16px" },
                      focus: { color: "#1D4ED8" },
                    },
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </StripeField>

              <StripeField label="CVC" icon={ShieldCheck} id="cardCvc">
                <CardCvcElement
                  options={{
                    placeholder: "XXXX",
                    style: { base: { fontSize: "16px" } },
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
              </StripeField>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {message && (
              <p className="text-green-600 text-sm mt-2">{message}</p>
            )}

            <Button
              type="submit"
              className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700"
              icon={PlusCircle}
              disabled={adding || !stripe}
            >
              {adding ? "Adding..." : "Add Card"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BankCard;
