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

export const useExploreProperties = () => {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    priceRange: "",
    minOwnership: "",
  });

  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const debouncedFilters = useDebounce(filters, 500);

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["properties", { debouncedFilters }],
    queryFn: ({ signal, pageParam = 1 }) =>
      getProperties({ filters: debouncedFilters, page: pageParam }, { signal }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => data.pages.flatMap((page) => page.properties),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    filters,
    handleChange,
    // ...infiniteQuery,
  };
};
