import client from "../client";

const getNotificationsApi = () => client.get("/notifications");

const openNotificationApi = (id) => client.post(`/notifications/${id}/open`);

const deleteNotificationApi = (id) => client.delete(`/notifications/${id}`);

export { getNotificationsApi, openNotificationApi, deleteNotificationApi };
