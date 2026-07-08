import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { validateSignupForm } from "../../utils/validation";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../services/authService";

export const useSignup = () => {
  const [error, setError] = useState("");
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
      setError(error?.response?.data?.message || "Failed to create account");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return {
    form,
    error,
    handleChange,
    handleSubmit,
    isPending: signupMutation.isPending,
    isSuccess: signupMutation.isSuccess,
    signupResponse: signupMutation.data,
  };
};
