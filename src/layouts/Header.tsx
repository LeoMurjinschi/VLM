import React from 'react';
import { Bars3Icon, ChatBubbleLeftRightIcon, BellIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from './../context/AuthContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

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

          <Link to="/donor/feed" className="flex items-center gap-1.5">
            <span className="text-lg">🌿</span>
            <span className={`text-xl font-bold tracking-tight ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`}>
              Food<span className="text-[#16a34a]">Share</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
           <button className={`p-2 rounded-lg transition-colors relative ${
             theme === 'light'
               ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
           }`}>
             <BellIcon className="w-5 h-5" />
             <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a1a1a]"></span>
           </button>

           <button className={`p-2 rounded-lg transition-colors ${
             theme === 'light'
               ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
           }`}>
             <ChatBubbleLeftRightIcon className="w-5 h-5" />
           </button>
           
           <div className={`hidden sm:block h-6 w-px ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>
           
           <Link to="/donor/settings" className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
             theme === 'light'
               ? 'hover:bg-gray-50'
               : 'hover:bg-gray-800'
           }`}>
             <div className="text-right hidden sm:block">
               <p className={`text-sm font-semibold leading-none ${
                 theme === 'light' ? 'text-gray-900' : 'text-gray-100'
               }`}>{user?.name}</p>
               
               <p className="text-[10px] font-bold uppercase tracking-wider mt-1 text-[#16a34a]">{user?.role}</p>
             </div>
             
             {user?.avatar ? (
               <img src={user.avatar} alt="Profile" className={`w-9 h-9 rounded-full object-cover ring-2 ${
                 theme === 'light' ? 'ring-gray-100' : 'ring-gray-700'
               }`} />
             ) : (
               <div className="h-9 w-9 rounded-full bg-[#16a34a] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                 {userInitial}
               </div>
             )}
           </Link>
        </div>
    </header>
  );
};

export default Header;