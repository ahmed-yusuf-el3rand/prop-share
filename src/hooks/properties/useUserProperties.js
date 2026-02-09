import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOfferedProps, getOwnedProps } from "../../services/propertiesService";

const defaultOptions = {
  staleTime: 5 * 60 * 1000,
  placeholderData: keepPreviousData,
};

export const useUserProperties = (activeTab) => {
  const ownedQuery = useQuery({
    queryKey: ["properties", "owned"],
    queryFn: getOwnedProps,
    enabled: activeTab === "owned",
    ...defaultOptions,
  });

  const offeredQuery = useQuery({
    queryKey: ["properties", "offered"],
    queryFn: getOfferedProps,
    enabled: activeTab === "offered",
    ...defaultOptions,
  });

  return {
    ownedQuery,
    offeredQuery,
  };
};
