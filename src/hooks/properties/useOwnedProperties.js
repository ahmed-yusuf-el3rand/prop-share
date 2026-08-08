import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOwnedProps } from "../../services/propertiesService";

export const useOwnedProperties = (activeTab) => {
  return useQuery({
    queryKey: ["properties", "owned"],
    queryFn: ({ signal }) => getOwnedProps({ signal }),
    enabled: activeTab === "owned",
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
