import Button from "../common/Button";
import { Home, Compass, User, LogIn, ChevronDown } from "lucide-react";

const DesktopMenu = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  navigate,
  setDashboardActiveTab,
  setAdminDashboardActiveTab,
  setCurrentPage,
}) => {
  return (
    <>
      <Button variant="ghost" onClick={() => navigate("/")} icon={Home}>
        Home
      </Button>
      <Button
        variant="ghost"
        onClick={() => navigate("/search")}
        icon={Compass}
      >
        Explore
      </Button>
      {isLoggedIn ? (
        <div className="relative group">
          <Button variant="ghost" icon={User}>
            {currentUser?.fullName}
            <ChevronDown
              size={16}
              className="ml-1 group-hover:rotate-180 transition-transform"
            />
          </Button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-50">
            <button
              onClick={() => navigate("/user-dashboard")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                const tab =
                  currentUser?.role === "admin"
                    ? setAdminDashboardActiveTab
                    : setDashboardActiveTab;
                tab("settings");
                setCurrentPage("userDashboard");
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </button>

            {currentUser?.role === "admin" && (
              <>
                <div className="border-t border-gray-100 my-1"></div>
                <span className="block px-4 py-2 text-xs text-gray-500 uppercase font-semibold">
                  Admin Tools
                </span>
                {["submission", "tracking", "financial"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setAdminDashboardActiveTab(tab);
                      setCurrentPage("userDashboard");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {tab === "submission" && "Property Submission"}
                    {tab === "tracking" && "Fraction Tracking"}
                    {tab === "financial" && "Financial Overview"}
                  </button>
                ))}
              </>
            )}
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
        <Button variant="ghost" onClick={() => navigate("/login")} icon={LogIn}>
          Login
        </Button>
      )}
    </>
  );
};

export default DesktopMenu;
