import { useState, useEffect } from "react";
import { Wallet, Apple, Chrome, CreditCard } from "lucide-react";

export const useSettings = (initialUser) => {
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [fullName, setFullName] = useState(currentUser.fullName || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [userType, setUserType] = useState(currentUser.userType || "Client");
  const [personalInfoMessage, setPersonalInfoMessage] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [paymentMethodType, setPaymentMethodType] = useState("Credit Card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountId, setAccountId] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentMethods, setPaymentMethods] = useState(
    currentUser.paymentMethods || []
  );

  useEffect(() => {
    setFullName(currentUser.fullName || "");
    setEmail(currentUser.email || "");
    setUserType(currentUser.userType || "Client");
    setPaymentMethods(currentUser.paymentMethods || []);
  }, [currentUser]);

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    setPersonalInfoMessage("");
    setPersonalInfoMessage("Information updated successfully!");
    setTimeout(() => setPersonalInfoMessage(""), 3000);
  };

  const onAddPaymentMethod = (newMethod) => {
    console.log("Payment method added (simulated):", newMethod);
    setCurrentUser((prev) => ({
      ...prev,
      paymentMethods: [...(prev.paymentMethods || []), newMethod],
    }));
  };

  const onRemovePaymentMethod = (idToRemove) => {
    console.log("Payment method removed (simulated):", idToRemove);
    setCurrentUser((prev) => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).filter(
        (method) => method.id !== idToRemove
      ),
    }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMessage("");
    if (
      oldPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmNewPassword.trim() === ""
    ) {
      setPasswordMessage("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }
    if (oldPassword === currentUser.password) {
      onUpdateUser({ ...currentUser, password: newPassword });
      setPasswordMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setPasswordMessage("Old password is incorrect.");
    }
    setTimeout(() => setPasswordMessage(""), 3000);
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    setPaymentMessage("");
    let newMethod = { id: Date.now(), type: paymentMethodType };

    if (paymentMethodType === "Credit Card") {
      if (!cardName || !cardNumber || !expiryDate || !cvv) {
        setPaymentMessage("Please fill all credit card details.");
        return;
      }
      newMethod = {
        ...newMethod,
        cardName: cardName.trim(),
        cardNumber: cardNumber.trim(),
        expiryDate: expiryDate.trim(),
        cvv: cvv.trim(),
      };
    } else {
      if (!accountName || !accountId) {
        setPaymentMessage("Please fill all account details.");
        return;
      }
      newMethod = {
        ...newMethod,
        accountName: accountName.trim(),
        accountId: accountId.trim(),
      };
    }

    onAddPaymentMethod(newMethod);
    setCardName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setAccountName("");
    setAccountId("");
    setPaymentMessage("Payment method added successfully!");
    setTimeout(() => setPaymentMessage(""), 3000);
  };

  const handleRemovePaymentMethod = (id) => {
    onRemovePaymentMethod(id);
    setPaymentMessage("Payment method removed.");
    setTimeout(() => setPaymentMessage(""), 3000);
  };

  const getPaymentMethodIcon = (type) => {
    switch (type) {
      case "Credit Card":
        return CreditCard;
      case "Wallet":
        return Wallet;
      case "Apple Pay":
        return Apple;
      case "Google Pay":
        return Chrome;
      default:
        return CreditCard;
    }
  };

  const getPaymentMethodDisplay = (method) => {
    switch (method.type) {
      case "Credit Card":
        return `${method.cardName} (****${method.cardNumber.slice(-4)}) Exp: ${
          method.expiryDate
        }`;
      case "Wallet":
        return `Wallet: ${method.accountName} (${method.accountId})`;
      case "Apple Pay":
        return `Apple Pay: ${method.accountName} (${method.accountId})`;
      case "Google Pay":
        return `Google Pay: ${method.accountName} (${method.accountId})`;
      default:
        return "Unknown Payment Method";
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    userType,
    setUserType,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    personalInfoMessage,
    passwordMessage,
    paymentMethodType,
    setPaymentMethodType,
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    accountName,
    setAccountName,
    accountId,
    setAccountId,
    paymentMethods,
    paymentMessage,
    handlePersonalInfoSubmit,
    handleChangePassword,
    handleAddPaymentMethod,
    handleRemovePaymentMethod,
    getPaymentMethodIcon,
    getPaymentMethodDisplay,
  };
};
