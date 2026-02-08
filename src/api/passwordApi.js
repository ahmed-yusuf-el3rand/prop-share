import client from "./client";
export const changePasswordApi = (passwordInfo) =>
  client.put("/change-password", passwordInfo);
