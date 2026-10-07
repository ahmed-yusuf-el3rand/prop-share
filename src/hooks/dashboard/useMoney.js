import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMoney } from "../../services/moneyService";
import { useAuth } from "../../context/auth/useAuth";

export const useMoney = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["money", user?.id],
    queryFn: ({ signal }) => getMoney(user?.id, { signal }),
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: keepPreviousData,
  });
};
