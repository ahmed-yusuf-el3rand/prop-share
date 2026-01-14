import { useQuery } from "@tanstack/react-query";
import { notifications, money } from "../services/dashboardService";

const defaultOptions = {
  staleTime: 5 * 60 * 1000,
  keepPreviousData: true,
};

const useNotification = (user) => {
  return useQuery({
    queryKey: ["notification", user?.id],
    queryFn: () => notifications.list(),
    ...defaultOptions,
  });
};

const useMoney = (user) => {
  return useQuery({
    queryKey: ["money", user?.id],
    queryFn: () => money.list(user.id),
    enabled: !!user?.id,
    initialData: { sellingProfits: {}, profits: [], payments: [] },
    ...defaultOptions,
  });
};

const useSetting = (user) => {
  return useQuery({
    queryKey: ["setting", user?.id],
    queryFn: () => settings.list(),
    enabled: !!user?.id,
    initialData: { theme: "light", language: "en" },
    ...defaultOptions,
  });
};

export { useNotification, useMoney ,useSetting};
