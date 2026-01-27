import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  deleteNotification,
  openNotification,
} from "@/services/notificationsService";

export const useNotifications = (limit, user) => {
  const queryClient = useQueryClient();
  const notificationsKey = ["notifications", user?.id];
  const notificationsQuery = useQuery({
    queryKey: [notificationsKey],
    queryFn: () => getNotifications(limit, user?.id),
    select: (data) => data.notifications,
    enabled: Boolean(user?.id),
    staleTime: 60_000,
    retry: 2,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,

    onMutate: async (id) => {
      await queryClient.cancelQueries([notificationsKey]);
      const previous = queryClient.getQueryData([notificationsKey]);

      queryClient.setQueryData([notificationsKey], (old = []) =>
        old ? old.filter((n) => n.id !== id) : []
      );

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([notificationsKey], ctx.previous);
      }
    },
  });

  const openMutation = useMutation({
    mutationFn: openNotification,
    onMutate: async (id) => {
      await queryClient.cancelQueries([notificationsKey]);
      const previous = queryClient.getQueryData([notificationsKey]);
      queryClient.setQueryData([notificationsKey], (old = []) =>
        old ? old.map((n) => (n.id === id ? { ...n, opened: true } : n)) : []
      );

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([notificationsKey], ctx.previous);
      }
    },

    onSuccess: (updatedNotification) => {
      queryClient.setQueryData([notificationsKey], (old) =>
        old
          ? old.map((n) =>
              n.id === updatedNotification.id ? updatedNotification : n
            )
          : []
      );
    },
  });

  return {
    ...notificationsQuery,
    deleteNotification: deleteMutation.mutateAsync,
    openNotification: openMutation.mutateAsync,
    deleting: deleteMutation.isLoading,
    opening: openMutation.isLoading,
  };
};
