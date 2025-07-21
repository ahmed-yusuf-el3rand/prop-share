import { Bell } from "lucide-react";
import { rentProfits } from "../../propertiesData";
const NotificationsTab=()=>{
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
                    className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 shadow-sm border border-gray-200"
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
}
export default NotificationsTab;