import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import OwnedTab from "../features/dashboardPage/OwnedTab.jsx";
import MoneyTab from "../features/dashboardPage/MoneyTab.jsx";
import OfferedTab from "../features/dashboardPage/OfferedTab.jsx";
import SettingsTab from "../features/dashboardPage/SettingsTab.jsx";
import { Home, Hourglass, DollarSign, Settings, Bell } from "lucide-react";
import NotificationsTab from "../features/dashboardPage/NotificationsTab.jsx";

const DashboardPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("settings");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "owned":
        return <OwnedTab activeTab="owned" />;
      case "offered":
        return <OfferedTab activeTab="offered"/>;
      case "money":
        return <MoneyTab activeTab="money"/>;
      case "settings":
        return <SettingsTab activeTab="settings"/>;
      case "notifications":
        return <NotificationsTab activeTab="notifications"/>;
      default:
        return null;
    }
  };
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-40">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200 mb-4 sm:mb-6">
          <Button
            icon={Home}
            variant="tabButton"
            active={activeTab === "owned"}
            onClick={() => setActiveTab("owned")}
          >
            Owned
          </Button>
          <Button
            icon={Hourglass}
            variant="tabButton"
            active={activeTab === "offered"}
            onClick={() => setActiveTab("offered")}
          >
            Offered
          </Button>
          <Button
            icon={DollarSign}
            variant="tabButton"
            active={activeTab === "money"}
            onClick={() => setActiveTab("money")}
          >
            Money
          </Button>
          <Button
            icon={Settings}
            variant="tabButton"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </Button>
          <Button
            icon={Bell}
            variant="tabButton"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white my-6">{renderTabContent()}</div>
    </div>
  );
};

export default DashboardPage;
