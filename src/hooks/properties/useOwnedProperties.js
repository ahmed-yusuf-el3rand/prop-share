import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getOwnedProps } from "../../services/propertiesService";
import { useNavigation } from "../../hooks/useNavigation";

export const useOwnedProperties = (activeTab) => {
  const { goToProperty } = useNavigation();
  const ownedPropertiesQuery = useQuery({
    queryKey: ["properties", "owned"],
    queryFn: ({ signal }) => getOwnedProps({ signal }),
    enabled: activeTab === "owned",
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
  return {
    ...ownedPropertiesQuery,
    goToProperty,
  };
};
