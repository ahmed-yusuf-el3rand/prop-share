import HeroSection from "../features/homePage/HeroSection.jsx";
import JustFewStepsSection from "../features/homePage/JustFewStepsSection.jsx";
import ManyFeaturesSection from "../features/homePage/ManyFeaturesSection.jsx";
import PropertiesSection from "../features/homePage/PropertiesSection.jsx";
import JoinSection from "../features/homePage/JoinSection.jsx";

const HomePage = () => {
  return (
    <div className="mx-auto p-0">
      <HeroSection />
      <JustFewStepsSection />
      <ManyFeaturesSection />
      <PropertiesSection />
      <JoinSection />
    </div>
  );
};

export default HomePage;
