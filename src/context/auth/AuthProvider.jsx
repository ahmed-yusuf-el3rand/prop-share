import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigation } from "../../hooks/useNavigation";
import { getCurrentUser, logout as logOut } from "../../services/authService";
import { resetLogoutState } from "../../api/client";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { goToLoginReplace } = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      resetLogoutState();
      goToLoginReplace();
    };

    window.addEventListener("Unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("Unauthorized", handleUnauthorized);
    };
  }, [goToLoginReplace]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logOut();
    } finally {
      setUser(null);
      resetLogoutState();
      goToLoginReplace();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
