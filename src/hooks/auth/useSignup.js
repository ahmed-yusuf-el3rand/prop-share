import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import {
  validateFullName,
  validateEmail,
  validatePassword,
} from "../../utils/validation";

export const useSignup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (
      !trimmedFullName ||
      !trimmedEmail ||
      (!googleUser && !trimmedPassword)
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validateFullName(trimmedFullName)) {
      setError("Full name can only contain letters and spaces.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!googleUser && !validatePassword(trimmedPassword)) {
      setError(
        "Password must be at least 8 characters long and contain letters, numbers and special characters.",
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
    setMessage("Verification email resent.");
  };

  //the code inside it will replaced with the backend call later
  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          },
        );

        const userInfo = res.data;

        setGoogleUser({
          uid: userInfo.sub,
          email: userInfo.email,
          fullName: userInfo.name,
        });

        setEmail(userInfo.email);
        setFullName(userInfo.name);

        toast.success("Google sign-up successful!.");
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
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    googleUser,
    isSignedUp,
    message,
  };
};
