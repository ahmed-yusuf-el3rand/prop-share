import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../services/authService";
import { useAuth } from "../../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useGoogleAuth = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const googleMutation = useMutation({
    mutationFn: loginWithGoogle,

    onSuccess: ({ user, token }) => {
      login({ user, token });
       navigate("/");
    },

    onError: () => {
      setError("Google login failed");
    },
  });

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    prompt: "select_account",

    onSuccess: ({ code }) => {
      setError("");
      googleMutation.mutate(code);
     
    },

    onError: () => {
      setError("Google login failed");
    },
  });

  return {
    handleGoogleLogin,
    error,
    isLoading: googleMutation.isPending,
  };
};
