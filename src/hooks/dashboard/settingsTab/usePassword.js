import { changePassword } from "../../../services/passwordService";
import { useMutation } from "@tanstack/react-query";

export const usePassword = () => {
  const changeMutation = useMutation({
    mutationFn: changePassword,
  });

  return {
    changeUserPassword: (passwordInfo) =>
      changeMutation.mutateAsync(passwordInfo),
    isError: changeMutation.isError,
    isSuccess: changeMutation.isSuccess,
    changing: changeMutation.isLoading,
  };
};
