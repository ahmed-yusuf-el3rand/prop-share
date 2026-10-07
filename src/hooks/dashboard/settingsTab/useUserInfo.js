import { getUserInfo, updateUserInfo } from "../../../services/userInfoService";
import { validateUserInformationForm } from "../../../utils/validation";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

export const useUserInfo = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

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
    onSuccess: (updatedUserInfo) => {
      queryClient.setQueryData(userInfoKey, updatedUserInfo);
    },
    onError: (_err, _variables, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(userInfoKey, ctx.previous);
      }
      setError(_err.message);
    },
  });

  const handleChange = (e) => {
    setError("");
    setMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePersonalInfo = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const validationError = validateUserInformationForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    updateMutation.mutateAsync({ formData });
  };

  return {
    ...userInfoQuery,
    updating: updateMutation.isPending,
    formData,
    handleChange,
    message,
    error,
    handlePersonalInfo,
  };
};
