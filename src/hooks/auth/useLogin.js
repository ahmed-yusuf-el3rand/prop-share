import { useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import { validateLoginForm } from "../../utils/validation";
import { resetLogoutState } from "../../api/client";
import { useNavigation } from "../../hooks/useNavigation";

export const useLogin = () => {
  const [error, setError] = useState("");
  const { goToHome } = useNavigation();
  const { login: loginAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ user }) => {
      resetLogoutState();
      loginAuth({ user });
      goToHome();
    },
    onError: (error) => {
      setError(error?.response?.data?.message || "Invalid email or password.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateLoginForm(
      formData.email,
      formData.password,
    );
    if (validationError) {
      setError(validationError);
      return;
    }
    loginMutation.mutate({
      email: formData.email.trim(),
      password: formData.password.trim(),
    });
  };

  const handleEmailChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  return {
    formData,
    error,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    isLoading: loginMutation.isPending,
  };
};
