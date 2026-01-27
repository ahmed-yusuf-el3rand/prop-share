import { getMoneyApi } from "../api/moneyApi";

export const getMoney = async (userId) => {
  const { data } = await getMoneyApi(userId);
  return data;
};

