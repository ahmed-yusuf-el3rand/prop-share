import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { signupWithGoogle } from "../../services/authService";
import { useState } from "react";

export const useGoogleSignup = () => {
  const [error, setError] = useState("");

  const googleMutation = useMutation({
    mutationFn: signupWithGoogle,
    onSuccess: () => {
      setError("");
    },
    onError: (error) => {
      setError(error?.response?.data?.message ?? "Google sign up failed");
    },
  });

  const handleGoogleSignup = useGoogleLogin({
    flow: "auth-code",
    prompt: "select_account",
    onSuccess: ({ code }) => {
      setError("");
      googleMutation.mutate(code);
    },
    onError: (error) => {
      setError(error?.response?.data?.message ?? "Google sign up failed");
    },
  });

  return {
    handleGoogleSignup,
    error,
    isPending: googleMutation.isPending,
    isSuccess: googleMutation.isSuccess,
  };
};
