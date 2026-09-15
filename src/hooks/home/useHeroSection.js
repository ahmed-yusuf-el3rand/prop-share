import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigation } from "../../hooks/useNavigation";
import { validateSearchInput } from "../../utils/validation";

export const useHeroSection = () => {
  const [location, setLocation] = useState("");
  const [isError, setIsError] = useState(false);
  const { goToExplore } = useNavigation();
  const [counters, setCounters] = useState({
    properties: 0,
    investors: 0,
    roi: 0,
  });

  useEffect(() => {
    const target = {
      properties: 8000,
      investors: 500,
      roi: 25,
    };

    const duration = 1500;
    const steps = 60;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setCounters({
        properties: Math.min(
          Math.round((target.properties * frame) / steps),
          target.properties,
        ),
        investors: Math.min(
          Math.round((target.investors * frame) / steps),
          target.investors,
        ),
        roi: Math.min(Math.round((target.roi * frame) / steps), target.roi),
      });
      if (frame >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const errorValue = validateSearchInput(location);
    if (errorValue) {
      toast.error(errorValue);
      setIsError(true);
      return;
    }
    goToExplore(location);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleChange = (e) => {
    setIsError(false);
    const value = e.target.value;
    setLocation(value);
  };

  return {
    location,
    isError,
    counters,
    setIsError,
    handleSubmit,
    handleChange,
  };
};
