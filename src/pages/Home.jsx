import HeroSection from "../components/home/HeroSection.jsx";
import HowItWorksSection from "../components/home/HowItWorksSection.jsx";
import WhyPropShareSection from "../components/home/WhyPropShareSection.jsx";
import FeaturedPropertiesSection from "../components/home/FeaturedPropertiesSection.jsx";
import JoinSection from "../components/home/JoinSection.jsx";

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
