import React from 'react';
import { Bars3Icon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import usersData from '../_mock/users.json';

// 1. Importăm noua componentă
import NotificationBell from './NotificationBell';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { user: authUser } = useAuth();
  
  const mockUser = usersData.find(u => u.id === authUser?.id || u.email === authUser?.email) || usersData[0];
  const basePath = authUser?.role === 'donor' ? '/donor' : '/receiver';
  const dashboardUrl = `${basePath}/dashboard`;
  const messagesUrl = `${basePath}/messages`;
  const settingsUrl = `${basePath}/settings`;

  const userDetails = {
    name: mockUser.name || 'Vasile Rodideal',
    role: mockUser.role || 'NGO Receiver',
    initials: mockUser.name ? mockUser.name.substring(0, 2).toUpperCase() : 'VR',
    avatar: mockUser.avatar
  };

  return (
    <header className={`h-16 flex items-center justify-between px-4 sm:px-8 z-20 transition-all duration-300 border-b ${
      theme === 'light' 
        ? 'bg-white border-gray-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]' 
        : 'bg-[#1a1a1a] border-[#2e2e2e] shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
    }`}>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick} 
            className={`md:hidden p-2 rounded-lg transition-colors ${
              theme === 'light'
                ? 'text-gray-500 hover:bg-gray-100'
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          <Link to={dashboardUrl} className="flex items-center gap-1.5 md:hidden">
            <span className="text-lg">🌿</span>
            <span className={`text-xl font-bold tracking-tight ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`}>
              Food<span className="text-[#16a34a]">Share</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
           {/* 2. Folosim aici Dropdown-ul pe care tocmai l-am creat */}
           <NotificationBell />

           <Link to={messagesUrl} className={`p-2 rounded-lg transition-colors ${
             theme === 'light'
               ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
           }`}>
             <ChatBubbleLeftRightIcon className="w-5 h-5" />
           </Link>
           
           <div className={`hidden sm:block h-6 w-px ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>
           
           <Link to={settingsUrl} className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
             theme === 'light'
               ? 'hover:bg-gray-50'
               : 'hover:bg-gray-800'
           }`}>
             <div className="text-right hidden sm:block">
               <p className={`text-sm font-semibold leading-none truncate max-w-[150px] ${
                 theme === 'light' ? 'text-gray-900' : 'text-gray-100'
               }`}>{userDetails.name}</p>
               
               <p className="text-[10px] font-bold uppercase tracking-wider mt-1 text-[#16a34a] capitalize">{userDetails.role}</p>
             </div>
             
             {userDetails.avatar ? (
               <img src={userDetails.avatar} alt="Profile" className="h-9 w-9 rounded-full object-cover flex-shrink-0 border shadow-sm" />
             ) : (
               <div className="h-9 w-9 rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                 {userDetails.initials}
               </div>
             )}
           </Link>
        </div>
    </header>
  );
};

export default Header;