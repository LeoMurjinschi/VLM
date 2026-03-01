import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { CheckCircleIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { RECENT_ACTIVITY } from './../_mock/dashboard';

const RecentActivity: React.FC = () => {
  const { theme } = useTheme();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <StarIcon className="w-5 h-5 text-amber-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up delay-200 ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
    }`}>
      <h3 className={`text-xl font-extrabold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
        Recent Activity
      </h3>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-600 before:to-transparent">
        {RECENT_ACTIVITY.map((activity) => (
          <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            

            <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white dark:bg-gray-800 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
               theme === 'light' ? 'border-white' : 'border-gray-800'
            }`}>
              {getIcon(activity.type)}
            </div>
            

            <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-2xl border transition-all hover:shadow-md ${
              theme === 'light' ? 'bg-gray-50 border-gray-100 hover:border-blue-200' : 'bg-gray-700/50 border-gray-600 hover:border-blue-800'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <h4 className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{activity.action}</h4>
                <time className={`text-xs font-bold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</time>
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{activity.detail}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;