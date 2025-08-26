import Button from "../common/Button";
import {
  Home,
  Compass,
  User,
  LogOut,
  LogIn,
  Settings,
  PlusCircle,
  BarChart2,
  DollarSign,
} from "lucide-react";

const MobileMenu = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  setDashboardActiveTab,
  setAdminDashboardActiveTab,
  setCurrentPage,
  navigate,
  closeMenu,
}) => {
  return (
    <div className="md:hidden fixed inset-0 bg-white z-30 flex flex-col items-center pt-20 px-4">
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/");
          closeMenu();
        }}
        className="w-full text-center py-3 text-lg hover:bg-gray-100"
        icon={Home}
      >
        Home
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          navigate("/search");
          closeMenu();
        }}
        className="w-full text-center py-3 text-lg hover:bg-gray-100"
        icon={Compass}
      >
        Explore
      </Button>
      {isLoggedIn ? (
        <>
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentPage("userDashboard");
              closeMenu();
            }}
            className="w-full text-center py-3 text-lg hover:bg-gray-100"
            icon={User}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const tab =
                currentUser?.role === "admin"
                  ? setAdminDashboardActiveTab
                  : setDashboardActiveTab;
              tab("settings");
              setCurrentPage("userDashboard");
              closeMenu();
            }}
            className="w-full text-center py-3 text-lg hover:bg-gray-100"
            icon={Settings}
          >
            Settings
          </Button>

          {currentUser?.role === "admin" && (
            <>
              <div className="w-full border-t border-gray-100 my-2"></div>
              <span className="text-xs text-gray-500 uppercase font-semibold mb-2">
                Admin Tools
              </span>
              <Button
                variant="ghost"
                onClick={() => {
                  setAdminDashboardActiveTab("submission");
                  setCurrentPage("userDashboard");
                  closeMenu();
                }}
                className="w-full text-center py-3 text-lg hover:bg-gray-100"
                icon={PlusCircle}
              >
                Property Submission
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setAdminDashboardActiveTab("tracking");
                  setCurrentPage("userDashboard");
                  closeMenu();
                }}
                className="w-full text-center py-3 text-lg hover:bg-gray-100"
                icon={BarChart2}
              >
                Fraction Tracking
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setAdminDashboardActiveTab("financial");
                  setCurrentPage("userDashboard");
                  closeMenu();
                }}
                className="w-full text-center py-3 text-lg hover:bg-gray-100"
                icon={DollarSign}
              >
                Financial Overview
              </Button>
            </>
          )}
          <div className="w-full border-t border-gray-100 my-2"></div>
          <Button
            variant="ghost"
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className="w-full text-center py-3 text-lg text-red-600 hover:bg-red-50"
            icon={LogOut}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          onClick={() => {
            navigate("/login");
            closeMenu();
          }}
          className="w-full text-center py-3 text-lg hover:bg-gray-100"
          icon={LogIn}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default MobileMenu;
