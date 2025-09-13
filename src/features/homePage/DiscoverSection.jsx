import {
  DollarSign,
  Percent,
  ShieldCheck,
  TrendingUpIcon,
  Users,
  Wallet,
} from "lucide-react";

const DiscoverSection = () => {
  return (
    <section className="py-16 bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
         Discover the PropShare
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <DollarSign size={48} className="text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Accessible Investment
            </h3>
            <p className="text-gray-600">
              Invest in high-value properties with smaller capital, making real
              estate accessible to more investors.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Percent size={48} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Diversify Your Portfolio
            </h3>
            <p className="text-gray-600">
              Spread your investments across multiple properties and locations,
              reducing risk.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <ShieldCheck size={48} className="text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Hassle-Free Ownership
            </h3>
            <p className="text-gray-600">
              We handle property management, maintenance, and tenant relations,
              so you can enjoy passive income.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <TrendingUpIcon size={48} className="text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Transparent & Secure
            </h3>
            <p className="text-gray-600">
              Blockchain-powered transactions ensure transparency, security, and
              immutable records of ownership.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Users size={48} className="text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Community & Support
            </h3>
            <p className="text-gray-600">
              Join a growing community of smart investors and get dedicated
              support whenever you need it.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Wallet size={48} className="text-cyan-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Liquidity Options
            </h3>
            <p className="text-gray-600">
              Easily buy and sell your fractions on our secondary market,
              providing greater liquidity than traditional real estate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
