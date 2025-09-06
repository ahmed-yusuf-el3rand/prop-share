import { ownedProperties } from "../../propertiesData";
import { formatCurrency } from "../../utils/formatCurrency";
import ProgressBar from "../../components/common/ProgressBar";

const OwnedTab = () => {
  return (
    <div className="space-y-4">
      {ownedProperties.length > 0 ? (
        ownedProperties.map((prop) => (
          <div
            key={prop.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onOwnedPropertyClick(prop.id)}
          >
            <img
              src={prop.image}
              alt={prop.name}
              className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/64x64/e0e0e0/000000?text=Prop`;
              }}
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg sm:text-base">
                {prop.name}
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-1 gap-1">
                <span className="text-sm text-gray-700">
                  Total Price: {formatCurrency(prop.value)}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${
                    prop.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  status
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-1">
                <span className="text-sm text-gray-600">
                  {prop.percentageHeld}% Held
                </span>
                <span className="text-blue-600 font-bold text-base sm:text-lg">
                  Your Share: {formatCurrency(prop.value)}
                </span>
              </div>

              <ProgressBar progress={prop.percentageHeld} className="mt-3" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">You don't own any properties yet.</p>
      )}
    </div>
  );
};

export default OwnedTab;
