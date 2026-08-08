import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import {
  getBankCard,
  addBankCard,
  deleteBankCard,
} from "../../../services/bankCardService";

export const useBankCard = (userId) => {
  const queryClient = useQueryClient();
  const bankCardKey = ["bank-card"];

  const bankCardQuery = useQuery({
    queryKey: bankCardKey,
    queryFn: ({ signal }) => getBankCard({ signal }),
    select: (data) => data.bankCard,
    staleTime: 60_000,
    enabled: Boolean(userId),
    retry: 2,
  });

  const addMutation = useMutation({
    mutationFn: ({ signal }) => addBankCard({ signal }),
    onMutate: async (newCard) => {
      await queryClient.cancelQueries(bankCardKey);
      const previous = queryClient.getQueryData(bankCardKey);

      queryClient.setQueryData(bankCardKey, (old) => ({
        ...old,
        bankCard: [...(old?.bankCard || []), newCard],
      }));

      return { previous };
    },

    onError: (_err, _newCard, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(bankCardKey, ctx.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bankCardKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ signal }) => deleteBankCard({ signal }),
    onMutate: async (id) => {
      await queryClient.cancelQueries(bankCardKey);
      const previous = queryClient.getQueryData(bankCardKey);

      queryClient.setQueryData(bankCardKey, (old) => ({
        ...old,
        bankCard: old?.bankCard.filter((c) => c.id !== id),
      }));

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(bankCardKey, ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bankCardKey });
    },
  });

  return {
    bankCard: bankCardQuery.data,
    loading: bankCardQuery.isLoading,
    error: bankCardQuery.error,

    addCard: addMutation.mutateAsync,
    adding: addMutation.isLoading,

    deleteCard: deleteMutation.mutateAsync,
    deleting: deleteMutation.isLoading,
  };
};
