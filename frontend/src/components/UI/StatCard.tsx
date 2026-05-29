import React from 'react';
import type { DashboardStats } from '../../_mock';

export interface StatCardProps {
  title?: string;
  value?: string | number;
  icon?: any;
  trend?: { value: number; isPositive: boolean };
  stat?: DashboardStats;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, stat }) => {
  const displayTitle = stat?.title ?? title;
  const displayValue = stat ? `${stat.value} ${stat.unit}` : value;
  const trendText = stat?.trend;

  return (
    <div className="p-5 border rounded-2xl shadow-sm bg-white border-gray-200/60 dark:bg-[#1a1a1a] dark:border-[#2e2e2e]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{displayTitle}</h3>
        {Icon && <Icon className="w-5 h-5 text-green-500" />}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{displayValue}</p>
      {trend && (
        <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}% from last month
        </p>
      )}
      {trendText && !trend && (
        <p className="text-xs mt-2 text-green-500">{trendText} {stat?.trendLabel}</p>
      )}
    </div>
  );
};

export default StatCard;
