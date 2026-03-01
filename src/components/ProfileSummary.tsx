import React from 'react';
import { useTheme } from './../hooks/useTheme';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import type { User } from './../_mock';

interface ProfileSummaryProps {
  user: User;
  onLogout: () => void;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user, onLogout }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-3xl border shadow-sm text-center ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'}`}>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50">
          <img src={user.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h3 className={`text-lg font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{user.name}</h3>
        <span className="inline-block px-3 py-1 mt-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg uppercase tracking-wider">
          {user.role}
        </span>
      </div>

      <button 
        onClick={onLogout}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-xl transition-colors ${
          theme === 'light' ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
        }`}
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileSummary;