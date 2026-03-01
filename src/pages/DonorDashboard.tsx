import React from 'react';
import { 
  HeartIcon, 
  GlobeEuropeAfricaIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

// Date mockuite pentru statistici (mai târziu pot fi calculate din Context)
const MOCK_STATS = [
  {
    title: 'Total Food Rescued',
    value: '1,250',
    unit: 'kg',
    trend: '+12%',
    trendLabel: 'vs last month',
    icon: HeartIcon,
    color: 'blue',
  },
  {
    title: 'Meals Provided',
    value: '3,420',
    unit: 'portions',
    trend: '+8%',
    trendLabel: 'vs last month',
    icon: ChartBarIcon,
    color: 'emerald',
  },
  {
    title: 'CO₂ Emissions Saved',
    value: '3,125',
    unit: 'kg',
    trend: '+15%',
    trendLabel: 'vs last month',
    icon: GlobeEuropeAfricaIcon,
    color: 'teal',
  },
  {
    title: 'Value Donated',
    value: '€4,500',
    unit: '',
    trend: '+5%',
    trendLabel: 'vs last month',
    icon: CurrencyDollarIcon,
    color: 'indigo',
  }
];

const DonorDashboard: React.FC = () => {
  const { theme } = useTheme();

  // O funcție ajutătoare pentru a genera culorile iconițelor dinamic
  const getColorClasses = (colorName: string) => {
    const isLight = theme === 'light';
    switch (colorName) {
      case 'blue': return isLight ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/40 text-blue-400';
      case 'emerald': return isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900/40 text-emerald-400';
      case 'teal': return isLight ? 'bg-teal-100 text-teal-600' : 'bg-teal-900/40 text-teal-400';
      case 'indigo': return isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/40 text-indigo-400';
      default: return isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-400';
    }
  };

  return (
    <div className={`space-y-8 max-w-7xl mx-auto min-h-screen relative pb-10 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      
      {/* HEADER PAGINĂ */}
      <div className={`pb-6 border-b relative z-20 ${
        theme === 'light' ? 'border-gray-100' : 'border-gray-700'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-100'
            }`}>
              Donor Impact Dashboard
            </h1>
            <p className={`text-base md:text-lg leading-relaxed ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Track your contribution to reducing food waste and helping the community.
            </p>
          </div>
          
          {/* Un buton rapid de acțiune (opțional) */}
          <button className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-xl shadow-lg shadow-blue-200/50 active:scale-[0.98] transition-all w-full md:w-auto">
             Download Report
          </button>
        </div>
      </div>

      {/* COMPONENTA 1: GRID-UL DE STATISTICI (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in-up">
        {MOCK_STATS.map((stat, index) => (
          <div 
            key={index}
            className={`p-6 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1 ${
              theme === 'light' 
                ? 'bg-white border-gray-100' 
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${
                theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'
              }`}>
                <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                {stat.trend}
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {stat.title}
              </h3>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
                  theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                }`}>
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className={`text-lg font-bold ${
                    theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t text-xs font-medium ${
              theme === 'light' ? 'border-gray-50 text-gray-400' : 'border-gray-700 text-gray-500'
            }`}>
              {stat.trendLabel}
            </div>
          </div>
        ))}
      </div>

      {/* Aici vor urma Componentele 2 și 3 (Graficele și Activitatea Recentă) */}
      <div className="mt-8">
        <div className={`p-10 text-center rounded-3xl border border-dashed ${
          theme === 'light' ? 'border-gray-300 text-gray-500' : 'border-gray-600 text-gray-400'
        }`}>
          [Aici vom adăuga Graficele de activitate...]
        </div>
      </div>

    </div>
  );
};

export default DonorDashboard;