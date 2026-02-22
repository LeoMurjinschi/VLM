import React from 'react';
import { Bars3Icon, Cog8ToothIcon, BellIcon } from '@heroicons/react/24/outline';
import { MOCK_USER } from '../_mock/user';


interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const userInitial = MOCK_USER.name.charAt(0).toUpperCase();

  return (
    <header className="bg-white/80 backdrop-blur-md h-16 flex items-center justify-between px-4 sm:px-8 z-10 border-b border-gray-100">
        
        <div className="flex items-center md:hidden">
          <span className="font-bold text-xl text-blue-600 mr-4">FoodShare<span className="text-gray-900">.</span></span>

          <button 
            onClick={onMenuClick} 
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
          >
              <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:block flex-1"></div>

        <div className="flex items-center gap-3 sm:gap-5">
           <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
             <BellIcon className="w-6 h-6" />
             <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
           </button>
           <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
             <Cog8ToothIcon className="w-6 h-6" />
           </button>
           <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1"></div>
           <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-xl transition-colors">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-gray-900 leading-none">{MOCK_USER.name}</p>
               <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-1">{MOCK_USER.role}</p>
             </div>
             {MOCK_USER.avatar ? (
               <img src={MOCK_USER.avatar} alt="Avatar" className="h-9 w-9 rounded-full object-cover shadow-sm border border-gray-100" />
             ) : (
               <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-blue-200 flex-shrink-0">
                 {userInitial}
               </div>
             )}
           </div>
        </div>
    </header>
  );
};

export default Header;