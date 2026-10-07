import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InformationForm from "./settingsTab/InformationForm";
import PasswordForm from "./settingsTab/PasswordForm";
import BankCardForm from "./settingsTab/BankCardForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const SettingsTab = () => {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <InformationForm />
      <PasswordForm />
      <Elements stripe={stripePromise}>
        <BankCardForm />
      </Elements>
    </div>
  );
  //Bank card - KYC -Payouts
};

export default SettingsTab;
