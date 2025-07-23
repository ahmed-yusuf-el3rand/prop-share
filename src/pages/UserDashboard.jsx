import { useState } from "react";
import OwnedTab from "../components/userDashboard/OwnedTab.jsx";
import PendingTab from "../components/userDashboard/PendingTab.jsx";
import RentedTab from "../components/userDashboard/RentedTab.jsx";
import MoneyTab from "../components/userDashboard/MoneyTab.jsx";
import SettingsTab from "../components/userDashboard/SettingsTab.jsx";
import NotificationsTab from "../components/userDashboard/NotificationsTab.jsx";
import TabButton from "../components/common/TabButton.jsx";
import { Home, Hourglass, DollarSign, Settings, Bell } from "lucide-react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("settings");

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
        Your Dashboard
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

export default UserDashboard;
