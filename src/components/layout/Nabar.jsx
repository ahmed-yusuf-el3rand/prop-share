import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import {
  Home,
  Compass,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  PlusCircle,
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  X,
} from "lucide-react";

const Navbar = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  setDashboardActiveTab,
  setAdminDashboardActiveTab,
  setCurrentPage,
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    if (currentUser?.role === "admin") {
                      setAdminDashboardActiveTab("settings");
                    } else {
                      setDashboardActiveTab("settings");
                    }
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
                    <button
                      onClick={() => {
                        setAdminDashboardActiveTab("submission");
                        setCurrentPage("userDashboard");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Property Submission
                    </button>
                    <button
                      onClick={() => {
                        setAdminDashboardActiveTab("tracking");
                        setCurrentPage("userDashboard");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Fraction Tracking
                    </button>
                    <button
                      onClick={() => {
                        setAdminDashboardActiveTab("financial");
                        setCurrentPage("userDashboard");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Financial Overview
                    </button>
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
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              icon={LogIn}
            >
              Login
            </Button>
          )}
        </div>

        {isMobileMenuOpen ? (
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
        ) : (
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={28} />
          </button>
        )}
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-30 flex flex-col items-center pt-20 px-4">
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
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
              setIsMobileMenuOpen(false);
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
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 text-lg hover:bg-gray-100"
                icon={User}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (currentUser?.role === "admin") {
                    setAdminDashboardActiveTab("settings");
                  } else {
                    setDashboardActiveTab("settings");
                  }
                  setCurrentPage("userDashboard");
                  setIsMobileMenuOpen(false);
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
                      setIsMobileMenuOpen(false);
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
                      setIsMobileMenuOpen(false);
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
                      setIsMobileMenuOpen(false);
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
                  setIsMobileMenuOpen(false);
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
                setCurrentPage("login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center py-3 text-lg hover:bg-gray-100"
              icon={LogIn}
            >
              Login
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
