import Button from "../../components/common/buttons/Button";
import { Home, Search, User, LogIn, ChevronDown } from "lucide-react";

const DesktopMenu = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  navigate,
  handleDashboardClick,
  handleSettingsClick,
}) => {
  return (
    <>
      <Button
        variant="third"
        onClick={() => navigate("/")}
        icon={Home}
      >
        Home
      </Button>
      <Button
        variant="third"
        onClick={() => navigate("/explore")}
        icon={Search}
      >
        Explore
      </Button>
      {isLoggedIn ? (
        <div className="relative group">
          <Button variant="ghost" icon={User}>
            {currentUser?.fullName}
            <ChevronDown
              className="ml-1 group-hover:rotate-180 transition-transform"
              size={16}
            />
          </Button>
          <div className="absolute right-0 pt-4 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
            <button
              onClick={handleDashboardClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button
              onClick={handleSettingsClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </button>
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Button
          variant="third"
          onClick={() => navigate("/login")}
          icon={LogIn}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default DesktopMenu;
