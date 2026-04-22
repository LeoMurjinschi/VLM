import React, { useState, useRef, useEffect } from 'react';
import { Bars3Icon, ArrowRightOnRectangleIcon, CalendarIcon, IdentificationIcon, ClockIcon, ShieldExclamationIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'A';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
           {/* Notification bell activ și adaptabil pe admin */}
           <NotificationBell />
           
           <div className={`hidden sm:block h-6 w-px ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>
           
           <div className="relative" ref={profileRef}>
             <div 
               onClick={() => setIsProfileOpen(!isProfileOpen)}
               className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
                 theme === 'light'
                   ? 'hover:bg-gray-50'
                   : 'hover:bg-gray-800'
               }`}
             >
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

             {/* Profile Dropdown */}
             {isProfileOpen && (
               <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border overflow-hidden z-50 ${
                 theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-gray-800'
               }`}>
                 <div className={`p-5 border-b ${
                   theme === 'light' ? 'border-gray-100 bg-gray-50/50' : 'border-gray-800 bg-[#1a1a1a]'
                 }`}>
                   <div className="flex items-center gap-4 mb-4">
                     {user?.avatar ? (
                       <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-[#8b5cf6]/50 shadow-sm" />
                     ) : (
                       <div className="h-12 w-12 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] font-bold text-lg shadow-sm">
                         {userInitial}
                       </div>
                     )}
                     <div className="overflow-hidden">
                       <p className={`font-bold text-base truncate ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                         {user?.name || 'Administrator'}
                       </p>
                       <div className="flex items-center gap-1.5 mt-0.5">
                         <ShieldCheckIcon className="w-4 h-4 text-[#8b5cf6]" />
                         <p className="text-xs font-bold uppercase tracking-wider text-[#8b5cf6]">
                           {user?.role || 'admin'}
                         </p>
                       </div>
                     </div>
                   </div>
                   
                   <div className="space-y-2.5 mt-4">
                     <p className={`text-xs flex items-center gap-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                       <IdentificationIcon className="w-4 h-4 text-gray-500 shrink-0" />
                       <span className="font-semibold w-16 text-gray-500">Admin ID:</span>
                       <span className="font-mono">#FS-9402X</span>
                     </p>
                     <p className={`text-xs flex items-center gap-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                       <span className="w-4 flex justify-center text-gray-500 shrink-0">@</span>
                       <span className="font-semibold w-16 text-gray-500">Email:</span>
                       <span className="truncate">{user?.email || 'admin@foodshare.com'}</span>
                     </p>
                     <p className={`text-xs flex items-center gap-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                       <ComputerDesktopIcon className="w-4 h-4 text-gray-500 shrink-0" />
                       <span className="font-semibold w-16 text-gray-500">Sessions:</span>
                       <span>1 Active Device</span>
                     </p>
                     <p className={`text-xs flex items-center gap-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                       <ClockIcon className="w-4 h-4 text-gray-500 shrink-0" />
                       <span className="font-semibold w-16 text-gray-500">Last Login:</span>
                       <span>Just now</span>
                     </p>
                     <p className={`text-xs flex items-center gap-2 pt-2 border-t ${theme === 'light' ? 'border-gray-100 text-gray-500' : 'border-gray-800 text-gray-500'}`}>
                       <CalendarIcon className="w-4 h-4 shrink-0" />
                       Joined FoodShare System on Oct 2023
                     </p>
                   </div>
                 </div>

                 <div className={`p-2 ${theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'}`}>
                   <button 
                     onClick={handleLogout}
                     className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                       theme === 'light' ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-900/20'
                     }`}
                   >
                     <ArrowRightOnRectangleIcon className="w-4 h-4" /> Sign Out
                   </button>
                 </div>
               </div>
             )}
           </div>
        </div>
    </header>
  );
};

export default AdminHeader;
