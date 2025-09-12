import HeroSection from "../features/homePage/HeroSection.jsx";
import EasyStepsSection from "../features/homePage/EasyStepsSection.jsx";
import DiscoverSection from "../features/homePage/DiscoverSection.jsx";
import PropertiesSection from "../features/homePage/PropertiesSection.jsx";
import JoinSection from "../features/homePage/JoinSection.jsx";

const HomePage = () => {
  return (
    <div className="mx-auto p-0">
      <HeroSection />
      <EasyStepsSection />
      <DiscoverSection />
      <PropertiesSection />
      <JoinSection />
    </div>
  );
};

export default HomePage;
