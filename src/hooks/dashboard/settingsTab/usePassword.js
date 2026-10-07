import { changePassword } from "../../../services/authService";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { validateChangePasswordForm } from "../../../utils/validation";

export const usePassword = () => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const changeMutation = useMutation({
    mutationFn: changePassword,
  });

  const handleChangePassword = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const validationError = validateChangePasswordForm(
      oldPasswordRef,
      newPasswordRef,
      confirmPasswordRef,
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    changeMutation.mutateAsync(passwordInfo);
  };

  return {
    error,
    message,
    oldPasswordRef,
    newPasswordRef,
    confirmPasswordRef,
    handleChangePassword,
    updating: changeMutation.isLoading,
  };
};
