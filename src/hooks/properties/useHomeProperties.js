import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProperties } from "../../services/propertiesService";

export const useHomeProperties = (limit) => {
  return useQuery({
    queryKey: ["properties", {limit}],
    queryFn: () => getProperties({ limit }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
