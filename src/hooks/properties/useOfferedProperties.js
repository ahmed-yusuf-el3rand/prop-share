import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOfferedProps } from "../../services/propertiesService";

export const useOfferedProperties = () => {
  return useQuery({
    queryKey: ["properties", "offered"],
    queryFn: ({ signal }) => getOfferedProps({ signal }),
    enabled: activeTab === "offered",
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
