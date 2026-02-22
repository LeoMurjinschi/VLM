import React from 'react';
import { Bars3Icon, Cog8ToothIcon, BellIcon } from '@heroicons/react/24/outline';
import { MOCK_USER } from '../_mock/user';
import { useTheme } from '../hooks/useTheme';


interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme } = useTheme();
  const userInitial = MOCK_USER.name.charAt(0).toUpperCase();

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
           <button className={`p-2 transition-colors relative ${
             theme === 'light'
               ? 'text-gray-400 hover:text-blue-600'
               : 'text-gray-500 hover:text-blue-400'
           }`}>
             <BellIcon className="w-6 h-6" />
             <span className={`absolute top-2 right-2 block h-2 w-2 rounded-full bg-blue-500 ring-2 ${
               theme === 'light' ? 'ring-white' : 'ring-gray-800'
             }`}></span>
           </button>
           <button className={`p-2 transition-colors ${
             theme === 'light'
               ? 'text-gray-400 hover:text-blue-600'
               : 'text-gray-500 hover:text-blue-400'
           }`}>
             <Cog8ToothIcon className="w-6 h-6" />
           </button>
           <div className={`hidden sm:block h-6 w-px mx-1 ${
             theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
           }`}></div>
           <div className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-xl transition-colors ${
             theme === 'light'
               ? 'hover:bg-gray-50'
               : 'hover:bg-gray-700'
           }`}>
             <div className="text-right hidden sm:block">
               <p className={`text-sm font-bold leading-none ${
                 theme === 'light' ? 'text-gray-900' : 'text-gray-100'
               }`}>{MOCK_USER.name}</p>
               <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                 theme === 'light' ? 'text-blue-600' : 'text-blue-400'
               }`}>{MOCK_USER.role}</p>
             </div>
             {MOCK_USER.avatar ? (
               <img src={MOCK_USER.avatar} alt="Avatar" className={`h-9 w-9 rounded-full object-cover shadow-sm border ${
                 theme === 'light' ? 'border-gray-100' : 'border-gray-700'
               }`} />
             ) : (
               <div className={`h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0 ${
                 theme === 'light' ? 'shadow-blue-200' : 'shadow-blue-900'
               }`}>
                 {userInitial}
               </div>
             )}
           </div>
        </div>
    </header>
  );
};

export default Header;