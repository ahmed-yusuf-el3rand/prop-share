import { useState, useEffect } from "react";
import InputField from "../../components/common/InputField";
import { MapPin, Search } from "lucide-react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchLocation, SetSearchLocation] = useState("");
  const [error, setError] = useState("");
  const [counters, setCounters] = useState({
    properties: 0,
    investors: 0,
    roi: 0,
  });

  const navigate = useNavigate();

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
          target.properties
        ),
        investors: Math.min(
          Math.round((target.investors * frame) / steps),
          target.investors
        ),
        roi: Math.min(Math.round((target.roi * frame) / steps), target.roi),
      });
      if (frame >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const validateSearchInput = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Location is required.";
    if (trimmed.length < 2) return "Please enter at least 4 characters.";
    return "";
  };

  const handleSearch = () => {
    const errorValue = validateSearchInput(searchLocation);
    if (errorValue) {
      setError(errorValue);
      return;
    }

    setError("");
    navigate(`/explore?location=${encodeURIComponent(searchLocation.trim())}`);
  };

  return (
    <section className="relative h-[65vh] md:h-[85vh] flex items-center justify-center overflow-hidden rounded-b-lg shadow-xl bg-gradient-to-br from-cyan-700 to-green-600">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          animation: "pulse-bg 10s infinite alternate",
        }}
      ></div>

      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl mt-6 md:mt-0 md:text-6xl font-extrabold leading-tight mb-6 animate-fadeInUp text-shadow-lg">
          Invest in Real Estate, Your Way.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-10 animate-fadeInUp animation-delay-200 text-shadow-md">
          Fractional ownership made simple, secure, and profitable.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
          <div className="flex-1 w-full sm:mt-4 text-center">
            <InputField
              type="text"
              icon={MapPin}
              value={searchLocation}
              placeholder="e.g., Cairo"
              className={`bg-white text-black rounded-lg py-2 px-4 shadow-sm focus:ring-2 ${
                error
                  ? "border-red-600 focus:ring-red-500"
                  : "focus:ring-blue-400"
              }`}
              onChange={(e) => {
                SetSearchLocation(e.target.value);
                setError(validateSearchInput(e.target.value));
              }}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSearch();
              }}
            />
          </div>
          <div className="flex-1 w-full">
            <Button
              onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium rounded-lg py-2 px-4 w-full transition-all duration-200"
              icon={Search}
            >
              Search
            </Button>
          </div>
        </div>
        {error && (
          <p className="text-red-600 text-lg font-semibold mt-1">{error}</p>
        )}
        <div className="mt-4 md:mt-12  grid grid-cols-1 md:grid-cols-3 gap-4 text-lg font-semibold animate-fadeInUp animation-delay-600">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-300">
              {counters.properties}+
            </span>
            <span className="text-gray-200">Properties Listed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-300">
              {counters.investors}+
            </span>
            <span className="text-gray-200">Happy Investors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-300">
              {counters.roi}%
            </span>
            <span className="text-gray-200">Avg. Annual ROI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
