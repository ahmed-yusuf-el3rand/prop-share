import Button from "../components/common/Button";
import { Mail, Lock, LogIn } from "lucide-react";
import InputField from "../components/common/InputField";
import { useLogin } from "../hooks/auth/useLogin";
import { Link } from "react-router-dom";
import { useGoogleAuth } from "../hooks/auth/useGoogleAuth";
import GoogleIcon from "../components/common/GoogleIcon";

const LoginPage = () => {
  const { formData, error, isPending, handleSubmit, handleChange } = useLogin();

  const {
    error: googleError,
    isPending: isGooglePending,
    handleGoogleLogin,
  } = useGoogleAuth();

  return (
    <div className="flex justify-center items-center px-4 py-6">
      <div className="bg-white p-4 sm:p-8 w-full max-w-4xl mt-20 mb-40">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            icon={Mail}
            autoFocus
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            icon={Lock}
          />
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <Button
            type="submit"
            disabled={isPending || isGooglePending}
            className="w-full mt-4"
            icon={LogIn}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-center text-sm mt-3">
            <Link
              to={"/forgot-password"}
              className="text-cyan-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </form>

        <div className="relative flex py-4 sm:py-5 items-center bg-white rounded-lg mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          disabled={isGooglePending}
          variant="secondary"
          className="w-full "
          icon={GoogleIcon}
        >
          {isGooglePending ? "Logging in with Google..." : "Login with Google"}
        </Button>
        {googleError && (
          <p className="text-red-600 text-center mt-4">{googleError}</p>
        )}
        <p className="text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-cyan-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
