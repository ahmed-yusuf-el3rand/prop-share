import {
  ownedProperties,
  pendingProperties,
  rentProfits,
  sellingProfits,
  propertySellingProfits,
} from "../propertiesData.js";

const UserDashboard = ({
  currentUser,
  onUpdateUser,
  onAddPaymentMethod,
  onRemovePaymentMethod,
  onOwnedPropertyClick,
  onPendingPropertyClick,
  activeTab,
  setActiveTab,
  onCancelRentOffer,
}) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "owned":
        return (
          <div className="space-y-4">
            {ownedProperties.length > 0 ? (
              ownedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => onOwnedPropertyClick(prop.id)} // Make the div clickable
                >
                  <img
                    src={prop.image}
                    alt={prop.name}
                    className="w-16 h-16 object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/64x64/e0e0e0/000000?text=Prop`;
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{prop.name}</h3>
                    {/* Removed location from here */}
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-sm text-gray-600">
                        {prop.percentageHeld}% Held
                      </span>
                      <span className="text-blue-600 font-bold text-lg">
                        {formatCurrency(prop.value)}
                      </span>
                    </div>
                    <ProgressBar
                      progress={prop.percentageHeld}
                      className="mt-2"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">You don't own any properties yet.</p>
            )}
          </div>
        );
      case "pending":
        return (
          <div className="space-y-4">
            {pendingProperties.length > 0 ? (
              pendingProperties.map((prop) => {
                const progress =
                  (prop.currentOwnedPercentage / prop.targetPercentage) * 100;
                return (
                  <div
                    key={prop.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => onPendingPropertyClick(prop.id)} // Clickable to details page
                  >
                    <img
                      src={prop.propertyImage}
                      alt={prop.propertyName}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/64x64/e0e0e0/000000?text=Pending`;
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {prop.propertyName}
                      </h3>
                      {/* Moved percentage with target above progress bar */}
                      <p className="text-sm text-gray-600 mb-1">
                        {progress.toFixed(0)}% Owned (Target:{" "}
                        {prop.targetPercentage}%)
                      </p>
                      <ProgressBar progress={progress} className="mt-2" />
                    </div>
                    <span className="text-blue-600 font-bold">
                      {formatCurrency(prop.price)}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">
                No properties are pending full possession.
              </p>
            )}
          </div>
        );
      case "profits":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">Total Rent Profits:</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(rentProfits.total)}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">Total Selling Profits:</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(sellingProfits.total)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">Last Rent Payout:</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(rentProfits.lastPayout)}
                </p>
                <p className="text-xs text-blue-700">
                  on {rentProfits.lastPayoutDate}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">Last Sell Payout:</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(sellingProfits.lastPayout)}
                </p>
                <p className="text-xs text-green-700">
                  on {sellingProfits.lastPayoutDate}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <DollarSign size={20} /> Profit Per Property (Rent)
              </h3>
              {rentProfits.propertyProfits.length > 0 ? (
                <ul className="space-y-2">
                  {rentProfits.propertyProfits.map((propProfit, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <span className="font-medium text-gray-700">
                        {propProfit.name}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        {formatCurrency(propProfit.profit)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm">
                  No property-specific rent profits to display.
                </p>
              )}
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <DollarSign size={20} /> Profit Per Property (Sell)
              </h3>
              {propertySellingProfits.length > 0 ? (
                <ul className="space-y-2">
                  {propertySellingProfits.map((propProfit, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <span className="font-medium text-gray-700">
                        {propProfit.name}
                      </span>
                      <span className="text-green-600 font-semibold">
                        {formatCurrency(propProfit.profit)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 text-sm">
                  No property-specific selling profits to display.
                </p>
              )}
            </div>
          </>
        );
      case "notifications":
        return (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Bell size={20} /> Your Notifications
            </h3>
            {rentProfits.notifications.length > 0 ? (
              <ul className="space-y-2">
                {rentProfits.notifications.map((notif, index) => (
                  <li
                    key={index}
                    className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md"
                  >
                    {notif}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">No new notifications.</p>
            )}
          </div>
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Dashboard</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex border-b border-gray-200 mb-6">
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
            active={activeTab === "profits"}
            onClick={() => setActiveTab("profits")}
            icon={DollarSign}
          >
            Profits
          </TabButton>
          <TabButton
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
            icon={Bell}
          >
            Notifications
          </TabButton>
          <TabButton
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={Settings}
          >
            Settings
          </TabButton>
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
