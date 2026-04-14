import React from 'react';
import { useTheme } from './../hooks/useTheme';
import type { User } from './../_mock';

interface ProfileSummaryProps {
  user: User;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-3xl border shadow-sm text-center ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-900 border-gray-700'}`}>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50">
          <img src={user.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h3 className={`text-lg font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{user.name}</h3>
        <span className="inline-block px-3 py-1 mt-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg uppercase tracking-wider">
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default ProfileSummary;