import Button from "../../components/common/Button";
import { Home, Compass, User, LogOut, LogIn, Settings } from "lucide-react";

const MobileMenu = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  navigate,
  handleSettingsClick,
  handleDashboardClick,
  closeMenu,
  isOpen,
}) => {
  return (
    <div
      className={`fixed inset-0 z-30 transition-opacity duration-300 ${
        isOpen ? "bg-black/45 opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeMenu}
    >
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col pt-20 px-4">
          <div className="flex flex-row items-center justify-center mb-6 text-lg font-medium text-blue-700">
            <div className="mr-2 ">{currentUser && <User size={20} />}</div>
            <span>{currentUser?.fullName}</span>
          </div>
          <Button
            icon={Home}
            variant="ghost2"
            className="w-full text-center py-3 text-lg hover:bg-gray-100 block items-start"
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
          >
            Home
          </Button>
          <Button
            variant="ghost2"
            className="w-full text-center py-3 text-lg hover:bg-gray-100"
            icon={Compass}
            onClick={() => {
              navigate("/explore");
              closeMenu();
            }}
          >
            Explore
          </Button>

          {isLoggedIn ? (
            <>
              <Button
                variant="ghost2"
                icon={User}
                className="w-full text-center py-3 text-lg hover:bg-gray-100"
                onClick={() => {
                  handleDashboardClick();
                  closeMenu();
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost2"
                icon={Settings}
                className="w-full text-center py-3 text-lg hover:bg-gray-100"
                onClick={() => {
                  handleSettingsClick();
                  closeMenu();
                }}
              >
                Settings
              </Button>

              <div className="w-full border-t border-gray-100 my-2"></div>
              <Button
                variant="ghost2"
                icon={LogOut}
                className="w-full text-center py-3 text-lg text-red-600 hover:bg-red-50"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost2"
              icon={LogIn}
              className="w-full text-center py-3 text-lg hover:bg-gray-100"
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
