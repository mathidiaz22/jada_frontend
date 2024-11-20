import { TrendingUp, TrendingDown } from "lucide-react";

const AnalyticsCard = ({ title, value, change, changeText }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span
          className={`flex items-center text-sm ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1">{change}%</span>
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{changeText}</p>
    </div>
  );
};

export default AnalyticsCard;
