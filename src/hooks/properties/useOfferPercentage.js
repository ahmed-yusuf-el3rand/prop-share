import { useMutation, useQueryClient } from "@tanstack/react-query";
import { offerPercentage } from "../../services/propertiesService";

export const useOfferPercentage = (offerDetails) => {
  const queryClient = useQueryClient();
  const offerMutation = useMutation({
    mutationFn: () => offerPercentage(offerDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties", offerDetails],
      });
    },
  });

  return {
    offerProperty: (offerDetails) => offerMutation.mutateAsync(offerDetails),
    isOffering: offerMutation.isLoading,
    isError: offerMutation.isError,
  };
};
