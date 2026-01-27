import { getUserInfoApi, updateUserInfoApi } from "../api/userInfoApi";

const getUserInfo = async (userId) => {
  const { data } = await getUserInfoApi(userId);
  return data;
};
const updateUserInfo = async (userId) => {
  const { data } = await updateUserInfoApi(userId);
  return data;
};

export { getUserInfo, updateUserInfo };
