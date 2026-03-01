import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { TrophyIcon } from '@heroicons/react/24/outline';

const MilestoneTracker: React.FC = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const currentAmount = 420;
  const targetAmount = 500;
  const targetPercentage = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const remainingAmount = targetAmount - currentAmount;


  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-6 animate-fade-in-up ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
    }`}>
      

      <div className={`p-4 rounded-full flex-shrink-0 shadow-inner ${
        theme === 'light' ? 'bg-amber-100 text-amber-500' : 'bg-amber-900/40 text-amber-400'
      }`}>
        <TrophyIcon className="w-10 h-10" />
      </div>


      <div className="flex-1 w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-3 gap-2">
          <div>
            <h3 className={`text-lg font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Monthly Goal: Community Hero Badge 🏅
            </h3>
            <p className={`text-sm font-medium mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              You've rescued <span className="font-bold">{currentAmount} kg</span> of food this month. 
              Only <span className="font-bold">{remainingAmount} kg</span> left to unlock your badge!
            </p>
          </div>
          <span className={`text-3xl font-black tracking-tight ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
            {progress}%
          </span>
        </div>


        <div className={`h-4 w-full rounded-full overflow-hidden relative ${
          theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'
        }`}>
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >

            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MilestoneTracker;