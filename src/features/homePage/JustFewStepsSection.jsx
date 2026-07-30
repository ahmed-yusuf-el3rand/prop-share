import { Zap, ShieldCheck, TrendingUpIcon } from "lucide-react";

const EasyStepsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Just Few Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 ">
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-yellow-500">
            <h3 className="text-2xl font-semibold text-cyan-600 m-5">
              Discover
            </h3>
            <p className="text-gray-600">
              Browse a curated selection of premium properties available for
              fractional or full ownership.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-yellow-500">
            <h3 className="text-2xl font-semibold text-cyan-600 m-5">
              Invest
            </h3>
            <p className="text-gray-600">
              Securely purchase a desired percentage of the property that fits
              your budget.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-2 border-yellow-500">
            <h3 className="text-2xl font-semibold text-cyan-600 m-5">Earn</h3>
            <p className="text-gray-600">
              Enjoy rental income and potential property appreciation as a
              co-owner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyStepsSection;
