import client from "./client";
const updateUserInfoApi = (userInfo) => client.put("/userInfo", userInfo);
export { getUserInfoApi, updateUserInfoApi };
