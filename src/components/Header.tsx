import React from 'react';
import { Bars3Icon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
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
    <header className={`h-16 flex items-center justify-between px-4 sm:px-8 z-10 backdrop-blur-md transition-all duration-300 ${
      theme === 'light' 
        ? 'bg-white/80 border-gray-100' 
        : 'bg-gray-800/80 border-gray-700'
    } border-b`}>
        
        <div className="flex items-center md:hidden">
          <span className={`font-bold text-xl mr-4 ${
            theme === 'light' ? 'text-blue-600' : 'text-blue-400'
          }`}>FoodShare<span className={`${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>.</span></span>

          <button 
            onClick={onMenuClick} 
            className={`p-2 rounded-md transition-colors ${
              theme === 'light'
                ? 'text-gray-500 hover:bg-gray-100'
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
              <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:block flex-1"></div>

        <div className="flex items-center gap-3 sm:gap-5">
           
           {/* 2. Folosim aici Dropdown-ul pe care tocmai l-am creat */}
           <NotificationBell />

           
           <Link to="/messages" className={`p-2 rounded-xl transition-colors ${
             theme === 'light'
               ? 'text-gray-400 hover:text-blue-600 hover:bg-gray-50'
               : 'text-gray-500 hover:text-blue-400 hover:bg-gray-800'
           }`}>
             <ChatBubbleLeftEllipsisIcon className="w-6 h-6" />
           </Link>
           
           <div className={`hidden sm:block h-6 w-px mx-1 ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>

           <Link to="/settings" className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
             theme === 'light'
               ? 'hover:bg-gray-50'
               : 'hover:bg-gray-800'
           }`}>
             <div className="text-right hidden sm:block">
               <p className={`text-sm font-bold leading-none ${
                 theme === 'light' ? 'text-gray-900' : 'text-gray-100'
               }`}>{user.name}</p>
               
               <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                 theme === 'light' ? 'text-blue-600' : 'text-blue-400'
               }`}>{user.role}</p>
             </div>
             
             <div className={`h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm  ${
               theme === 'light' ? 'shadow-blue-200' : 'shadow-blue-900/50'
             }`}>
               {user.initials}
             </div>
           </Link>
        </div>
    </header>
  );
};

export default Header;