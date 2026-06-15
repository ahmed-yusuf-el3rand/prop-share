import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/useAuth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/authService";
import { validateLoginForm } from "../../utils/validation";

export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: ({ user, token }) => {
      login({ user, token });
         navigate("/");
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
