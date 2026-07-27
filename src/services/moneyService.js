import { getMoneyApi } from "../api/dashboard/moneyApi";

export const getMoney = async (userId) => {
  const { data } = await getMoneyApi(userId);
  return data;
};

