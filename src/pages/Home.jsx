import HeroSection from "../features/home/HeroSection.jsx";
import HowItWorksSection from "../features/home/HowItWorksSection.jsx";
import WhyPropShareSection from "../features/home/WhyPropShareSection.jsx";
import FeaturedPropertiesSection from "../features/home/FeaturedPropertiesSection.jsx";
import JoinSection from "../features/home/JoinSection.jsx";

const Home = () => {
  return (
    <div className="mx-auto p-0">
      <HeroSection />
      <HowItWorksSection />
      <WhyPropShareSection />
      <FeaturedPropertiesSection />
      <JoinSection />
    </div>
  );
};

export default Home;
