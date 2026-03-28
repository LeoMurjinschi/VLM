import React from 'react';
import { ArrowTrendingUpIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

interface StatCardProps {
  stat: {
    title: string; value: string; unit: string; trend: string; trendLabel: string;
    icon?: React.ElementType; color: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { theme } = useTheme();

  const getColorClasses = (colorName: string) => {
    const isLight = theme === 'light';
    switch (colorName) {
      case 'blue': return isLight ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/40 text-blue-400';
      case 'emerald': return isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/40 text-emerald-400';
      case 'teal': return isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-900/40 text-teal-400';
      case 'indigo': return isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/40 text-indigo-400';
      default: return isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-900 text-gray-400';
    }
  };

  const IconComponent = stat.icon || SparklesIcon;

  return (
    <div className={`p-6 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${getColorClasses(stat.color)}`}>
          <IconComponent className="w-7 h-7" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
          theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'
        }`}>
          <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
          {stat.trend}
        </div>
      </div>
      <div>
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          {stat.title}
        </h3>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-3xl md:text-4xl font-extrabold tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            {stat.value}
          </span>
          {stat.unit && <span className={`text-lg font-bold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.unit}</span>}
        </div>
      </div>
      <div className={`mt-4 pt-4 border-t text-xs font-medium ${theme === 'light' ? 'border-gray-50 text-gray-400' : 'border-gray-700 text-gray-500'}`}>
        {stat.trendLabel}
      </div>
    </div>
  );
};

export default StatCard;