import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { MOCK_STATS, BAR_DATA } from '../_mock/dashboard'; 
import StatCard from '../components/UI/StatCard';
import ImpactCharts from '../components/ImpactCharts';
import RecentActivity from '../components/RecentActivity';
import { toast } from 'react-toastify';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'; 

const DonorDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);


  const handleDownloadReport = () => {
    setIsDownloading(true);


    setTimeout(() => {
      try {

        const headers = "Month,Donations (kg)\n";
        const rows = BAR_DATA.map(item => `${item.name},${item.donations}`).join('\n');
        const csvContent = headers + rows;


        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);


        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `FoodShare_Impact_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

  
        toast.success('Report downloaded successfully! 📊');
      } catch (error) {
        toast.error('Failed to generate report.');
      } finally {
        setIsDownloading(false);
      }
    }, 1000);
  };

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
          

          <button 
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className={`flex items-center justify-center gap-2 px-6 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] w-full md:w-auto ${
              isDownloading 
                ? 'bg-blue-400 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200/50'
            }`}
          >
             {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
             ) : (
                <>
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Download Report</span>
                </>
             )}
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