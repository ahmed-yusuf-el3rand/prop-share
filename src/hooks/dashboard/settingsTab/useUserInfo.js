import { getUserInfo, updateUserInfo } from "../../../services/userInfoService";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

export const useUserInfo = () => {
  const queryClient = useQueryClient();
  const userInfoKey = ["userInfo"];
  const userInfoQuery = useQuery({
    queryKey: userInfoKey,
    queryFn: ({ signal }) => getUserInfo({ signal }),
    select: (data) => data.userInfo,
    enabled: Boolean(),
    staleTime: 60_000,
    retry: 2,
    placeholderData: keepPreviousData,
  });

  const updateMutation = useMutation({
    mutationFn: updateUserInfo,
    onMutate: async (updatedUserInfo) => {
      await queryClient.cancelQueries(userInfoKey);
      const previous = queryClient.getQueryData(userInfoKey);
      queryClient.setQueryData(userInfoKey, updatedUserInfo);
      return { previous };
    },

    onError: (_err, _variables, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(userInfoKey, ctx.previous);
      }
    },

    onSuccess: (updatedUserInfo) => {
      queryClient.setQueryData(userInfoKey, updatedUserInfo);
    },
  });

  return {
    ...userInfoQuery,
    updateInfo: (userInfo) => updateMutation.mutateAsync({ userInfo }),
    updating: updateMutation.isPending,
  };
};
