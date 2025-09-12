import ProgressBar from "../../components/common/ProgressBar";
import  formatCurrency  from "../../utils/formatCurrency";
import { pendingProperties } from "../../propertiesData";

const PendingTab = () => {
  return (
    <div className="space-y-4">
      {pendingProperties.length > 0 ? (
        pendingProperties.map((prop) => {
          const progress =
            (prop.currentOwnedPercentage / prop.targetPercentage) * 100;

          return (
            <div
              key={prop.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => onPendingPropertyClick(prop.id)}
            >
              <img
                src={prop.propertyImage}
                alt={prop.propertyName}
                className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/64x64/e0e0e0/000000?text=Pending`;
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg sm:text-base">
                  {prop.propertyName}
                </h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mt-1">
                  <span className="text-sm text-gray-600">
                    {progress.toFixed(0)}% Buying Progress
                  </span>
                  <span className="text-blue-600 font-bold text-lg sm:text-base sm:ml-2">
                    Total Price: {formatCurrency(prop.price)}
                  </span>{" "}
                </div>
                <ProgressBar progress={progress} className="mt-2" />
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-600">
          No properties are pending full possession.
        </p>
      )}
    </div>
  );
};

export default PendingTab;
