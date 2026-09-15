import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import Button from "../../components/common/buttons/Button";
import { useKyc } from "../../hooks/dashboard/settingsTab/useKyc";

const KycVerification = () => {
  const {
    kyc,
    loading,
    error,
    startVerification,
    starting,
  } = useKyc();

  if (loading) {
    return (
      <div className="py-6 text-center text-gray-600">
        Loading verification status...
      </div>
    );
  }

  const status = kyc?.status ?? "not_started";

  const handleVerify = async () => {
    try {
      await startVerification();
    } catch (error) {
      console.error("Failed to start KYC:", error);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck
          size={22}
          className="text-cyan-600"
        />

        <h2 className="text-lg font-semibold text-gray-800">
          Identity Verification
        </h2>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Identity verification may be required before you can
        receive investment proceeds.
      </p>

      {true && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="text-cyan-600 mt-1"
              size={22}
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">
                Verify your identity
              </h3>

              <p className="text-sm text-gray-600 mt-1 mb-4">
                Complete identity verification to enable
                eligible payout and selling features.
              </p>

              <Button
                onClick={handleVerify}
                disabled={starting}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {starting
                  ? "Starting verification..."
                  : "Verify Identity"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {status === "pending" && (
        <StatusCard
          icon={Clock3}
          title="Verification pending"
          description="Your identity verification is currently being reviewed."
        />
      )}

      {status === "verified" && (
        <StatusCard
          icon={CheckCircle2}
          title="Identity verified"
          description="Your identity has been successfully verified."
          success
        />
      )}

      {status === "requires_action" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="text-yellow-600 mt-1"
              size={22}
            />

            <div>
              <h3 className="font-semibold text-gray-800">
                Additional information required
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Please continue your verification process.
              </p>

              <Button
                onClick={handleVerify}
                disabled={starting}
                className="mt-4 bg-cyan-600 hover:bg-cyan-700"
              >
                Continue Verification
              </Button>
            </div>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <AlertCircle
              className="text-red-600 mt-1"
              size={22}
            />

            <div>
              <h3 className="font-semibold text-gray-800">
                Verification unsuccessful
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {kyc?.rejectionReason ??
                  "Your verification could not be completed."}
              </p>

              <Button
                onClick={handleVerify}
                disabled={starting}
                className="mt-4 bg-cyan-600 hover:bg-cyan-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-3">
          {error}
        </p>
      )}
    </div>
  );
};

const StatusCard = ({
  icon: Icon,
  title,
  description,
  success = false,
}) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
      <div className="flex items-start gap-3">
        <Icon
          size={22}
          className={
            success
              ? "text-green-600"
              : "text-cyan-600"
          }
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KycVerification;