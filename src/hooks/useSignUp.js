import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const [userType, setUserType] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
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
      setError("Please fill in all required fields.");
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

    if (googleUser) {
      navigate("/login");
    } else {
      setIsSignedUp(true);
    }
  };

  const handleResendVerification = () => {
    setResendMessage("Verification email resent.");
  };

  //the code inside it will replaced with the backend call later
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

        setGoogleUser({
          uid: userInfo.sub,
          email: userInfo.email,
          fullName: userInfo.name,
        });

        setEmail(userInfo.email);
        setFullName(userInfo.name);

        toast.success("Google sign-up successful! Please choose a role.");
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

  return {
    handleSubmit,
    handleResendVerification,
    handleGoogleSignUp,
    userType,
    setUserType,
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    companyName,
    setCompanyName,
    error,
    googleUser,
    isSignedUp,
    resendMessage,
  };
};
