import React from 'react';
import { Bars3Icon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { Link } from 'react-router-dom';

// 1. Importăm noua componentă
import NotificationBell from './NotificationBell';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  
  const user = {
    name: 'Vasile Rodideal',
    role: 'NGO Receiver',
    initials: 'VR'
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

          <Link to="/receiver/dashboard" className="flex items-center gap-1.5 md:hidden">
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

           <Link to="/messages" className={`p-2 rounded-lg transition-colors ${
             theme === 'light'
               ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
           }`}>
             <ChatBubbleLeftRightIcon className="w-5 h-5" />
           </Link>
           
           <div className={`hidden sm:block h-6 w-px ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>
           
           <Link to="/settings" className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
             theme === 'light'
               ? 'hover:bg-gray-50'
               : 'hover:bg-gray-800'
           }`}>
             <div className="text-right hidden sm:block">
               <p className={`text-sm font-semibold leading-none ${
                 theme === 'light' ? 'text-gray-900' : 'text-gray-100'
               }`}>{user.name}</p>
               
               <p className="text-[10px] font-bold uppercase tracking-wider mt-1 text-[#16a34a]">{user.role}</p>
             </div>
             
             <div className="h-9 w-9 rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
               {user.initials}
             </div>
           </Link>
        </div>
    </header>
  );
};

export default Header;