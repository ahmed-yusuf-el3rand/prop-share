import { ownedProperties } from "../../propertiesData";
import formatCurrency from "../../utils/formatCurrency";
import ProgressBar from "../../components/common/ProgressBar";
import { useNavigate } from "react-router-dom";

const OwnedTab = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      {ownedProperties.length > 0 ? (
        ownedProperties.map((prop) => (
          <div
            key={prop.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => navigate(`/properties/${prop.id}`)}
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
                <span>{prop.percentageHeld}% Held</span>
                <span>Share: {formatCurrency(prop.value)}</span>
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
