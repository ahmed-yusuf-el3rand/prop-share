import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../hooks/auth/useForgotPassword";
const ForgotPasswordPage = () => {
  const {
    isPending,
    cooldown,
    formData,
    error,
    message,
    handleSubmit,
    handleEmailChange,
  } = useForgotPassword();

  return (
    <div className="flex justify-center items-center px-4 py-6">
      <div className="bg-white p-4 sm:p-8 w-full max-w-3xl mt-20 mb-40">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Forgot Password
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 text-center">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            placeholder="your@email.com"
            icon={Mail}
            autoFocus
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || cooldown > 0}
          >
            {isPending
              ? "Sending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Send Reset Link"}
          </Button>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </form>
        <p className="text-center text-gray-600 mt-6">
          Remember your password?{" "}
          <Link to={"/login"} className="text-cyan-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
