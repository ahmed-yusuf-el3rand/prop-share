import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { getProperties } from "../../services/propertiesService";

import { useEffect, useState } from "react";
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useExploreProperties = (filters) => {
  const debouncedFilters = useDebounce(filters, 500);
  return useInfiniteQuery({
    queryKey: ["properties", { filters }],
    queryFn: ({ pageParam = 1 }) => getProperties({ filters, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => data.pages.flatMap((page) => page.properties),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};
