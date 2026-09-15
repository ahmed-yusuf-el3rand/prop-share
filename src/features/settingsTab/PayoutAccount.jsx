import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import Button from "../../components/common/buttons/Button";
import { usePayoutAccount } from "../../hooks/dashboard/settingsTab/usePayoutAccount";

const PayoutAccount = () => {
  const {
    account,
    isLoading,
    isOnboarding,
    isWithdrawing,
    error,
    startOnboarding,
    withdraw,
  } = usePayoutAccount();

  const [message, setMessage] = useState("");

  const isConnected =
    account?.connected === true;

  const canWithdraw =
    account?.payoutsEnabled === true &&
    account?.availableBalance > 0;

  const handleSetup = async () => {
    setMessage("");

    try {
      await startOnboarding();
    } catch {
      setMessage(
        "Unable to start payout setup. Please try again.",
      );
    }
  };

  const handleWithdraw = async () => {
    setMessage("");

    try {
      await withdraw(account.availableBalance);

      setMessage(
        "Your withdrawal has been requested successfully.",
      );
    } catch {
      setMessage(
        "Unable to process your withdrawal.",
      );
    }
  };

  if (isLoading) {
    return (
      <section className="border-t pt-6 mt-6">
        <p className="text-gray-600">
          Loading payout account...
        </p>
      </section>
    );
  }

  return (
    <section className="border-t pt-6 mt-6">
      <div className="flex items-center gap-2 mb-2">
        <Building2
          size={22}
          className="text-blue-600"
        />

        <h2 className="text-lg font-semibold text-gray-800">
          Payout Account
        </h2>
      </div>

      <p className="text-sm text-gray-600 mb-5">
        Manage the bank account where you receive
        money from property sales.
      </p>

      {!isConnected ? (
        <div className="rounded-lg bg-gray-50 p-5">
          <div className="flex gap-3 mb-4">
            <ShieldCheck
              size={22}
              className="text-blue-600"
            />

            <div>
              <p className="font-medium text-gray-800">
                Set up your payout account
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Stripe will securely handle identity
                verification and bank account setup.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleSetup}
            disabled={isOnboarding}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isOnboarding
              ? "Opening Stripe..."
              : "Set Up Payouts"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bank account */}

          <div className="rounded-lg bg-gray-50 p-5">
            <div className="flex items-center gap-3">
              <Building2
                size={22}
                className="text-blue-600"
              />

              <div>
                <p className="font-medium text-gray-800">
                  {account.bankAccount.bankName}
                </p>

                <p className="text-sm text-gray-600">
                  Bank account ••••{" "}
                  {account.bankAccount.last4}
                </p>
              </div>

              <CheckCircle2
                size={20}
                className="text-green-600 ml-auto"
              />
            </div>
          </div>

          {/* Balance */}

          <div className="rounded-lg bg-gray-50 p-5">
            <div className="flex items-center gap-3 mb-2">
              <Wallet
                size={22}
                className="text-blue-600"
              />

              <p className="font-medium text-gray-800">
                Available balance
              </p>
            </div>

            <p className="text-3xl font-bold text-gray-900">
              ${account.availableBalance}
            </p>
          </div>

          {/* Withdraw */}

          <Button
            type="button"
            onClick={handleWithdraw}
            disabled={
              isWithdrawing ||
              !canWithdraw
            }
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isWithdrawing
              ? "Processing..."
              : "Withdraw Money"}
          </Button>
        </div>
      )}

      {(error || message) && (
        <p
          className={`text-sm mt-3 ${
            error
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {error || message}
        </p>
      )}
    </section>
  );
};

export default PayoutAccount;