import { useState } from "react";
import { useNavigate} from "react-router-dom";
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

