import { useQuery } from "@tanstack/react-query";

const defaultOptions = {
  staleTime: 5 * 60 * 1000,
  keepPreviousData: true,
};




const useSetting = (user) => {
  return useQuery({
    queryKey: ["setting", user?.id],
    queryFn: () => settings.list(),
    enabled: !!user?.id,
    initialData: { theme: "light", language: "en" },
    ...defaultOptions,
  });
};

export { useSetting};
