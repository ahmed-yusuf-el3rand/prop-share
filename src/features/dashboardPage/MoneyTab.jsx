import { DollarSign } from "lucide-react";
import { useMoney } from "../../hooks/useMoney";
import { useAuth } from "../../context/AuthContext";
import formatCurrency from "../../utils/formatCurrency";

const MoneyTab = () => {
  const { user } = useAuth();
  const { data: moneyData = {}, isLoading, error } = useMoney(user?.id);

  if (isLoading)
    return <p className="text-center">Loading your money data...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Failed to load your money data.
      </p>
    );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Total Selling Profits:</p>
          <p className="text-3xl font-bold text-green-600 break-words">
            {formatCurrency(moneyData?.sellingProfits?.total)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Last Sell Payout:</p>
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(moneyData.sellingProfits.lastPayout)}
          </p>
          <p className="text-xs text-green-600 truncate">
            on {moneyData?.sellingProfits?.lastPayoutDate}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} />
          Monthly Profits of Sold Properties
        </h3>
        {moneyData?.profits?.length > 0 ? (
          <ul className="space-y-2">
            {moneyData.profits.map((profit) => (
              <li
                key={profit.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-700">{profit.name}</span>
                <span className="text-green-600 font-semibold mt-1 sm:mt-0">
                  + {formatCurrency(profit.value)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">
            You don't have any profits yet.
          </p>
        )}
      </div>

      <div className="my-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <DollarSign size={20} />
          Monthly Payments Of Purchased Props
        </h3>
        {moneyData?.payments?.length > 0 ? (
          <ul className="space-y-2">
            {moneyData?.payments?.map((payment) => (
              <li
                key={payment.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-3 rounded-md"
              >
                <span className="font-medium text-gray-700">
                  {payment.name}
                </span>
                <span className="text-red-600 font-semibold mt-1 sm:mt-0">
                  - {formatCurrency(payment.value)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">
            You don't have any payments yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MoneyTab;
