import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPropertyDetails } from "../../services/propertiesService";

export const usePropertyDetails = (propertyId) => {
  return useQuery({
    queryKey: ["properties", propertyId],
    queryFn: ({ signal }) => getPropertyDetails(propertyId, { signal }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
