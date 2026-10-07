import { useState } from "react";
import { Menu, X } from "lucide-react";
import DesktopMenu from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import { useAuth } from "../../context/auth/useAuth";
import { useNavigation } from "../../hooks/useNavigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const { goToHome } = useNavigation();

  const handleLogout = () => {
    goToHome();
    logout();
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
        <div className="text-2xl font-bold cursor-pointer" onClick={goToHome}>
          <span className=" text-cyan-700">Prop</span>
          <span className="text-yellow-400">Share</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <DesktopMenu
            isLoggedIn={isLoggedIn}
            currentUser={user}
            handleLogout={handleLogout}
          />
        </div>
        <button
          className="md:hidden text-cyan-700 hover:text-cyan-600"
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
          isOpen={isMenuOpen}
          closeMenu={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
