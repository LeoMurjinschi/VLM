import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

// --- Mock Data pentru Notificări ---
const getMockNotifications = (role?: string | null) => {
  if (role === 'admin') {
    return [
      { id: 1, title: 'New Sign-Up Request', desc: 'Mishanea SRL submitted an NGO application.', time: '5 min ago', unread: true, type: 'warning', link: '/admin/signups' },
      { id: 2, title: 'Donation Flagged', desc: 'A donation from Andrei M. was flagged.', time: '1 hour ago', unread: true, type: 'urgent', link: '/admin/donations' },
      { id: 3, title: 'Review Reported', desc: 'A recent review violates community standards.', time: '2 hours ago', unread: false, type: 'warning', link: '/admin/reviews' },
    ];
  }
  const basePath = role === 'donor' ? '/donor' : '/receiver';
  return [
    { id: 1, title: 'Urgent: Hot Meals Available', desc: 'Restaurant Casa has 20 hot meals ready.', time: '5 min ago', unread: true, type: 'urgent', link: `${basePath}/dashboard` },
    { id: 2, title: 'Pickup Completed', desc: 'Successfully logged 15kg of bakery items.', time: '2 hours ago', unread: true, type: 'success', link: `${basePath}/history` },
    { id: 3, title: 'Donation Canceled', desc: 'A scheduled pickup was canceled.', time: '1 day ago', unread: false, type: 'warning', link: `${basePath}/dashboard` },
  ];
};

const NotificationBell: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(getMockNotifications(user?.role));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.role === 'admin';
  const basePath = isAdmin ? '/admin' : (user?.role === 'donor' ? '/donor' : '/receiver');
  const notificationsUrl = `${basePath}/notifications`;

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

  const handleNotificationClick = (link: string, id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
    setIsOpen(false);
    navigate(link);
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
          isOpen ? (theme === 'light' ? (isAdmin ? 'bg-[#8b5cf6]/10 text-[#8b5cf6]' : 'bg-[#16a34a]/10 text-[#16a34a]') : (isAdmin ? 'bg-[#1a1a1a] text-[#8b5cf6]' : 'bg-[#1a1a1a] text-[#16a34a]')) :
          (theme === 'light' ? `text-gray-400 hover:bg-gray-50 ${isAdmin ? 'hover:text-[#8b5cf6]' : 'hover:text-[#16a34a]'}` : `text-gray-500 hover:bg-[#1a1a1a] ${isAdmin ? 'hover:text-[#8b5cf6]' : 'hover:text-[#16a34a]'}`)
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
              theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-gray-800'
            }`}
          >
            {/* Header Dropdown */}
            <div className={`flex items-center justify-between px-4 py-3 border-b ${
              theme === 'light' ? 'border-gray-100 bg-gray-50/50' : 'border-gray-800 bg-[#1a1a1a]'
            }`}>
              <h3 className={`font-bold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className={`flex items-center gap-1 text-xs font-bold transition-colors ${
                    theme === 'light' 
                      ? (isAdmin ? 'text-[#8b5cf6] hover:text-violet-700' : 'text-[#16a34a] hover:text-green-700') 
                      : (isAdmin ? 'text-[#8b5cf6] hover:text-violet-400' : 'text-[#16a34a] hover:text-green-400')
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
                    onClick={() => handleNotificationClick(notification.link, notification.id)}
                    className={`flex items-start gap-3 p-4 border-b transition-colors cursor-pointer ${
                      theme === 'light' ? 'border-gray-50 hover:bg-gray-50' : 'border-gray-800 hover:bg-[#222222]'
                    } ${notification.unread ? (theme === 'light' ? (isAdmin ? 'bg-[#8b5cf6]/5' : 'bg-[#16a34a]/5') : (isAdmin ? 'bg-[#8b5cf6]/10' : 'bg-[#16a34a]/10')) : ''}`}
                  >
                    <div className={`mt-0.5 p-2 rounded-full shrink-0 ${
                      theme === 'light' ? 'bg-white shadow-sm' : 'bg-[#1a1a1a]'
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
                      <span className={`w-2 h-2 rounded-full shrink-0 mt-2 ${isAdmin ? 'bg-[#8b5cf6]' : 'bg-[#16a34a]'}`}></span>
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
<div className={`p-3 text-center border-t ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-gray-800 bg-[#1a1a1a]'}`}>
  <Link 
    to={notificationsUrl} 
    onClick={() => setIsOpen(false)} // Închidem meniul când dăm click
    className={`text-xs font-bold block w-full transition-colors ${
      theme === 'light' 
        ? (isAdmin ? 'text-[#8b5cf6] hover:text-violet-700' : 'text-[#16a34a] hover:text-green-700') 
        : (isAdmin ? 'text-[#8b5cf6] hover:text-violet-400' : 'text-[#16a34a] hover:text-green-400')
    }`}
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