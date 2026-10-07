import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getNotifications,
  deleteNotification,
  openNotification,
} from "../../services/notificationService";

const data = ["Your order #1234 has been shipped."];

export const useNotifications = (limit, user) => {
  const [errorMessage, setError] = useState();
  const [notifications, setNotifications] = useState(
    data.map((text) => ({
      text,
      opened: false,
      expanded: false,
    })),
  );
  const queryClient = useQueryClient();
  const notificationsKey = ["notifications", user?.id];
  const notificationsQuery = useQuery({
    queryKey: [notificationsKey],
    queryFn: ({ signal }) => getNotifications(limit, user?.id, { signal }),
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
        old ? old.filter((n) => n.id !== id) : [],
      );

      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([notificationsKey], ctx.previous);
      }
      setError(_err.message);
    },
  });

  const openMutation = useMutation({
    mutationFn: openNotification,
    onMutate: async (id) => {
      await queryClient.cancelQueries([notificationsKey]);
      const previous = queryClient.getQueryData([notificationsKey]);
      queryClient.setQueryData([notificationsKey], (old = []) =>
        old ? old.map((n) => (n.id === id ? { ...n, opened: true } : n)) : [],
      );
      return { previous };
    },
    onSuccess: (updatedNotification) => {
      queryClient.setQueryData([notificationsKey], (old) =>
        old
          ? old.map((n) =>
              n.id === updatedNotification.id ? updatedNotification : n,
            )
          : [],
      );
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([notificationsKey], ctx.previous);
      }
      setError(_err.message);
    },
  });

  const handleToggle = (index) => {
    // openMutation.mutateAsync(index);
    setNotifications((prev) =>
      prev.map((n, i) =>
        i === index ? { ...n, opened: true, expanded: !n.expanded } : n,
      ),
    );
  };

  const handleDelete = (index) => {
    // deleteMutation.mutateAsync(id);
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    ...notificationsQuery,
    deleting: deleteMutation.isLoading,
    opening: openMutation.isLoading,
    errorMessage,
    notifications,
    handleToggle,
    handleDelete,
  };
};
