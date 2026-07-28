import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../utils/validation";
import { forgotPassword } from "../../services/authService";

export const usePasswordForgot = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);
  const [form, setForm] = useState({
    email: "",
  });

  const forgotMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setMessage(
        data?.message ??
          "If this email is registered, a reset link has been sent. Please check your inbox.",
      );

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setCooldown(30);
      timerRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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
    setMessage("");
    setError("");
    const validationError = validateEmail(form.email);
    if (validationError) {
      setError(validationError);
      return;
    }
    forgotMutation.mutate({ email: form.email.trim() });
  };

  const handleEmailChange = (e) => {
    setError("");
    setMessage("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    isLoading: forgotMutation.isPending,
    handleSubmit,
    handleEmailChange,
    form,
    error,
    message,
    cooldown,
  };
};
