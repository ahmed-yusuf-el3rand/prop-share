import client from "./client";
const getUserInfoApi = () => client.get("/userInfo");
const updateUserInfoApi = (userInfo) => client.put("/userInfo", userInfo);
export { getUserInfoApi, updateUserInfoApi };
