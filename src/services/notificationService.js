import {
  getNotificationsApi,
  openNotificationApi,
  deleteNotificationApi,
} from "../api/dashboard/notificationsApi";

const getNotifications = async ({ signal }) => {
  const response = await getNotificationsApi({ signal });
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
