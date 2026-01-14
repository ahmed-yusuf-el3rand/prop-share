import { useQuery } from "@tanstack/react-query";
import propertiesService from "../services/propertiesService";

const defaultOptions = {
  staleTime: 5 * 60 * 1000,
  keepPreviousData: true,
};

const useProperties = (limit, user) => {
  return useQuery({
    queryKey: ["properties", user?.id],
    queryFn: () => propertiesService.list({ limit }),
    ...defaultOptions,
  });
};

const useFilteredProps = (filters, user) => {
  return useQuery({
    queryKey: ["properties", filters, user?.id],
    queryFn: () => propertiesService.list(filters),
    ...defaultOptions,
  });
};

const useOwnedProps = (user) => {
  return useQuery({
    queryKey: ["user-properties", "owned", user?.id],
    queryFn: () => propertiesService.owned(),
    ...defaultOptions,
  });
};

const useOfferedProps = (user) => {
  return useQuery({
    queryKey: ["user-properties", "offered", user?.id],
    queryFn: () => propertiesService.offered(),
    ...defaultOptions,
  });
};



export { useProperties, useFilteredProps, useOwnedProps, useOfferedProps };
