import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PasswordForm from "../settingsTab/PasswordForm";
import BankCardForm from "../settingsTab/BankCardForm";
import InformationForm from "../settingsTab/InformationForm";

const SettingsTab = () => {
  const stripePromise = loadStripe("your-publishable-key-here");

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <InformationForm />
      <PasswordForm />

      <Elements stripe={stripePromise}>
        <BankCardForm />
      </Elements>
    </div>
  );
};

export default SettingsTab;
