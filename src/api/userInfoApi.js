import client from "./client";
const getUserInfoApi = ({ signal }) => client.get("/userInfo", { signal });
const updateUserInfoApi = (userInfo) => client.put("/userInfo", userInfo);
export { getUserInfoApi, updateUserInfoApi };
