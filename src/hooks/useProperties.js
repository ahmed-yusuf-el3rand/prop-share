import { useQuery } from "@tanstack/react-query";
import propertiesService from "../services/propertiesService";

const useProperties = (limit) => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: () => propertiesService.list({ limit }),
    staleTime: 5 * 60 * 1000,
  });
};

const useFilteredProps = (filters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertiesService.list(filters),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });
};

export { useProperties, useFilteredProps };
