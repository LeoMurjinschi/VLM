import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  UsersIcon, GiftIcon, ShieldExclamationIcon,
  DocumentCheckIcon, ArrowRightIcon,
  CheckCircleIcon, XCircleIcon, TrashIcon, FlagIcon, NoSymbolIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_ADMIN_MONTHLY_DATA } from '../../_mock/adminMockData';
import { userService, type UserInfoDto } from '../../api/userService';
import { donationService, type DonationInfoDto } from '../../api/donationService';
import { adminActionService, type AdminActionInfoDto } from '../../api/adminActionService';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  activeDonations: number;
  pendingSignups: number;
}

const actionTypeMap: Record<string, { label: string; type: string }> = {
  approve_user:   { label: 'Signup Approved',      type: 'approve' },
  reject_user:    { label: 'Signup Rejected',       type: 'reject' },
  deactivate_user:{ label: 'Account Deactivated',   type: 'deactivate' },
  reactivate_user:{ label: 'Account Reactivated',   type: 'reactivate' },
  delete_review:  { label: 'Review Deleted',        type: 'delete' },
  flag_content:   { label: 'Content Flagged',       type: 'flag' },
};

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min${mins !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'approve':    return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case 'reject':     return <XCircleIcon className="w-5 h-5 text-red-500" />;
    case 'deactivate': return <NoSymbolIcon className="w-5 h-5 text-amber-500" />;
    case 'reactivate': return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
    case 'delete':     return <TrashIcon className="w-5 h-5 text-red-500" />;
    case 'flag':       return <FlagIcon className="w-5 h-5 text-orange-500" />;
    default:           return <CheckCircleIcon className="w-5 h-5 text-gray-500" />;
  }
};

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    activeDonations: 0,
    pendingSignups: 0,
  });
  const [activity, setActivity] = useState<AdminActionInfoDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, donations, actions] = await Promise.all([
          userService.getAll().catch((): UserInfoDto[] => []),
          donationService.getAll().catch((): DonationInfoDto[] => []),
          adminActionService.getAll().catch((): AdminActionInfoDto[] => []),
        ]);

        const nonAdmins = users.filter(u => u.role !== 'admin');
        setStats({
          totalUsers: nonAdmins.length,
          activeUsers: nonAdmins.filter(u => u.isActive).length,
          activeDonations: donations.filter(d => d.status === 'Available').length,
          pendingSignups: nonAdmins.filter(u => u.approvalStatus === 'pending').length,
        });
        setActivity(actions.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in-up">
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${
        theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
      }`}>
        <div>
          <h1 className={`text-3xl font-bold tracking-tight mb-2 ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`} style={{ fontFamily: 'var(--font-display)' }}>
            Admin Dashboard
          </h1>
          <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
            Overview of platform activity, user growth, and moderation alerts.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border flex flex-col ${
          theme === 'light' ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Total Users</span>
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
              <UsersIcon className="w-5 h-5" />
            </div>
          </div>
          <span className={`text-3xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {loading ? '—' : stats.totalUsers}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
            <span className="text-blue-500 font-medium">{loading ? '—' : stats.activeUsers} Active</span>
          </span>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col ${
          theme === 'light' ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Active Donations</span>
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-green-50 text-green-600' : 'bg-green-500/10 text-green-400'}`}>
              <GiftIcon className="w-5 h-5" />
            </div>
          </div>
          <span className={`text-3xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            {loading ? '—' : stats.activeDonations}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
            Available on the platform
          </span>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col ${
          theme === 'light' ? 'bg-violet-50 border-violet-100 shadow-sm' : 'bg-violet-500/10 border-violet-500/20'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-semibold ${theme === 'light' ? 'text-violet-600' : 'text-violet-300'}`}>Pending Sign-Ups</span>
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-violet-100 text-violet-700' : 'bg-violet-500/20 text-violet-300'}`}>
              <DocumentCheckIcon className="w-5 h-5" />
            </div>
          </div>
          <span className={`text-3xl font-bold mb-1 ${theme === 'light' ? 'text-violet-900' : 'text-violet-100'}`}>
            {loading ? '—' : stats.pendingSignups}
          </span>
          <span className={`text-xs mt-auto font-medium ${theme === 'light' ? 'text-violet-500' : 'text-violet-400'}`}>
            Requires review
          </span>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col ${
          theme === 'light' ? 'bg-amber-50 border-amber-100 shadow-sm' : 'bg-amber-500/10 border-amber-500/20'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-sm font-semibold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>Flagged Content</span>
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-amber-100 text-amber-600' : 'bg-amber-500/20 text-amber-400'}`}>
              <ShieldExclamationIcon className="w-5 h-5" />
            </div>
          </div>
          <span className={`text-3xl font-bold mb-1 ${theme === 'light' ? 'text-amber-900' : 'text-amber-200'}`}>
            —
          </span>
          <span className={`text-xs mt-auto font-medium ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>
            Issues reported
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Column */}
        <div className={`lg:col-span-2 p-5 sm:p-6 rounded-2xl border ${
          theme === 'light' ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <h2 className={`text-lg font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Platform Growth (Last 6 Months)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ADMIN_MONTHLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'light' ? '#f3f4f6' : '#2e2e2e'} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: theme === 'light' ? '#6b7280' : '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: theme === 'light' ? '#6b7280' : '#9ca3af', fontSize: 12}} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'light' ? '#fff' : '#1f2937',
                    borderRadius: '12px',
                    border: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #374151',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: theme === 'light' ? '#111827' : '#f9fafb', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="donations" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorDonations)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Log */}
        <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col ${
          theme === 'light' ? 'bg-white border-gray-100 shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Recent Activity</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
            {loading ? (
              <p className={`text-sm text-center py-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</p>
            ) : activity.length === 0 ? (
              <p className={`text-sm text-center py-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>No activity yet.</p>
            ) : activity.map((action, index) => {
              const mapped = actionTypeMap[action.actionType] ?? { label: action.actionType, type: 'approve' };
              return (
                <div key={action.id} className="relative flex gap-4">
                  {index !== activity.length - 1 && (
                    <div className={`absolute top-8 bottom-[-20px] left-[11px] w-[2px] ${
                      theme === 'light' ? 'bg-gray-100' : 'bg-[#2e2e2e]'
                    }`}></div>
                  )}
                  <div className="relative z-10 flex-shrink-0 bg-transparent pt-1">
                    {getActivityIcon(mapped.type)}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                      {mapped.label}
                    </span>
                    <span className={`text-xs mt-0.5 leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {action.details}
                    </span>
                    <span className={`text-[10px] font-semibold mt-1.5 uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatRelativeTime(action.createdDate)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className={`text-lg font-bold pt-4 mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/signups" className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
          theme === 'light' ? 'bg-white border-gray-100 hover:border-violet-300 hover:shadow-md' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-violet-500/50'
        }`}>
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-violet-500/10 text-violet-400'}`}>
                <DocumentCheckIcon className="w-5 h-5" />
             </div>
             <span className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Review Sign-Ups</span>
          </div>
          <ArrowRightIcon className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
        </Link>
        <Link to="/admin/donations" className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
          theme === 'light' ? 'bg-white border-gray-100 hover:border-amber-300 hover:shadow-md' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-amber-500/50'
        }`}>
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-amber-50 text-amber-600' : 'bg-amber-500/10 text-amber-400'}`}>
                <ShieldExclamationIcon className="w-5 h-5" />
             </div>
             <span className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Moderate Feed</span>
          </div>
          <ArrowRightIcon className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
        </Link>
        <Link to="/admin/accounts" className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
          theme === 'light' ? 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-md' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-blue-500/50'
        }`}>
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
                <UsersIcon className="w-5 h-5" />
             </div>
             <span className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>Manage Accounts</span>
          </div>
          <ArrowRightIcon className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
        </Link>
      </div>

    </div>
  );
};

export default AdminDashboard;
