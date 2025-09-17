  const onRemoveBankCard = (idToRemove) => {
    console.log("Payment method removed (simulated):", idToRemove);
    setCurrentUser((prev) => ({
      ...prev,
      paymentMethods: (prev.paymentMethods || []).filter(
        (method) => method.id !== idToRemove
      ),
    }));
  };