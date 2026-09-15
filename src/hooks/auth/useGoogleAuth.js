import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../services/authService";
import { useAuth } from "../../context/auth/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import { useState } from "react";

export const useGoogleAuth = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { goToHome } = useNavigation();

  const googleMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: ({ user, token }) => {
      login({ user, token });
      goToHome();
    },
    onError: (error) => {
      setError(error.response?.data?.message ?? "Google login failed");
    },
  });

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    prompt: "select_account",
    onSuccess: ({ code }) => {
      setError("");
      googleMutation.mutate(code);
    },
    onError: (error) => {
      setError(error.response?.data?.message ?? "Google login failed");
    },
  });
  
  return {
    error,
    handleGoogleLogin,
    isPending: googleMutation.isPending,
  };
};
