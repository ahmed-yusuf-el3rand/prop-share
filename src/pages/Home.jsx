import HeroSection from "../features/home/HeroSection.jsx";
import EasyStepsSection from "../features/home/EasyStepsSection.jsx";
import DiscoverSection from "../features/home/DiscoverSection.jsx";
import PropertiesSection from "../features/home/PropertiesSection.jsx";
import JoinSection from "../features/home/JoinSection.jsx";

const Home = () => {
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

export default Home;
