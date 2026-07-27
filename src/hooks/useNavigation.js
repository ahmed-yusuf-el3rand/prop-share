import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToProperty = (id, openPurchase = false) => {
    navigate(
      `/properties/${id}`,
      openPurchase ? { state: { isPurchaseModalOpen: true } } : undefined,
    );
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return {
    goToProperty,
    goToLogin,
  };
};
