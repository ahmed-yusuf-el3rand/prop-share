import SelectField from "../components/common/SelectField";
import InputField from "../components/common/InputField";
import { User, Lock, Briefcase, Mail, UserPlus } from "lucide-react";
import Button from "../components/common/Button";
import { useSignup } from "../hooks/useSignup";
import { useGoogleSignup } from "../hooks/auth/useGoogleSignup";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { form, error, isSuccess, isPending, handleChange, handleSubmit } =
    useSignup();

  const { handleGoogleSignup, isPending: isGooglePending } = useGoogleSignup();

  return (
    <div className="p-6 flex justify-center items-center">
      {isSuccess ? (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mt-40 mb-80 text-center flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold mb-4 ">
            {" "}
            We’ve sent a verification email
          </h2>
          <p className="text-gray-700 mb-4 font-medium">
            Please check your inbox.
          </p>
          <Button
            onClick={handleResendVerification}
            icon={Mail}
            className="mb-4"
          >
            Resend Verification Email
          </Button>
          <Link to="/login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
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

            {!googleUser && (
              <InputField
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                icon={Lock}
              />
            )}

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full mt-4" icon={UserPlus}>
              {isPending ? "Creating Account" : "Sign Up"}
            </Button>
          </form>

          {!googleUser && (
            <>
              <div className="relative flex py-5 items-center bg-white rounded-lg mt-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Button
                onClick={handleGoogleSignup}
                disabled={isGooglePending}
                variant="secondary"
                className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                icon={() => (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                {isGooglePending ? "Connecting..." : "Sign Up with Google"}
              </Button>
            </>
          )}
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
