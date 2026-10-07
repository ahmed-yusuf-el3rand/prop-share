import Button from "../../common/Button";
import { Home, Compass, User, LogOut, LogIn, Settings } from "lucide-react";
import { useNavigation } from "../../../hooks/useNavigation";

const MobileMenu = ({
  isLoggedIn,
  currentUser,
  handleLogout,
  closeMenu,
  isOpen,
}) => {
  const { goToDefaultExplore, goToHome, goToLogin, goToSettingsTab, goToOwnedTab } = useNavigation();
  
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
          <div className="flex flex-row items-center justify-center mb-6 text-lg font-medium text-cyan-600">
            <div className="mr-2 ">{currentUser && <User size={20} />}</div>
            <span>{currentUser?.fullName}</span>
          </div>
          <Button
            icon={Home}
            variant="ghost"
            className="w-full text-center text-lg"
            onClick={() => {
              goToHome();
              closeMenu();
            }}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full text-center text-lg"
            icon={Compass}
            onClick={() => {
              goToDefaultExplore();
              closeMenu();
            }}
          >
            Explore
          </Button>

          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                icon={User}
                className="w-full text-center text-lg"
                onClick={() => {
                  goToOwnedTab();
                  closeMenu();
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                icon={Settings}
                className="w-full text-center text-lg"
                onClick={() => {
                  goToSettingsTab();
                  closeMenu();
                }}
              >
                Settings
              </Button>

              <div className="w-full border-t border-cyan-100 my-2"></div>
              <Button
                variant="ghost"
                icon={LogOut}
                className="w-full text-center text-lg text-red-600 hover:bg-red-50"
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
              variant="ghost"
              icon={LogIn}
              className="w-full text-center text-lg"
              onClick={() => {
                goToLogin();
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
