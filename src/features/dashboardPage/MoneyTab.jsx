import formatCurrency from "../../utils/formatCurrency";
import { DollarSign } from "lucide-react";
import {
  rentProfits,
  sellingProfits,
  propertySellingProfits,
} from "../../propertiesData";

const MoneyTab = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Total Selling Profits:</p>
          <p className="text-3xl font-bold text-green-600 break-words">
            {formatCurrency(sellingProfits.total)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Last Sell Payout:</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(sellingProfits.lastPayout)}
          </p>
          <p className="text-xs text-green-600 truncate">
            on {sellingProfits.lastPayoutDate}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} />
          Monthly Profits of Sold Properties
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
                <span className="text-green-600 font-semibold mt-1 sm:mt-0">
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

      <div className="my-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} />
          Monthly Payments Of Purchased Props
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
                <span className="text-red-600 font-semibold mt-1 sm:mt-0">
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
    </div>
  );
};

export default MoneyTab;
