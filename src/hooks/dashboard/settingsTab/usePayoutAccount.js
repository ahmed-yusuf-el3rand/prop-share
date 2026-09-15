import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPayoutAccount,
  createPayoutOnboarding,
  withdrawMoney,
} from "../../../services/payoutAccountService";

export const usePayoutAccount = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingAccount,
    error: accountError,
  } = useQuery({
    queryKey: ["payout-account"],
    queryFn: getPayoutAccount,
  });

  const onboardingMutation = useMutation({
    mutationFn: createPayoutOnboarding,

    onSuccess: (data) => {
      window.location.assign(data.url);
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: withdrawMoney,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payout-account"],
      });
    },
  });

  return {
    account: data,

    isLoading: isLoadingAccount,

    isOnboarding:
      onboardingMutation.isPending,

    isWithdrawing:
      withdrawMutation.isPending,

    error:
      accountError?.response?.data?.message ??
      onboardingMutation.error?.response?.data?.message ??
      withdrawMutation.error?.response?.data?.message ??
      null,

    startOnboarding:
      onboardingMutation.mutateAsync,

    withdraw:
      withdrawMutation.mutateAsync,
  };
};