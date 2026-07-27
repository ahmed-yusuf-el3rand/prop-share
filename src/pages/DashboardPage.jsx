import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TabButton from "../components/common/buttons/TabButton.jsx";
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
        return <OwnedTab />;
      case "offered":
        return <OfferedTab />;
      case "money":
        return <MoneyTab />;
      case "settings":
        return <SettingsTab />;
      case "notifications":
        return <NotificationsTab />;
      default:
        return null;
    }
  };
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="hidden sm:block text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200 mb-4 sm:mb-6">
          <TabButton
            active={activeTab === "owned"}
            onClick={() => setActiveTab("owned")}
            icon={Home}
          >
            Owned
          </TabButton>
          <TabButton
            active={activeTab === "offered"}
            onClick={() => setActiveTab("offered")}
            icon={Hourglass}
          >
            Offered
          </TabButton>
          <TabButton
            active={activeTab === "money"}
            onClick={() => setActiveTab("money")}
            icon={DollarSign}
          >
            Money
          </TabButton>
          <TabButton
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={Settings}
          >
            Settings
          </TabButton>
          <TabButton
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
            icon={Bell}
          >
            Notifications
          </TabButton>
        </div>
      </div>
      <div className="overflow-x-auto bg-white my-6">{renderTabContent()}</div>
    </div>
  );
};

export default DashboardPage;
