import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  return (
    <header className={`h-16 flex items-center justify-between px-4 sm:px-8 z-20 transition-all duration-300 border-b backdrop-blur-xl ${
      theme === 'light' 
        ? 'bg-white/70 border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
        : 'bg-[#111111]/70 border-[#2e2e2e]/50 shadow-[0_4px_30px_rgba(0,0,0,0.2)]'
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

          <Link to="/admin/dashboard" className="flex items-center gap-1.5">
            <span className="text-lg">🌿</span>
            <span className={`text-xl font-bold tracking-tight ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`}>
              Food<span className="text-[#8b5cf6]">Share</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
           {/* Notification bell placeholder */}
           <button className={`relative p-2 rounded-lg transition-colors ${
             theme === 'light'
               ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
               : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
           }`}>
             <BellIcon className="w-5 h-5" />
             <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8b5cf6] ring-2 ring-white dark:ring-[#111111]"></span>
           </button>
           
           <div className={`hidden sm:block h-6 w-px ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>
           
           <div className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
             theme === 'light'
               ? 'hover:bg-gray-50'
               : 'hover:bg-gray-800'
           }`}>
             <div className="text-right hidden sm:block">
               <p className={`text-sm font-semibold leading-none ${
                 theme === 'light' ? 'text-gray-900' : 'text-gray-100'
               }`}>{user?.name}</p>
               
               <div className="flex items-center gap-1 mt-1 justify-end">
                 <ShieldCheckIcon className="w-3 h-3 text-[#8b5cf6]" />
                 <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b5cf6]">Administrator</p>
               </div>
             </div>
             
             {user?.avatar ? (
               <img src={user.avatar} alt="Profile" className={`w-9 h-9 rounded-full object-cover ring-2 ${
                 theme === 'light' ? 'ring-violet-100' : 'ring-violet-900/50'
               }`} />
             ) : (
               <div className="h-9 w-9 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                 {userInitial}
               </div>
             )}
           </div>
        </div>
    </header>
  );
};

export default AdminHeader;
