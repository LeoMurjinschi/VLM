import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/PageLayout';
import { 
  BellAlertIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  FunnelIcon,
  ShieldExclamationIcon, // Pentru alerte de securitate (Logări)
  UserPlusIcon,          // Pentru echipa
  Cog8ToothIcon          // Pentru setari sistem
} from '@heroicons/react/24/outline';

// Date mock mult mai complexe, acoperind toate aspectele aplicației
const ALL_NOTIFICATIONS = [
  { id: 1, title: 'Urgent: Hot Meals Available', desc: 'Restaurant Casa has 20 hot meals ready for pickup now. They need to be picked up in the next hour.', time: '5 min ago', date: 'Today', unread: true, type: 'urgent' },
  { id: 2, title: 'New Device Login', desc: 'We noticed a new login from Google Chrome on Windows (Bucharest). If this wasn\'t you, change your password immediately.', time: '1 hour ago', date: 'Today', unread: true, type: 'security' },
  { id: 3, title: 'Pickup Completed', desc: 'Successfully logged 15kg of bakery items from Panaderia.', time: '2 hours ago', date: 'Today', unread: true, type: 'success' },
  { id: 4, title: 'Team Member Added', desc: 'Maria P. has accepted your invitation and joined your authorized volunteer fleet.', time: '5 hours ago', date: 'Today', unread: false, type: 'team' },
  { id: 5, title: 'Donation Canceled', desc: 'A donor canceled a scheduled pickup for 10 portions of soup.', time: '1 day ago', date: 'Yesterday', unread: false, type: 'warning' },
  { id: 6, title: 'Password Updated', desc: 'Your account password was successfully changed from the Settings page.', time: '2 days ago', date: 'Oct 25', unread: false, type: 'system' },
  { id: 7, title: 'Weekly Summary', desc: 'You rescued 120kg of food this week. Great job, FoodHero!', time: '3 days ago', date: 'Oct 24', unread: false, type: 'info' },
  { id: 8, title: 'System Maintenance', desc: 'The app will be offline for 30 minutes tonight at 2 AM for server upgrades.', time: '1 week ago', date: 'Oct 18', unread: false, type: 'system' },
];

const ADMIN_NOTIFICATIONS = [
  { id: 101, title: 'New Sign-Up Request', desc: 'Mishanea SRL submitted an NGO application.', time: '5 min ago', date: 'Today', unread: true, type: 'warning' },
  { id: 102, title: 'Donation Flagged', desc: 'A donation from Andrei M. was flagged by users. Immediate review required.', time: '1 hour ago', date: 'Today', unread: true, type: 'urgent' },
  { id: 103, title: 'Review Reported', desc: 'A recent review violates community standards.', time: '2 hours ago', date: 'Today', unread: false, type: 'security' },
  { id: 104, title: 'System Maintenance', desc: 'The database backup completed successfully.', time: '1 day ago', date: 'Yesterday', unread: false, type: 'system' }
];

const NotificationHistory: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [notifications, setNotifications] = useState(isAdmin ? ADMIN_NOTIFICATIONS : ALL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent' | 'security'>('all');

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return notif.unread;
    if (filter === 'urgent') return notif.type === 'urgent';
    if (filter === 'security') return notif.type === 'security';
    return true;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  // Funcție inteligentă care returnează iconița și culoarea potrivită
  const getIconForType = (type: string) => {
    switch (type) {
      case 'urgent': return <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />;
      case 'security': return <ShieldExclamationIcon className="w-6 h-6 text-purple-500" />;
      case 'team': return <UserPlusIcon className="w-6 h-6 text-indigo-500" />;
      case 'system': return <Cog8ToothIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />;
      case 'success': return <CheckCircleIcon className="w-6 h-6 text-emerald-500" />;
      case 'warning': return <InformationCircleIcon className="w-6 h-6 text-orange-500" />;
      default: return <InformationCircleIcon className={`w-6 h-6 ${isAdmin ? 'text-[#8b5cf6]' : 'text-[#16a34a]'}`} />;
    }
  };

  return (
    <PageLayout>
      <div className={`w-full max-w-4xl mx-auto min-h-screen pb-12 bg-transparent`}>
        
        {/* Header Pagina */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BellAlertIcon className={`w-8 h-8 ${theme === 'light' ? (isAdmin ? 'text-[#8b5cf6]' : 'text-[#16a34a]') : (isAdmin ? 'text-violet-400' : 'text-green-400')}`} />
            <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Notification History
            </h1>
          </div>
          <p className={`text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            View all your past alerts, security updates, and messages.
          </p>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Pills Wrapper */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border overflow-x-auto scrollbar-hide ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
            <FunnelIcon className={`w-5 h-5 ml-2 mr-1 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            {(['all', 'unread', 'urgent', 'security'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all shrink-0 ${
                  filter === f 
                    ? `${isAdmin ? 'bg-[#8b5cf6]' : 'bg-[#16a34a]'} text-white shadow-md`
                    : (theme === 'light' ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-400 hover:bg-[#222222] hover:text-gray-200')
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Mark as read button */}
          {notifications.some(n => n.unread) && (
            <button 
              onClick={markAllAsRead}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                isAdmin 
                  ? 'bg-[#8b5cf6]/10 text-[#8b5cf6] hover:bg-[#8b5cf6]/20 border border-[#8b5cf6]/20'
                  : 'bg-[#16a34a]/10 text-[#16a34a] hover:bg-[#16a34a]/20 border border-[#16a34a]/20'
              }`}
            >
              <CheckCircleIcon className="w-5 h-5" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Lista de Notificari */}
        <div className={`rounded-3xl border overflow-hidden shadow-sm ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
          {filteredNotifications.length > 0 ? (
            <div className={`divide-y ${theme === 'light' ? 'divide-gray-100' : 'divide-[#2e2e2e]'}`}>
              {filteredNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => markAsRead(notif.id)}
                  className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors ${
                    notif.unread ? (theme === 'light' ? (isAdmin ? 'bg-[#8b5cf6]/5' : 'bg-[#16a34a]/5') : (isAdmin ? 'bg-[#8b5cf6]/10' : 'bg-[#16a34a]/10')) : ''
                  } hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer`}
                >
                  {/* Iconița Dinamică */}
                  <div className={`p-3 rounded-full shrink-0 ${theme === 'light' ? 'bg-gray-50' : 'bg-[#222222]'}`}>
                    {getIconForType(notif.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className={`text-base font-bold flex items-center gap-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                        {notif.title}
                        {notif.unread && <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-[#8b5cf6]' : 'bg-[#16a34a]'}`}></span>}
                      </h3>
                      <span className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {notif.date} • {notif.time}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {notif.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <BellAlertIcon className={`w-12 h-12 mx-auto mb-4 opacity-20 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} />
              <h3 className={`text-lg font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>No notifications found</h3>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Try changing your filters.</p>
            </div>
          )}
        </div>

      </div>
    </PageLayout>
  );
};

export default NotificationHistory;