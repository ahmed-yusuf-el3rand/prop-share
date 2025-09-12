import formatCurrency from "../../utils/formatCurrency";
import {
  rentProfits,
  sellingProfits,
  propertySellingProfits,
} from "../../propertiesData";
import { DollarSign, Calendar } from "lucide-react";

const MoneyTab = () => {
  return (
    <>
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

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} />
          Month Profits Of (Renting/Selling) Props
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

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} />
          Month Payments Of (Rented/Purchased) Props
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

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Calendar size={20} />
          Upcoming Payments for Rented Props
        </h3>
        {propertySellingProfits.length > 0 ? (
          <ul className="space-y-2">
            {propertySellingProfits.map((propProfit, index) => (
              <li
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-700">
                  {propProfit.name}
                </span>

                <div className="flex sm:justify-end md:justify-center">
                  <span className="text-gray-500 font-semibold">
                    (4-1-2025)
                  </span>
                </div>
                <div className="flex sm:justify-end">
                  <span className="text-blue-600 font-semibold">
                    {formatCurrency(propProfit.profit)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">
            No upcoming payments to display.
          </p>
        )}
      </div>
    </>
  );
};

export default MoneyTab;
