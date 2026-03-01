import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { MOCK_STATS } from '../_mock/dashboard';
import StatCard from '../components/UI/StatCard';
import ImpactCharts from '../components/ImpactCharts';
import RecentActivity from '../components/RecentActivity';

const DonorDashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`space-y-8 max-w-7xl mx-auto min-h-screen relative pb-10 ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    }`}>
      

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
          
          <button className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-xl shadow-lg shadow-blue-200/50 active:scale-[0.98] transition-all w-full md:w-auto">
             Download Report
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 animate-fade-in-up">
        {MOCK_STATS.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>


      <ImpactCharts />


      <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
         <RecentActivity />
      </div>

    </div>
  );
};

export default DonorDashboard;