import { Link } from "react-router-dom";
import { useVerifyEmail } from "../hooks/auth/useVerifyEmail";
import Button from "../components/common/buttons/Button";
import { Mail, Loader2 } from "lucide-react";

const VerifyEmailPage = () => {
  const {
    isLoading,
    isSuccess,
    handleGoToLogin,
    handleResendVerification,
    isResending,
    message,
    error,
  } = useVerifyEmail();

  return (
    <div className="p-6 flex justify-center items-center">
      <div className="p-8 w-full max-w-4xl mt-40 mb-80 text-center flex flex-col items-center gap-4 ">
        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-gray-700 font-medium">Verifying your email...</p>
          </div>
        )}

        {isSuccess && (
          <>
            <h2 className="text-3xl font-bold mb-4  text-green-600">
              Your email verified!
            </h2>

            <p className="text-gray-700 mb-4 font-medium">{message}</p>

            <Button className="mb-4 w-full" onClick={handleGoToLogin}>
              Go to Login
            </Button>
          </>
        )}

        {error && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-red-600">
              Verification Failed
            </h2>

            <p className="text-gray-700 mb-4 font-medium">
              {message ||
                "Please click the button below to receive a new verification email."}
            </p>
            <Button
              onClick={handleResendVerification}
              disabled={isResending}
              icon={Mail}
              className="mt-4 w-full"
            >
              {isResending ? "Resending..." : "Resend Verification Email"}
            </Button>
            {error && (
              <p className="text-red-600 mb-4 text-center font-medium">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
