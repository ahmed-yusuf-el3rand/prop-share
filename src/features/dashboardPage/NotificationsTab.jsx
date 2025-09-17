import { Bell, X } from "lucide-react";
import { useState } from "react";
import { rentProfits } from "../../propertiesData";

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(
    rentProfits.notifications.map((text) => ({
      text,
      opened: false,
      expanded: false,
    }))
  );

  const toggleNotification = (index) => {
    setNotifications((prev) =>
      prev.map((notif, i) =>
        i === index
          ? { ...notif, opened: true, expanded: !notif.expanded }
          : notif
      )
    );
  };

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Bell size={20} /> Your Notifications
      </h3>

      {notifications.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((notif, index) => (
            <li
              key={index}
              className={`rounded-md shadow-sm cursor-pointer transition-colors duration-200 ${
                notif.opened ? "bg-gray-50" : "bg-blue-50"
              }`}
              onClick={() => toggleNotification(index)}
            >
              <div className="flex justify-between items-center p-3">
                <span
                  className={`text-sm text-gray-700 ${
                    notif.expanded
                      ? "overflow-x-hidden break-words"
                      : "truncate"
                  }`}
                >
                  {notif.text}
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
