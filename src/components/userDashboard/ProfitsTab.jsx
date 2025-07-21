import { formatCurrency } from "../../utils/formatCurrency";
import {
  rentProfits,
  sellingProfits,
  propertySellingProfits,
} from "../../propertiesData";
import { DollarSign } from "lucide-react";
const ProfitsTab = () => {
  return (
    <>
      {/* Total Profits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">Total Rent Profits:</p>
          <p className="text-3xl font-bold text-blue-600 break-words">
            {formatCurrency(rentProfits.total)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-800">Total Selling Profits:</p>
          <p className="text-3xl font-bold text-green-600 break-words">
            {formatCurrency(sellingProfits.total)}
          </p>
        </div>
      </div>

      {/* Last Payouts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">Last Rent Payout:</p>
          <p className="text-xl font-bold text-blue-600">
            {formatCurrency(rentProfits.lastPayout)}
          </p>
          <p className="text-xs text-blue-700 truncate">
            on {rentProfits.lastPayoutDate}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-800">Last Sell Payout:</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(sellingProfits.lastPayout)}
          </p>
          <p className="text-xs text-green-700 truncate">
            on {sellingProfits.lastPayoutDate}
          </p>
        </div>
      </div>

      {/* Profit Per Property (Rent) */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} /> Profits Of (Renting/Selling)
        </h3>
        {rentProfits.propertyProfits.length > 0 ? (
          <ul className="space-y-2">
            {rentProfits.propertyProfits.map((propProfit, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-700">
                  {propProfit.name}
                </span>
                <span className="text-blue-600 font-semibold mt-1 sm:mt-0">
                  + {formatCurrency(propProfit.profit)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">
            No property-specific rent profits to display.
          </p>
        )}
      </div>

      {/* Profit Per Property (Sell) */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} /> Payments Of (Rent/Purchasing)
        </h3>
        {propertySellingProfits.length > 0 ? (
          <ul className="space-y-2">
            {propertySellingProfits.map((propProfit, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-700">
                  {propProfit.name}
                </span>
                <span className="text-green-600 font-semibold mt-1 sm:mt-0">
                  - {formatCurrency(propProfit.profit)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">
            No property-specific selling profits to display.
          </p>
        )}
      </div>
    </>
  );
};
export default ProfitsTab;
