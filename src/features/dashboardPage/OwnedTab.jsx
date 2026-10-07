import { ownedProperties } from "../../mock/ownedProperties";
import formatCurrency from "../../utils/formatCurrency";
import { useOwnedProperties } from "../../hooks/properties/useOwnedProperties";
import ProgressBar from "../../components/common/ProgressBar";
import { Loader2 } from "lucide-react";

const OwnedTab = (activeTab) => {
  const { data, isLoading, error,goToProperty } = useOwnedProperties(activeTab);
  const ownedProps = ownedProperties;

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
          <p className="text-gray-700 font-medium">
            Loading your owned properties...
          </p>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500">
          Failed to load your owned properties.
        </p>
      )}
      {ownedProps?.length > 0 ? (
        ownedProps.map((prop) => (
          <div
            key={prop.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => goToProperty(prop.id)}
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
              <h3 className="font-semibold text-gray-800 sm:text-xl text-lg">
                {prop.name}
              </h3>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-gray-600 font-medium text-base sm:text-lg">
                <span>{prop.heldPercentage}% Held</span>
                <span>Share: {formatCurrency(prop.shareValue)}</span>
              </div>
              <ProgressBar progress={prop.heldPercentage} className="mt-3" />
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
