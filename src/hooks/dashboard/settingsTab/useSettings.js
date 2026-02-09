import { useState, useEffect, useCallback } from "react";
// import * as userService from "../services/userService";

export const useSettings = (initialUser = null) => {
  const [user, setUser] = useState(initialUser);
  const [personalInfoMessage, setPersonalInfoMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState(null);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const updateProfile = useCallback(async (profile) => {
    try {
      const updated = await userService.updateProfile(profile);
      setUser(updated);
      setPersonalInfoMessage("Information updated successfully");
    } catch (err) {
      setPersonalInfoMessage(err.message || "Failed to update");
      throw err;
    }
  }, []);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    try {
      await userService.changePassword(oldPassword, newPassword);
      setPasswordMessage("Password updated");
    } catch (err) {
      setPasswordMessage(err.message || "Failed to change password");
      throw err;
    }
  }, []);

  const loadPaymentMethods = useCallback(async () => {
    const list = await userService.getPaymentMethods();
    setPaymentMethods(list);
  }, []);

  const addPaymentMethod = async (cardData) => {
    const added = await userService.addPaymentMethod(paymentMethodId);
    setPaymentMethods((prev) => [...prev, added]);
    setPaymentMessage("Payment method added");
  };


  return {
    user,
    paymentMethods,
    personalInfoMessage,
    passwordMessage,
    paymentMessage,
    updateProfile,
    changePassword,
    loadPaymentMethods,
    addPaymentMethod,
    removePaymentMethod,
  };
};
