import { Building2, Users, Target } from "lucide-react";
import Button from "../components/common/buttons/Button";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

      {/* Intro Section */}
      <p className="text-lg text-gray-600 mb-12">
        At <span className="font-semibold text-primary-600">PropShare</span>,
        our mission is to make property investment simple, accessible, and
        transparent for everyone. We believe in breaking barriers and opening
        opportunities for individuals to co-own properties with ease.
      </p>

      {/* Mission / Values */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-2xl shadow bg-white">
          <Target className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To democratize real estate ownership by providing a secure and
            user-friendly platform for fractional property investment.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white">
          <Users className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-600">
            Transparency, trust, and innovation guide every decision we make,
            ensuring long-term success for our community of investors.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white">
          <Building2 className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To become the leading platform where anyone can start building
            wealth through shared property ownership.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Start Your Investment Journey?
        </h2>
        <Button variant="primary" size="lg">
          Explore Properties
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
