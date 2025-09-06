import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OwnedTab from "../features/dashboard/OwnedTab.jsx";
import PendingTab from "../features/dashboard/PendingTab.jsx";
import MoneyTab from "../features/dashboard/MoneyTab.jsx";
import RentedTab from "../features/dashboard/RentedTab.jsx";
import SettingsTab from "../features/dashboard/SettingsTab.jsx";
import NotificationsTab from "../features/dashboard/NotificationsTab.jsx";
import TabButton from "../components/common/TabButton.jsx";
import { Home, Hourglass, DollarSign, Settings, Bell } from "lucide-react";

const InvestorDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("owned");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "owned":
        return <OwnedTab />;
      case "pending":
        return <PendingTab />;
      case "money":
        return <MoneyTab />;
      case "rented":
        return <RentedTab />;
      case "settings":
        return <SettingsTab />;
      case "notifications":
        return <NotificationsTab />;
      default:
        return null;
    }
  };
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="hidden sm:block text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200 mb-4 sm:mb-6">
          <TabButton
            active={activeTab === "owned"}
            onClick={() => setActiveTab("owned")}
            icon={Home}
          >
            Owned
          </TabButton>
          <TabButton
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
            icon={Hourglass}
          >
            Pending
          </TabButton>
          <TabButton
            active={activeTab === "rented"}
            onClick={() => setActiveTab("rented")}
            icon={Home}
          >
            Rented
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
        <div className="overflow-x-auto">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
