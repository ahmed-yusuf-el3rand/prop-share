import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getKycStatus,
  startKycVerification,
} from "../../../services/KycService";

export const useKyc = () => {
  const {
    data: kyc,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["kyc"],
    queryFn: getKycStatus,
    retry: false,
  });

  const startMutation = useMutation({
    mutationFn: startKycVerification,

    onSuccess: (data) => {
      if (data?.verificationUrl) {
        window.location.href = data.verificationUrl;
      }
    },
  });

  return {
    kyc,
    loading: isLoading,
    error: error?.response?.data?.message,

    startVerification: startMutation.mutateAsync,
    starting: startMutation.isPending,
  };
};