import { getUserInfoApi, updateUserInfoApi } from "../api/userInfoApi";

const getUserInfo = async ({ signal }) => {
  const { data } = await getUserInfoApi({ signal });
  return data;
};
const updateUserInfo = async ({ updatedUserInfo }) => {
  const { data } = await updateUserInfoApi(updatedUserInfo);
  return data;
};

export { getUserInfo, updateUserInfo };
