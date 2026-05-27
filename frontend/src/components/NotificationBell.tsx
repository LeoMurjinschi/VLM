import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationService } from '../api/notificationService';
import type { NotificationInfoDto } from '../api/types'; 
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
import { adminService } from '../api/adminService';
import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  CheckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface AppNotification {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: string;
  link: string;
}

const getMockNotifications = (role?: string | null): AppNotification[] => {
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
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationInfoDto[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      adminService.getPendingUsers()
        .then(pending => {
          const notifs: AppNotification[] = [];
          if (pending.length > 0) {
            notifs.push({
              id: 1,
              title: `${pending.length} Pending Sign-Up${pending.length !== 1 ? 's' : ''}`,
              desc: `${pending.length} organization application${pending.length !== 1 ? 's' : ''} awaiting your review.`,
              time: 'Pending',
              unread: true,
              type: 'warning',
              link: '/admin/signups',
            });
          }
          setNotifications(notifs);
        })
        .catch(() => setNotifications([]));
    } else {
      setNotifications(getMockNotifications(user?.role));
    }
  }, [user?.role, location.pathname]);

  const isAdmin = user?.role === 'admin';
  const basePath = isAdmin ? '/admin' : (user?.role === 'donor' ? '/donor' : '/receiver');
  const notificationsUrl = `${basePath}/notifications`;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const loadNotifications = async () => {
    if (!user?.id) return;
    try {
      const data = await notificationService.getByUser(Number(user.id));
      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); 
    return () => clearInterval(interval);
  }, [user?.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    for (const n of unread) {
        await notificationService.markAsRead(n.id);
    }
    await loadNotifications();
  };

  const handleNotificationClick = async (link: string, id: number) => {
    await notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const markAllAsRead = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (link: string, id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setIsOpen(false);
    navigate(link);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'urgent_donation': return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case 'security': return <ShieldCheckIcon className="w-5 h-5 text-blue-500" />;
      case 'success': return <CheckCircleIcon className="w-5 h-5 text-emerald-500" />;
      case 'warning': return <InformationCircleIcon className="w-5 h-5 text-orange-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
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

            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
              {notifications.length > 0 ? (
                notifications.slice(0, 3).map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.link, notification.id)}
                    className={`flex items-start gap-3 p-4 border-b transition-colors cursor-pointer ${
                      theme === 'light' ? 'border-gray-50 hover:bg-gray-50' : 'border-gray-800 hover:bg-[#222222]'
                    } ${!notification.isRead ? (theme === 'light' ? (isAdmin ? 'bg-[#8b5cf6]/5' : 'bg-[#16a34a]/5') : (isAdmin ? 'bg-[#8b5cf6]/10' : 'bg-[#16a34a]/10')) : ''}`}
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
                        {notification.description}
                      </p>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatTime(notification.createdDate)}
                      </span>
                    </div>
                    {!notification.isRead && (
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
            
            <div className={`p-3 text-center border-t ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-gray-800 bg-[#1a1a1a]'}`}>
              <Link 
                to={notificationsUrl} 
                onClick={() => setIsOpen(false)}
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