import {
  getNotificationsApi,
  openNotificationApi,
  deleteNotificationApi,
} from "@/api/notifications";

const getNotifications = async (userID) => {
  const response = await getNotificationsApi();
  return response.data;
};

const openNotification = async (id) => {
  await openNotificationApi(id);
  return response.data;
};

const deleteNotification = async (id) => {
  await deleteNotificationApi(id);
  return response.data;
};

export { getNotifications, openNotification, deleteNotification };
