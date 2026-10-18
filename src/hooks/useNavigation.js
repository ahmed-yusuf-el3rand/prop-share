import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToPropertyDetails = (id, openPurchase = false) => {
    navigate(
      `/prop-share/properties/${id}`,
      openPurchase ? { state: { isPurchaseModalOpen: true } } : undefined,
    );
  };

  const goToLogin = () => {
    navigate("/prop-share/login");
  };

  const goToLoginReplace = () => {
    navigate("/prop-share/login", { replace: true });
  };

  const goToHome = () => {
    navigate("/prop-share");
  };

  const goToExplore = (location) => {
    navigate(`/prop-share/explore?location=${encodeURIComponent(location.trim())}`);
  };

  const goToProperty = (id, openPurchase = false) => {
    navigate(
      `/prop-share/properties/${id}`,
      openPurchase ? { state: { isPurchaseOpen: true } } : undefined,
    );
  };

  const goToSignup = () => {
    navigate("/prop-share/signup");
  };

  const goToSettingsTab = () => {
    navigate("/prop-share/dashboard", { state: { tab: "settings" } });
  };

  const goToOwnedTab = () => {
    navigate("/prop-share/dashboard", { state: { tab: "owned" } });
  };

  const goToDefaultExplore = () => {
    navigate("/prop-share/explore");
  };

  return {
    goToPropertyDetails,
    goToLogin,
    goToHome,
    goToLoginReplace,
    goToExplore,
    goToProperty,
    goToSignup,
    goToSettingsTab,
    goToOwnedTab,
    goToDefaultExplore,
  };
};
