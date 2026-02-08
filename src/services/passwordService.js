import { changePasswordApi } from "../api/changePasswordApi";

export const changePassword = async (passwordInfo) => {
  const { data } = await changePasswordApi(passwordInfo);
  return data;
};
