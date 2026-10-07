import InputField from "../components/common/InputField";
import { User, Lock, Mail, UserPlus } from "lucide-react";
import Button from "../components/common/Button";
import GoogleIcon from "../components/common/GoogleIcon";
import { useSignup } from "../hooks/auth/useSignup";
import { useGoogleSignup } from "../hooks/auth/useGoogleSignup";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const {
    form,
    error,
    message,
    isSuccess,
    isPending,
    isResending,
    handleChange,
    handleSubmit,
    handleResendVerification,
  } = useSignup();

  const {
    handleGoogleSignup,
    isPending: isGooglePending,
    error: googleError,
  } = useGoogleSignup();

  return (
    <div className="flex justify-center items-center px-4 py-6">
      {isSuccess ? (
        <div className="bg-white p-4 sm:p-8 w-full max-w-4xl mt-20 mb-40 text-center space-y-10">
          <h2 className="text-3xl font-bold mb-4 ">
            {" "}
            We’ve sent a verification email to your email address.
          </h2>
          <p className="text-gray-700 mb-4 font-medium">
            Please check your inbox and click the verification link to complete
            your registration.
          </p>
          <Button
            onClick={handleResendVerification}
            disabled={isResending}
            icon={Mail}
            className="mb-4 w-full"
          >
            {isResending ? "Resending..." : "Resend Verification Email"}
          </Button>
          {error && (
            <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
          )}
          {message && (
            <p className="text-green-600 mb-4 text-center font-medium">
              {message}
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-8 w-full max-w-4xl mt-20 mb-40">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="your name"
              icon={User}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              icon={Mail}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              icon={Lock}
            />
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            <Button
              type="submit"
              disabled={isPending || isGooglePending}
              className="w-full mt-4"
              icon={UserPlus}
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="relative flex py-4 sm:py-5 items-center bg-white rounded-lg mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button
            onClick={handleGoogleSignup}
            disabled={isPending || isGooglePending}
            variant="secondary"
            className="w-full"
            icon={GoogleIcon}
          >
            {isGooglePending ? "Connecting..." : "Sign Up with Google"}
          </Button>
          {googleError && (
            <p className="text-red-600 mb-4 text-center">{googleError}</p>
          )}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
