import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { TrophyIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Milestone } from './MilestoneModal';

interface MilestoneTrackerProps {
  milestone: Milestone;
  onEdit: (milestone: Milestone) => void;
  onDelete: (id: string) => void;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestone, onEdit, onDelete }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);

  const targetPercentage = Math.min(Math.round((milestone.currentAmount / milestone.targetAmount) * 100), 100);
  const remainingAmount = milestone.targetAmount - milestone.currentAmount;

  useEffect(() => {

    setProgress(0);
    const timer = setTimeout(() => setProgress(targetPercentage), 100);
    return () => clearTimeout(timer);
  }, [targetPercentage, milestone]);

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-6 animate-fade-in-up relative group ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'
    }`}>
      

      <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(milestone)} className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600' : 'bg-gray-700 hover:bg-blue-900/50 text-gray-400 hover:text-blue-400'}`}>
          <PencilIcon className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(milestone.id)} className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600' : 'bg-gray-700 hover:bg-red-900/50 text-gray-400 hover:text-red-400'}`}>
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className={`p-4 rounded-full flex-shrink-0 shadow-inner ${theme === 'light' ? 'bg-amber-100 text-amber-500' : 'bg-amber-900/40 text-amber-400'}`}>
        <TrophyIcon className="w-10 h-10" />
      </div>

      <div className="flex-1 w-full mt-2 md:mt-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-3 gap-2 pr-16 md:pr-0">
          <div>
            <h3 className={`text-lg font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              {milestone.title}: {milestone.reward}
            </h3>
            <p className={`text-sm font-medium mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              You've rescued <span className="font-bold">{milestone.currentAmount} kg</span>. 
              {remainingAmount > 0 
                ? ` Only ${remainingAmount} kg left to unlock your badge!` 
                : ' Goal Completed! 🎉'}
            </p>
          </div>
          <span className={`text-3xl font-black tracking-tight ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
            {progress}%
          </span>
        </div>

        <div className={`h-4 w-full rounded-full overflow-hidden relative ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
          <div className={`h-full transition-all duration-1000 ease-out relative ${progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-emerald-400'}`} style={{ width: `${progress}%` }}>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;