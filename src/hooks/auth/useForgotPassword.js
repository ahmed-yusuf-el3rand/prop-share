import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { validateEmailForm } from "../../utils/validation";
import { forgotPassword } from "../../services/authService";

export const useForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);
  const [formData, setFormData] = useState({
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
        error?.message ??
          "Something went wrong. Please try again.",
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const validationError = validateEmailForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    forgotMutation.mutate({ email: formData.email.trim() });
  };

  const handleEmailChange = (e) => {
    setMessage("");
    setError("");
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    handleSubmit,
    handleEmailChange,
    formData,
    error,
    message,
    cooldown,
    isPending: forgotMutation.isPending,
  };
};
