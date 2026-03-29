import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

// --- Mock Data pentru Notificări ---
const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'Urgent: Hot Meals Available', desc: 'Restaurant Casa has 20 hot meals ready for pickup now.', time: '5 min ago', unread: true, type: 'urgent' },
  { id: 2, title: 'Pickup Completed', desc: 'Successfully logged 15kg of bakery items.', time: '2 hours ago', unread: true, type: 'success' },
  { id: 3, title: 'Donation Canceled', desc: 'A donor canceled a scheduled pickup.', time: '1 day ago', unread: false, type: 'warning' },
];

const NotificationBell: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Logică pentru închiderea dropdown-ului când dai click în afara lui
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'urgent': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircleIcon className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <InformationCircleIcon className="w-5 h-5 text-orange-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Butonul Clopoțel */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 transition-colors relative rounded-xl ${
          isOpen ? (theme === 'light' ? 'bg-blue-50 text-blue-600' : 'bg-gray-800 text-blue-400') :
          (theme === 'light' ? 'text-gray-400 hover:text-blue-600 hover:bg-gray-50' : 'text-gray-500 hover:text-blue-400 hover:bg-gray-800')
        }`}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className={`absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ${
            theme === 'light' ? 'ring-white' : 'ring-gray-900'
          }`} />
        )}
      </button>

      {/* Dropdown-ul cu Notificări */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border overflow-hidden z-50 ${
              theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
            }`}
          >
            {/* Header Dropdown */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              theme === 'light' ? 'border-gray-100 bg-gray-50/50' : 'border-gray-700 bg-gray-900/50'
            }`}>
              <h3 className={`font-bold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                    theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                  }`}
                >
                  <CheckIcon className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            {/* Lista Notificărilor */}
            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`flex items-start gap-3 p-4 border-b transition-colors cursor-pointer ${
                      theme === 'light' ? 'border-gray-50 hover:bg-gray-50' : 'border-gray-700/50 hover:bg-gray-700/50'
                    } ${notification.unread ? (theme === 'light' ? 'bg-blue-50/30' : 'bg-blue-900/10') : ''}`}
                  >
                    <div className={`mt-0.5 p-2 rounded-full shrink-0 ${
                      theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-800'
                    }`}>
                      {getIconForType(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold mb-0.5 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                        {notification.title}
                      </h4>
                      <p className={`text-xs mb-1.5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {notification.desc}
                      </p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {notification.time}
                      </span>
                    </div>
                    {notification.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2"></span>
                    )}
                  </div>
                ))
              ) : (
                <div className={`p-6 text-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  No new notifications.
                </div>
              )}
            </div>
            
            {/* Footer Dropdown */}
<div className={`p-3 text-center border-t ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-gray-700 bg-gray-900/50'}`}>
  <Link 
    to="/notifications" 
    onClick={() => setIsOpen(false)} // Închidem meniul când dăm click
    className={`text-xs font-bold block w-full transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-200'}`}
  >
    View all history
  </Link>
</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;