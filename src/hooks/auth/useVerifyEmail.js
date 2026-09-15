import { useMutation } from "@tanstack/react-query";
import {
  verifyEmail,
  resendVerificationEmail,
} from "../../services/authService";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";

export const useVerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const token = searchParams.get("token");
  const { goToLogin } = useNavigation();

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      setError("");
      setMessage(
        data?.message || "Your account has been activated successfully.",
      );
    },
    onError: (error) => {
      setEmail(error?.response?.data?.email);
    },
  });
  useEffect(() => {
    if (token) {
      verifyMutation.mutate(token);
    }
  }, [token]);

  const resendMutation = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: (data) => {
      setError("");
      setMessage(
        data?.message ||
          "Verification email resent successfully, please check your inbox.",
      );
    },
    onError: (error) => {
      setError(
        error?.response?.data?.message ||
          "Failed to resend verification email, please try again.",
      );
    },
  });

  const handleResendVerification = () => {
    if (!email) {
      setError(
        "Unable to resend verification email. Email address is missing.",
      );
      return;
    }
    setError("");
    resendMutation.mutate(email);
  };

  const handleGoToLogin = () => {
    goToLogin();
  };

  return {
    isPending: verifyMutation.isPending,
    isSuccess: verifyMutation.isSuccess,
    error,
    message,
    handleGoToLogin,
    handleResendVerification,
    isResending: resendMutation.isPending,
  };
};
