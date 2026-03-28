import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
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

const NotificationHistory: React.FC = () => {
  const { theme } = useTheme();
  // Am adaugat mai multe filtre
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent' | 'security'>('all');

  const filteredNotifications = ALL_NOTIFICATIONS.filter(notif => {
    if (filter === 'unread') return notif.unread;
    if (filter === 'urgent') return notif.type === 'urgent';
    if (filter === 'security') return notif.type === 'security';
    return true;
  });

  // Funcție inteligentă care returnează iconița și culoarea potrivită
  const getIconForType = (type: string) => {
    switch (type) {
      case 'urgent': return <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />;
      case 'security': return <ShieldExclamationIcon className="w-6 h-6 text-purple-500" />;
      case 'team': return <UserPlusIcon className="w-6 h-6 text-indigo-500" />;
      case 'system': return <Cog8ToothIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />;
      case 'success': return <CheckCircleIcon className="w-6 h-6 text-emerald-500" />;
      case 'warning': return <InformationCircleIcon className="w-6 h-6 text-orange-500" />;
      default: return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <PageLayout>
      <div className={`w-full max-w-4xl mx-auto min-h-screen pb-12 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        {/* Header Pagina */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BellAlertIcon className={`w-8 h-8 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
              <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                Notification History
              </h1>
            </div>
            <p className={`text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              View all your past alerts, security updates, and messages.
            </p>
          </div>

          {/* Filtre */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border overflow-x-auto scrollbar-hide ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            <FunnelIcon className={`w-5 h-5 ml-2 mr-1 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            {(['all', 'unread', 'urgent', 'security'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-colors shrink-0 ${
                  filter === f 
                    ? (theme === 'light' ? 'bg-blue-50 text-blue-700' : 'bg-blue-900/40 text-blue-400')
                    : (theme === 'light' ? 'text-gray-500 hover:bg-gray-50' : 'text-gray-400 hover:bg-gray-700')
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Notificari */}
        <div className={`rounded-3xl border overflow-hidden shadow-sm ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filteredNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors ${
                    notif.unread ? (theme === 'light' ? 'bg-blue-50/30' : 'bg-blue-900/10') : ''
                  } hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer`}
                >
                  {/* Iconița Dinamică */}
                  <div className={`p-3 rounded-full shrink-0 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900/50'}`}>
                    {getIconForType(notif.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h3 className={`text-base font-bold flex items-center gap-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                        {notif.title}
                        {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
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