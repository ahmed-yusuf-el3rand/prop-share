import Button from "../components/common/buttons/Button";
import InputField from "../components/common/InputField";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { usePasswordForgot } from "../hooks/auth/usePasswordForgot";
const PasswordForgotPage = () => {
  const {
    isLoading,
    cooldown,
    handleSubmit,
    handleEmailChange,
    form,
    error,
    message,
  } = usePasswordForgot();

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white p-6 sm:p-8 w-full max-w-3xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Reset Password
        </h1>

        <p className="text-gray-600 text-sm sm:text-base mb-6 text-center">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-7">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleEmailChange}
            placeholder="your@example.com"
            icon={Mail}
            autoFocus
          />
          <Button
            type="submit"
            className="w-full"
            icon={Mail}
            disabled={isLoading || cooldown > 0}
          >
            {isLoading
              ? "Sending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Send Reset Link"}
          </Button>
          {message && (
            <p className="text-green-600 text-sm sm:text-base text-center">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm sm:text-base text-center">
              {error}
            </p>
          )}
        </form>

        <p className="text-center text-gray-600 text-sm sm:text-base mt-6">
          Remember your password?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordForgotPage;
