import SelectField from "../components/common/SelectField";
import InputField from "../components/common/InputField";
import { User, Lock, Briefcase, Mail, UserPlus } from "lucide-react";
import Button from "../components/common/buttons/Button";
import GoogleIcon from "../components/common/icons/GoogleIcon";
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
    handleChange,
    handleSubmit,
    handleResendVerification,
    isResending,
  } = useSignup();

  const { handleGoogleSignup, isPending: isGooglePending } = useGoogleSignup();

  return (
    <div className="p-6 flex justify-center items-center">
      {isSuccess ? (
        <div className="p-8 w-full max-w-4xl mt-40 mb-80 text-center flex flex-col items-center gap-4">
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
        <div className="bg-white p-8 w-full max-w-4xl mt-20 mb-40">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Alice Johnson"
              icon={User}
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@example.com"
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

            {error && (
              <p className="text-red-600 mb-4 text-center font-medium">
                {error}
              </p>
            )}

            {message && (
              <p className="text-green-600 mb-4 text-center font-medium">
                {message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending || isGooglePending}
              className="w-full mt-4"
              icon={UserPlus}
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <div className="relative flex py-5 items-center bg-white rounded-lg mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button
            onClick={handleGoogleSignup}
            disabled={isPending || isGooglePending}
            variant="secondary"
            className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            icon={GoogleIcon}
          >
            {isGooglePending ? "Connecting..." : "Sign Up with Google"}
          </Button>
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
