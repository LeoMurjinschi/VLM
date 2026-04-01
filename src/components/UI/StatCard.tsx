import React from 'react';

interface StatCardProps {
  title?: string;
  value?: string | number;
  icon?: any;
  trend?: { value: number; isPositive: boolean };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-green-500" />}
      </div>
      <p className="text-2xl font-bold dark:text-white">{value}</p>
      {trend && (
        <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}% from last month
        </p>
      )}
    </div>
  );
};

export default StatCard;
