import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DesktopMenu from "../navbar/DesktopMenu";
import MobileMenu from "../navbar/MobileMenu";

const Navbar = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  setDashboardActiveTab,
  setAdminDashboardActiveTab,
  setCurrentPage,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
            currentUser={currentUser}
            handleLogout={handleLogout}
            navigate={navigate}
            setDashboardActiveTab={setDashboardActiveTab}
            setAdminDashboardActiveTab={setAdminDashboardActiveTab}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleLogout={handleLogout}
          setDashboardActiveTab={setDashboardActiveTab}
          setAdminDashboardActiveTab={setAdminDashboardActiveTab}
          setCurrentPage={setCurrentPage}
          navigate={navigate}
          closeMenu={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
