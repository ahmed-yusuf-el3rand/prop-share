import { useState } from "react";
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
import Button from "../../components/common/Button";
import StripeField from "../../components/common/StripeField";

const BankCard = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [bankCard, setBankCard] = useState(null); // Replace with fetched card data if exists
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const addBankCard = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const cardElement = elements.getElement(CardNumberElement);

      // Create a PaymentMethod object
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // Send PaymentMethod.id to backend to attach to customer
      const res = await fetch("/api/bank-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      if (!res.ok) throw new Error("Failed to save card. Try again.");

      const savedCard = await res.json();
      setBankCard(savedCard); // e.g., { brand, last4, id }
      setMessage("Card added successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeBankCard = async (id) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(`/api/bank-card/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove card.");
      setBankCard(null);
      setMessage("Card removed.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
              onClick={() => removeBankCard(bankCard.id)}
              icon={Trash2}
              disabled={loading}
            >
              {loading ? "Removing..." : "Remove"}
            </Button>
          </div>
        ) : (
          <form onSubmit={addBankCard}>
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
              disabled={loading || !stripe}
            >
              {loading ? "Adding..." : "Add Card"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BankCard;
