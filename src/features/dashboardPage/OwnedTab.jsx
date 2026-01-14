import { ownedProperties } from "../../propertiesData";
import formatCurrency from "../../utils/formatCurrency";
import { useNavigation } from "../../hooks/useNavigation";
import { useOwnedProps } from "../../hooks/useProperties";
import ProgressBar from "../../components/common/ProgressBar";

const OwnedTab = () => {
  const { goToProperty } = useNavigation();
  const { data = [], isLoading, error } = useOwnedProps();
  const ownedProps = ownedProperties;

  // if (isLoading)
  //   return <p className="text-center">Loading your owned properties...</p>;
  // if (error)
  //   return (
  //     <p className="text-center text-red-500">
  //       Failed to load your owned properties.
  //     </p>
  //   );

  return (
    <div className="space-y-4">
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
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-cyan-600 font-medium text-base sm:text-lg">
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
