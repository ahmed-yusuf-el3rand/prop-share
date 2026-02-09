import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPropertyDetails } from "../../services/propertiesService";

export const usePropertyDetails = (propertyId) => {
  return useQuery({
    queryKey: ["properties", propertyId],
    queryFn: () => getPropertyDetails(propertyId),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
