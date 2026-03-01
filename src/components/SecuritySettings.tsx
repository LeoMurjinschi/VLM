import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const SecuritySettings: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-900/30 text-emerald-400'}`}>
          <ShieldCheckIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Security</h2>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`text-base font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Password</h4>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Last changed 3 months ago.</p>
        </div>
        <button className={`px-4 py-2 font-bold rounded-xl border transition-colors ${theme === 'light' ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'}`}>
          Update
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;