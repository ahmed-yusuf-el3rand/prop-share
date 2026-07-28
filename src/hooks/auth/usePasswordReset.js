import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { validateResetPasswordForm } from "../../utils/validation";
import { resetPassword } from "../../services/authService";
import { useSearchParams } from "react-router-dom";

export const usePasswordReset = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [form, setForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      setMessage(
        data?.message ?? "Your password has been changed successfully",
      );
      setForm({
        newPassword: "",
        confirmNewPassword: "",
      });
    },

    onError: (error) => {
      setError(
        error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const validationError = validateResetPasswordForm(
      form.newPassword,
      form.confirmNewPassword,
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }
    resetMutation.mutate({
      token,
      newPassword: form.newPassword.trim(),
    });
  };

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return {
    isLoading: resetMutation.isPending,
    isSuccess: resetMutation.isSuccess,
    handleSubmit,
    handleChange,
    form,
    error,
    message,
  };
};
