import { getUserInfoApi, updateUserInfoApi } from "../api/userInfoApi";

const getUserInfo = async () => {
  const { data } = await getUserInfoApi();
  return data;
};
const updateUserInfo = async ({ updatedUserInfo }) => {
  const { data } = await updateUserInfoApi(updatedUserInfo);
  return data;
};

export { getUserInfo, updateUserInfo };
