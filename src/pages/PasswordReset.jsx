import { useRef, useState } from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/validation";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }
    const isValidEmail = validateEmail(trimmedEmail);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Call backend API here
      await new Promise((res) => setTimeout(res, 1500)); // fake delay
      setMessage(
        "If this email is registered, a reset link has been sent. Please check your inbox."
      );

      setCooldown(30);

      timerRef.current = setInterval(() => {
        setCooldown((prevCooldown) => {
          if (prevCooldown <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prevCooldown - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Reset Password
        </h1>

        <p className="text-gray-600 text-sm sm:text-base mb-6 text-center">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-12">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            icon={Mail}
            autoFocus
          />
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

          <Button
            type="submit"
            className="w-full mt-2"
            icon={Mail}
            disabled={loading || cooldown > 0}
          >
            {loading
              ? "Sending..."
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Send Reset Link"}
          </Button>
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

export default PasswordReset;
