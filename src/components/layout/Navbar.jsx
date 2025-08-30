import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DesktopMenu from "../navbar/DesktopMenu";
import MobileMenu from "../navbar/MobileMenu";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const handleSettingsClick = () => {
    if (user?.role === "developer") {
      navigate("/developer-dashboard", { state: { tab: "settings" } });
    } else {
      navigate("/client-dashboard", { state: { tab: "settings" } });
    }
  };

  const handleDashboardClick = () => {
    if (user?.role === "developer") {
      navigate("/developer-dashboard", { state: { tab: "owned" } });
    } else {
      navigate("/client-dashboard", { state: { tab: "owned" } });
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
        <div
          className="text-2xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          PropShare
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <DesktopMenu
            isLoggedIn={isLoggedIn}
            currentUser={user}
            handleLogout={handleLogout}
            navigate={navigate}
            handleSettingsClick={handleSettingsClick}
            handleDashboardClick={handleDashboardClick}
          />
        </div>

        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          currentUser={user}
          handleLogout={handleLogout}
          navigate={navigate}
          isOpen={isMenuOpen}
          closeMenu={() => setIsMenuOpen(false)}
          handleSettingsClick={handleSettingsClick}
          handleDashboardClick={handleDashboardClick}
        />
      )}
    </>
  );
};

export default Navbar;
