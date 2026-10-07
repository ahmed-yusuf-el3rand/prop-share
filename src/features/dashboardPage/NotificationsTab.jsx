import { X,Loader2 } from "lucide-react";
import { useNotifications } from "../../hooks/dashboard/useNotifications";

const NotificationsTab = () => {
  const {
    data: notificationsData,
    error,
    isPending: isLoading,
    notifications,
    handleToggle,
    handleDelete,
    errorMessage,
  } = useNotifications();

  if (false)
    return (
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
        <p className="text-gray-700 font-medium">
          Loading your notifications...
        </p>
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        Failed to load your notifications.
      </p>
    );

  return (
    <div>
      <p className="text-center text-red-500">{errorMessage}</p>
      {notifications?.length > 0 ? (
        <ul className="space-y-2">
          {notifications.map((n, index) => (
            <li
              key={index}
              onClick={() => handleToggle(index)}
              className={`rounded-md shadow-sm cursor-pointer transition-colors duration-200 ${
                n.opened ? "bg-gray-50" : "bg-cyan-50"
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
                    handleDelete(index);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-sm ml-7">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationsTab;
