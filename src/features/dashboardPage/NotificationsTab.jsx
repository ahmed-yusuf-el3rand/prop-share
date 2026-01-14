import { Bell, X } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration purposes
const data = [
  "Your order #1234 has been shipped.",
];


const NotificationsTab = ({ isLoading, error }) => {
  const [notifications, setNotifications] = useState(
    data.map((text) => ({
      text,
      opened: false,
      expanded: false,
    }))
  );

  const toggleNotification = (index) => {
    setNotifications((prev) =>
      prev.map((n, i) =>
        i === index ? { ...n, opened: true, expanded: !n.expanded } : n
      )
    );
  };

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  // const handleRemove = useCallback(
  //   (id) => {
  //     setNotifications((prev) => prev.filter((n) => n.id !== id));
  //     deleteNotification(id);
  //   },
  //   [deleteNotification]
  // );

  if (isLoading)
    return <p className="text-center">Loading your notifications...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Failed to load your notifications.
      </p>
    );

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Bell size={20} /> Your Notifications
      </h3>

      {notifications?.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((n, index) => (
            <li
              key={index}
              onClick={() => toggleNotification(index)}
              className={`rounded-md shadow-sm cursor-pointer transition-colors duration-200 ${
                n.opened ? "bg-gray-50" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-center p-3">
                <span
                  className={`text-sm text-gray-700 ${
                    n.expanded ? "overflow-x-hidden break-words" : "truncate"
                  }`}
                >
                  {n.text}
                </span>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(index);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-sm">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationsTab;
