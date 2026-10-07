import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOfferedProps } from "../../services/propertiesService";
import { useNavigation } from "../../hooks/useNavigation";

export const useOfferedProperties = (activeTab) => {
  const { goToProperty } = useNavigation();
  const offeredPropertiesQuery = useQuery({
    queryKey: ["properties", "offered"],
    queryFn: ({ signal }) => getOfferedProps({ signal }),
    enabled: activeTab === "offered",
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
  return {
    ...offeredPropertiesQuery,
    goToProperty,
  };
};
