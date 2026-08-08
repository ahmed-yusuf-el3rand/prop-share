import client from "../client";

const getNotificationsApi = ({ signal }) => client.get("/notifications", { signal });

const openNotificationApi = (id) => client.post(`/notifications/${id}/open`);

const deleteNotificationApi = (id) => client.delete(`/notifications/${id}`);

export { getNotificationsApi, openNotificationApi, deleteNotificationApi };
