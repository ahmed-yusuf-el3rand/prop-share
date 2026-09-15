import { useState } from "react";
import { validateSignupForm } from "../../utils/validation";
import { useMutation } from "@tanstack/react-query";
import {
  signupUser,
  resendVerificationEmail,
} from "../../services/authService";

export const useSignup = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      setError("");
    },
    onError: (error) => {
      setError(error?.response?.data?.message ?? "Failed to create account");
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: (data) => {
      setMessage(data.message ?? "Verification email resent successfully");
    },
    onError: (error) => {
      setError(
        error?.response?.data?.message ?? "Failed to resend verification email",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateSignupForm(
      form.fullName,
      form.email,
      form.password,
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    signupMutation.mutate({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResendVerification = () => {
    setError("");
    if (!signupMutation.data.email) {
      return;
    }
    resendMutation.mutate(signupMutation.data.email);
  };

  return {
    form,
    error,
    message,
    handleChange,
    handleSubmit,
    handleResendVerification,
    isPending: signupMutation.isPending,
    isSuccess: signupMutation.isSuccess,
    isResending: resendMutation.isPending,
  };
};
