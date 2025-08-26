import { useState } from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }
    setEmail("");
  };

  const BackToLoginLink = () => {
    navigation("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-3xl h-auto md:h-[400px]">
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
            required
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

          <Button type="submit" className="w-full mt-2" icon={Mail}>
            Send Reset Link
          </Button>
        </form>

        <p className="text-center text-gray-600 text-sm sm:text-base mt-6">
          Remember your password?{" "}
          <button
            type="button"
            onClick={BackToLoginLink}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
