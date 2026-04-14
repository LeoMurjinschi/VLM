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
      <div className={`p-6 rounded-3xl border shadow-sm text-center ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#16a34a]/20 dark:border-[#16a34a]/30">
          <img src={user.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>{user.name}</h3>
        <span className={`inline-block px-3 py-1 mt-2 text-xs font-bold rounded-lg uppercase tracking-wider ${theme === 'light' ? 'text-[#16a34a] bg-[#16a34a]/10' : 'bg-[#16a34a]/20 text-green-400'}`}>
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default ProfileSummary;