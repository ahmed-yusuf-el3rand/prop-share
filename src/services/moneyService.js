import { getMoneyApi } from "../api/dashboard/moneyApi";

export const getMoney = async (userId, { signal }) => {
  const { data } = await getMoneyApi({ userId, signal });
  return data;
};

