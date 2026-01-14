const createMutation = (updateFn, onSuccess) => ({
  onMutate: async (variables) => {
    await queryClient.cancelQueries(notificationsKey);
    const previous = queryClient.getQueryData(notificationsKey);

    queryClient.setQueryData(notificationsKey, (old) =>
      old ? updateFn(old, variables) : []
    );

    return { previous };
  },

  onError: (_err, _vars, ctx) => {
    if (ctx?.previous) {
      queryClient.setQueryData(notificationsKey, ctx.previous);
    }
  },

  ...(onSuccess && {
    onSuccess: (data) => {
      queryClient.setQueryData(notificationsKey, (old) =>
        old ? onSuccess(old, data) : []
      );
    },
  }),
});
export default createMutation;


// const deleteMutation = useMutation({
//   mutationFn: deleteNotification,
//   ...createOptimisticMutation(
//     (old, id) => old.filter((n) => n.id !== id)
//   ),
// });


// const openMutation = useMutation({
//   mutationFn: openNotification,
//   ...createOptimisticMutation(
//     (old, id) =>
//       old.map((n) => (n.id === id ? { ...n, opened: true } : n)),
//     (old, updatedNotification) =>
//       old.map((n) =>
//         n.id === updatedNotification.id ? updatedNotification : n
//       )
//   ),
// });
