import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToPropertyDetails = (id, openPurchase = false) => {
    navigate(
      `/properties/${id}`,
      openPurchase ? { state: { isPurchaseModalOpen: true } } : undefined,
    );
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToLoginReplace = () => {
    navigate("/login", { replace: true });
  }

  const goToHome = () => {
    navigate("/");
  };

  return {
    goToPropertyDetails,
    goToLogin,
    goToHome,
    goToLoginReplace,
  };
};
