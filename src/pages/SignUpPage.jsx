import { useState } from "react";
import SelectField from '../components/common/SelectField';
import InputField from "../components/common/InputField";
import {User,Lock,Briefcase,Mail,UserPlus,Percent} from "lucide-react"
import Button from "../components/common/Button";
const SignUpPage = ({ onSignUp, onNavigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("Client"); // 'Client' or 'Developer'
  const [companyName, setCompanyName] = useState("");
  const [taxesNumber, setTaxesNumber] = useState(""); // New state for taxes number
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedFullName = fullName.trim();
    const trimmedCompanyName = companyName.trim();
    const trimmedTaxesNumber = taxesNumber.trim();

    if (
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword ||
      !trimmedFullName
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (userType === "Developer" && !trimmedCompanyName) {
      setError("Please enter your company name.");
      return;
    }
    if (userType === "Developer" && !trimmedTaxesNumber) {
      setError("Please enter your taxes number.");
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Dummy signup logic
    const userData = {
      email: trimmedEmail,
      password: trimmedPassword, // In a real app, never send plain password
      fullName: trimmedFullName,
      userType: userType,
      companyName: userType === "Developer" ? trimmedCompanyName : undefined,
      taxesNumber: userType === "Developer" ? trimmedTaxesNumber : undefined, // Save taxes number
      bankingAccounts: [], // New users start with no banking accounts
    };
    console.log("Signing up with:", userData);
    alert("Sign up successful! Please log in."); // Using alert for simplicity, would be a custom modal in production
    onSignUp(userData); // Pass all user data to onSignUp
  };

  const handleGoogleSignUp = () => {
    console.log("Sign Up with Google clicked!");
    alert(
      "Simulating Google sign up. Please use the form above for full functionality."
    );
    // In a real app, this would initiate Firebase/OAuth Google signup flow
  };

  return (
    <div className="container mx-auto p-6 flex justify-center items-center min-h-[70vh]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <SelectField
            label="Sign up as:"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            options={[
              { value: "Client", label: "Client" },
              { value: "Developer", label: "Developer" },
            ]}
            icon={User}
          />
          <InputField
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            icon={User}
            required
          />
          {userType === "Developer" && (
            <>
              <InputField
                label="Company Name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Real Estate Corp."
                icon={Briefcase}
                required
              />
              <InputField
                label="Taxes Number"
                type="text"
                value={taxesNumber}
                onChange={(e) => setTaxesNumber(e.target.value)}
                placeholder="e.g., 12-3456789"
                icon={Percent}
                required
              />
            </>
          )}
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            icon={Mail}
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            icon={Lock}
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            icon={Lock}
            required
          />
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          <Button type="submit" className="w-full mt-4" icon={UserPlus}>
            Sign Up
          </Button>
          <div className="relative flex py-5 items-center bg-white rounded-lg mt-4">
            {" "}
            {/* Added bg-white and rounded-lg */}
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <Button
            onClick={handleGoogleSignUp}
            variant="secondary"
            className="w-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-300" // Adjusted styling
            icon={() => (
              // Inline SVG for Google icon
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
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="#"
            onClick={onNavigateToLogin}
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;