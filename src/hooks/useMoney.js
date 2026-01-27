import { useQuery, keepPreviousData } from "@tanstack/react-query";
import  {getMoney}  from "../services/moneyService";

export const useMoney = (userId) => {
  return useQuery({
    queryKey: ["money", userId],
    queryFn: () => getMoney(userId),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: keepPreviousData,
  });
};
