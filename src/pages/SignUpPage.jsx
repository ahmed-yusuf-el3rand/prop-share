import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SelectField from "../components/common/SelectField";
import InputField from "../components/common/InputField";
import { User, Lock, Briefcase, Mail, UserPlus } from "lucide-react";
import Button from "../components/common/Button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", fullName: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedFullName = fullName.trim();
    const trimmedCompanyName = companyName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const FULL_NAME_PATTERN = /^[a-zA-Z\s]+$/;
    const COMPANY_NAME_PATTERN = /^[\w\s&.\-]+$/;
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!userType) {
      setError("Please choose a role.");
      return;
    }

    if (
      (userType === "Investor" && !trimmedFullName) ||
      (userType === "Developer" && !trimmedCompanyName) ||
      !trimmedEmail ||
      (!googleUser && !trimmedPassword)
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (userType === "Investor" && !FULL_NAME_PATTERN.test(trimmedFullName)) {
      setError("Full name can only contain letters and spaces.");
      return;
    }

    if (
      userType === "Developer" &&
      !COMPANY_NAME_PATTERN.test(trimmedCompanyName)
    ) {
      setError("Company name can only contain letters and spaces.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!googleUser && !PASSWORD_PATTERN.test(trimmedPassword)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, and a number."
      );
      return;
    }

    // const userData = {
    //   uid: googleUser?.uid || undefined,
    //   userType,
    //   fullName: trimmedFullName,
    //   companyName: userType === "Developer" ? trimmedCompanyName : undefined,
    //   email: trimmedEmail,
    //   password: googleUser ? undefined : trimmedPassword,
    // };

    if (googleUser) {
      navigate("/login");
    } else {
      setIsSignedUp(true);
    }
  };

  const handleResendVerification = () => {
    // Simulate resend email logic
    setResendMessage("Verification email resent.");
    toast.success("Verification email resent!");
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        const userInfo = res.data;
        console.log("Google User Info:", userInfo);

        setGoogleUser({
          uid: userInfo.sub,
          email: userInfo.email,
          fullName: userInfo.name,
        });

        setEmail(userInfo.email);
        setFullName(userInfo.name);

        toast.success("Google sign-up successful! Please choose a role.");
        setGoogleUser(true);
      } catch (err) {
        console.error("Google sign up failed:", err);
        setError("Google sign up failed");
      }
    },
    onError: () => {
      console.error("Google sign up failed");
      setError("Google sign up failed");
    },
    flow: "implicit",
    prompt: "select_account",
  });

  return (
    <div className="p-6 flex justify-center items-center">
      {isSignedUp ? (
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mt-40 mb-80 text-center flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold mb-4 ">
            {" "}
            We’ve sent a verification email
          </h2>
          <p
            className={`${
              resendMessage ? "text-green-700" : "text-gray-700"
            } mb-4 font-medium`}
          >
            {resendMessage && resendMessage} Please check your inbox.
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
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mt-20 mb-40">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <SelectField
              label="Sign up as:"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              options={[
                { value: "", label: "Select a role...", disabled: true },
                { value: "Investor", label: "Investor" },
                { value: "Developer", label: "Developer" },
              ]}
              icon={User}
            />
            {userType === "Developer" ? (
              <InputField
                label="Company Name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Real Estate Corp."
                icon={Briefcase}
              />
            ) : (
              <InputField
                label="Full Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alice Johnson"
                icon={User}
              />
            )}

            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@example.com"
              icon={Mail}
              disabled={!!googleUser}
            />

            {!googleUser && (
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                icon={Lock}
              />
            )}

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            {googleUser && !userType && (
              <p className="text-red-600 text-sm mb-4 text-center">
                Please select a role to continue.
              </p>
            )}

            <Button
              type="submit"
              className="w-full mt-4"
              icon={UserPlus}
              disabled={googleUser && !userType}
            >
              {googleUser ? "Continue" : "Sign Up"}
            </Button>

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
                  onClick={handleGoogleSignUp}
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
                  Sign Up with Google
                </Button>
              </>
            )}
          </form>

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
