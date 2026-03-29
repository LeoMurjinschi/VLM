import React from 'react';
import { ArrowTrendingUpIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';
import AnimatedNumber from './AnimatedNumber';

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
      case 'blue': return isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-900/20 text-blue-400';
      case 'emerald': return isLight ? 'bg-green-50 text-[#16a34a]' : 'bg-green-900/20 text-green-400';
      case 'teal': return isLight ? 'bg-teal-50 text-teal-600' : 'bg-teal-900/20 text-teal-400';
      case 'indigo': return isLight ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/20 text-indigo-400';
      default: return isLight ? 'bg-gray-50 text-gray-600' : 'bg-gray-800 text-gray-400';
    }
  };

  const IconComponent = stat.icon || SparklesIcon;

  return (
    <div className={`p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
      theme === 'light' 
        ? 'bg-white border border-gray-200/80 shadow-sm hover:shadow-gray-200/60' 
        : 'bg-[#1a1a1a] border border-[#2e2e2e] shadow-sm hover:shadow-black/30'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${getColorClasses(stat.color)}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
          theme === 'light' ? 'bg-green-50 text-[#16a34a]' : 'bg-green-900/20 text-green-400'
        }`}>
          <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
          {stat.trend}
        </div>
      </div>
      <div>
        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {stat.title}
        </h3>
        <div className="flex items-baseline gap-1.5">
          <span className={`text-3xl font-bold tracking-tight ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`}>
            <AnimatedNumber value={stat.value} />
          </span>
          {stat.unit && <span className={`text-sm font-medium ${
            theme === 'light' ? 'text-gray-400' : 'text-gray-500'
          }`}>{stat.unit}</span>}
        </div>
      </div>
      <div className={`mt-3 pt-3 border-t text-xs font-medium ${
        theme === 'light' ? 'border-gray-100 text-gray-400' : 'border-[#2e2e2e] text-gray-500'
      }`}>
        {stat.trendLabel}
      </div>
    </div>
  );
};

export default StatCard;