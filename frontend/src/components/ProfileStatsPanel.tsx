import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { ChartBarIcon, GiftIcon, ArchiveBoxIcon, UsersIcon } from '@heroicons/react/24/outline';
import { userStatisticsService } from '../api';
import type { UserStatisticsDto } from '../api/userStatisticsService';

interface ProfileStatsPanelProps {
  userId: number;
  role: string;
}

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

const ProfileStatsPanel: React.FC<ProfileStatsPanelProps> = ({ userId, role }) => {
  const { theme } = useTheme();
  const [stats, setStats] = useState<UserStatisticsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    userStatisticsService.getByUser(userId)
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [userId]);

  const buildItems = (): StatItem[] => {
    if (!stats) return [];
    if (role === 'donor') {
      return [
        { label: 'Total Donated', value: `${stats.totalDonated}`, icon: GiftIcon },
        { label: 'Donations Made', value: stats.totalDonations, icon: ArchiveBoxIcon },
        { label: 'Active Donations', value: stats.activeDonations, icon: ChartBarIcon },
      ];
    }
    if (role === 'receiver') {
      return [
        { label: 'Total Reserved', value: `${stats.totalReserved}`, icon: ArchiveBoxIcon },
        { label: 'Reservations', value: stats.totalReservations, icon: GiftIcon },
        { label: 'Active Reservations', value: stats.activeReservations, icon: ChartBarIcon },
      ];
    }
    // admin
    return [
      { label: 'Total Users', value: stats.totalUsers, icon: UsersIcon },
      { label: 'Platform Donations', value: stats.totalPlatformDonations, icon: GiftIcon },
    ];
  };

  const items = buildItems();

  return (
    <div className={`p-6 md:p-8 rounded-3xl border shadow-sm ${theme === 'light' ? 'bg-white border-gray-200/60' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'}`}>
          <ChartBarIcon className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>Your Impact</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-24">
          <div className="w-6 h-6 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>No statistics available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className={`p-5 rounded-2xl border ${theme === 'light' ? 'bg-gray-50/80 border-gray-200' : 'bg-[#222222] border-[#2e2e2e]'}`}>
                <div className={`inline-flex p-2 rounded-lg mb-3 ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className={`text-2xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{item.value}</p>
                <p className={`text-xs font-medium mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileStatsPanel;
