import Button from "../components/common/Button";
import { Mail, Lock, LogIn } from "lucide-react";
import InputField from "../components/common/InputField";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    handleGoogleLogin,
  } = useLogin();

  return (
    <div className="px-4 py-6 flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-4xl mt-28 mb-60">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            icon={Mail}
            autoFocus
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            icon={Lock}
          />
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <Button type="submit" className="w-full mt-4" icon={LogIn}>
            Login
          </Button>
          <p className="text-center text-sm mt-3">
            <Link
              to={"/reset-password"}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </p>

          <div className="relative flex py-4 sm:py-5 items-center bg-white rounded-lg mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </form>

        <Button
          onClick={handleGoogleLogin}
          variant="secondary"
          className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 text-sm sm:text-base group"
          icon={() => (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-105 transition-transform duration-200"
            >
              <path
                d="M19.601 10.222c0-.687-.06-1.353-.173-1.996H10.203v3.77h5.457a4.507 4.507 0 01-1.95 2.927v2.44h3.137c1.838-1.69 2.894-4.184 2.894-7.141z"
                fill="#4285F4"
              />
              <path
                d="M10.203 19.8c2.758 0 5.06-1.002 6.74-2.73l-3.137-2.44c-.87.587-1.99.93-3.603.93-2.775 0-5.12-1.86-5.96-4.35H1.05v2.522A9.796 9.796 0 0010.203 19.8z"
                fill="#34A853"
              />
              <path
                d="M4.243 11.97c-.20-.587-.315-1.21-.315-1.876s.115-1.29.315-1.876V5.728H1.05A9.796 9.796 0 00.203 10c0 1.61.388 3.13 1.05 4.502l3.19-2.532z"
                fill="#FBBC04"
              />
              <path
                d="M10.203 3.998c1.503 0 2.85.518 3.91 1.51l2.79-2.79C14.96.68 12.7.002 10.203.002A9.796 9.796 0 00.203 10L4.243 7.468c.84-2.49 3.185-4.35 5.96-4.35z"
                fill="#EA4335"
              />
            </svg>
          )}
        >
          Login with Google
        </Button>
        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
