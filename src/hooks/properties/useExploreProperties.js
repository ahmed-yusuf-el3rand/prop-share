import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProperties } from "../../services/propertiesService";

export const useExploreProperties = (filters) => {
  return useQuery({
    queryKey: ["properties", {filters}],
    queryFn: () => getProperties({ filters }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
