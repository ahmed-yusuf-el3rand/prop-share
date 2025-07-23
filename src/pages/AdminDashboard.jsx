import TabButton from "../components/common/TabButton";
import { Settings, BarChart2, PlusCircle, DollarSign } from "lucide-react";
import { useState } from "react";
// import ProjectSubmissionPage from "../components/adminDashboard/ProjectSubmissionPage";
// import FractionTrackingPage from "../components/adminDashboard/FractionalTrackingPage";


const AdminDashboardPage = ({
  adminProjects,
  withdrawableBalance,
  onUpdateUser,
  onAddPaymentMethod,
  onRemovePaymentMethod,
  currentUser,
  onRemoveProperty,
  onEditProperty,
  onShowPaymentSettings,
}) => {
  const [activeTab, setActiveTab] = useState("submission");
  const renderAdminTabContent = () => {
    switch (activeTab) {
      case "submission":
        return <ProjectSubmissionPage />;
      case "tracking":
        return (
          <FractionTrackingPage
            projects={adminProjects}
            onRemoveProperty={onRemoveProperty}
            onEditProperty={onEditProperty}
          />
        );
      case "financial":
        return (
          <FinancialOverviewPage
            projects={adminProjects}
            withdrawableBalance={withdrawableBalance}
            currentUser={currentUser}
            onShowPaymentSettings={onShowPaymentSettings}
          />
        );
      case "settings":
        return (
          <UserSettings
            currentUser={currentUser}
            onUpdateUser={onUpdateUser}
            onAddPaymentMethod={onAddPaymentMethod}
            onRemovePaymentMethod={onRemovePaymentMethod}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <TabButton
            active={activeTab === "submission"}
            onClick={() => setActiveTab("submission")}
            icon={PlusCircle}
          >
            Property Submission
          </TabButton>
          <TabButton
            active={activeTab === "tracking"}
            onClick={() => setActiveTab("tracking")}
            icon={BarChart2}
          >
            Fraction Tracking
          </TabButton>
          <TabButton
            active={activeTab === "financial"}
            onClick={() => setActiveTab("financial")}
            icon={DollarSign}
          >
            Financial Overview
          </TabButton>
          <TabButton
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={Settings}
          >
            Settings
          </TabButton>
        </div>
        {renderAdminTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
