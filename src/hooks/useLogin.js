import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { validateEmail, validatePassword } from "../utils/validation";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    const isValidEmail = validateEmail(trimmedEmail);
    const isValidPassword = validatePassword(trimmedPassword);

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword) {
      setError(
        "Password must be at least 8 characters long and contain letters, numbers and special characters."
      );
      return;
    }

    let userData = null;

    if (trimmedEmail === "user@example.com" && trimmedPassword === "password") {
      userData = {
        uid: "user123",
        email: trimmedEmail,
        fullName: "Client",
        userType: "Client",
      };
    } else if (
      trimmedEmail === "developer@example.com" &&
      trimmedPassword === "password"
    ) {
      userData = {
        uid: "developer456",
        email: trimmedEmail,
        fullName: "Developer",
        userType: "developer",
        taxesNumber: "12-3456789",
      };
    } else {
      setError("Invalid email or password.");
      return;
    }

    login(userData);
    navigate("/");
  };

  // this code will replace with backend google oauth

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = res.data;
        console.log("Google User Info:", userInfo);

        const googleUserData = {
          uid: userInfo.sub,
          email: userInfo.email,
          fullName: userInfo.name,
          userType: "Client",
        };

        login(googleUserData);
        navigate("/");
        toast.success("Logged in with Google successfully!");
      } catch (err) {
        console.error("Google login failed:", err);
        setError("Google login failed");
      }
    },
    onError: () => {
      console.error("Google login failed");
      setError("Google login failed");
    },
    flow: "implicit",
    prompt: "select_account",
  });

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
    handleGoogleLogin,
  };
};
