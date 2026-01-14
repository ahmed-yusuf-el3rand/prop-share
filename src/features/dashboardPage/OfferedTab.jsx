import formatCurrency from "../../utils/formatCurrency";
import { pendingProperties } from "../../propertiesData";
import { useNavigation } from "../../hooks/useNavigation";
import { useOfferedProps } from "../../hooks/useProperties";
import ProgressBar from "../../components/common/ProgressBar";

const OfferedTab = () => {
  const goToProperty = useNavigation();
  const { data = [], isLoading, error } = useOfferedProps();
  const offeredProps = pendingProperties;

  // if (isLoading)
  //   return <p className="text-center">Loading your offered properties...</p>;
  // if (error)
  //   return (
  //     <p className="text-center text-red-500">
  //       Failed to load your offered properties.
  //     </p>
  //   );

  return (
    <div className="space-y-4">
      {offeredProps?.length > 0 ? (
        offeredProps.map((prop) => (
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
                e.target.src = `https://placehold.co/64x64/e0e0e0/000000?text=Pending`;
              }}
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg sm:text-xl">
                {prop.name}
              </h3>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline text-cyan-600 font-medium text-base sm:text-lg">
                <span>{prop.offerPercentage.toFixed(0)}% Offered</span>
                <span>Offer: {formatCurrency(prop.offerValue)}</span>{" "}
              </div>
              <ProgressBar progress={prop.offerPercentage} className="mt-2" />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No properties are offered to sell.</p>
      )}
    </div>
  );
};

export default OfferedTab;
