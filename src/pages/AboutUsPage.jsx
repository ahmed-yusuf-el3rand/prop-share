import Button from "../components/common/buttons/Button";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto my-12 px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
      <p className="text-lg text-gray-600 mb-12">
        At <span className="font-semibold text-primary-600">PropShare</span>,
        our mission is to make property investment simple, accessible, and
        transparent for everyone. We believe in breaking barriers and opening
        opportunities for individuals to co-own properties with ease.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-2xl shadow bg-white">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To democratize real estate ownership by providing a secure and
            user-friendly platform for fractional property investment.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-600">
            Transparency, trust, and innovation guide every decision we make,
            ensuring long-term success for our community of investors.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-white">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To become the leading platform where anyone can start building
            wealth through shared property ownership.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
