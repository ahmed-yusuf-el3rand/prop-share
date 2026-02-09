import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyShare } from "../../services/propertiesService";

export const useBuyShare = (purchasingDetails) => {
  const queryClient = useQueryClient();
  const buyShareMutation = useMutation({
    mutationFn: () => buyShare(purchasingDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["properties", purchasingDetails],
      });
    },
  });

  return {
    purchaseShare: (purchasingDetails) =>
      buyShareMutation.mutateAsync(purchasingDetails),
    isBuying: buyShareMutation.isLoading,
    isError: buyShareMutation.isError,
  };
};
