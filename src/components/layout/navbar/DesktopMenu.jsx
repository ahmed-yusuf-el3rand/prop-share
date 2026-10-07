import Button from "../../common/Button";
import { Home, Search, User, LogIn, ChevronDown } from "lucide-react";
import { useNavigation } from "../../../hooks/useNavigation";

const DesktopMenu = ({ isLoggedIn, currentUser, handleLogout }) => {
  const { goToDefaultExplore, goToHome, goToLogin, goToOwnedTab, goToSettingsTab } =
    useNavigation();
  return (
    <>
      <Button variant="third" onClick={goToHome} icon={Home}>
        Home
      </Button>
      <Button variant="third" onClick={goToDefaultExplore} icon={Search}>
        Explore
      </Button>
      {isLoggedIn ? (
        <div className="relative group">
          <Button variant="third" icon={User}>
            {currentUser?.fullName}
            <ChevronDown
              className="ml-1 group-hover:rotate-180 transition-transform"
              size={16}
            />
          </Button>
          <div className="absolute right-0 pt-4 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
            <button
              onClick={goToOwnedTab}
              className="w-full text-left px-4 py-2 text-sm text-cyan-700 hover:bg-yellow-300"
            >
              Dashboard
            </button>
            <button
              onClick={goToSettingsTab}
              className="w-full text-left px-4 py-2 text-sm text-cyan-700 hover:bg-yellow-300"
            >
              Settings
            </button>
            <div className="border-t border-cyan-100 my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Button variant="third" onClick={goToLogin} icon={LogIn}>
          Login
        </Button>
      )}
    </>
  );
};

export default DesktopMenu;
