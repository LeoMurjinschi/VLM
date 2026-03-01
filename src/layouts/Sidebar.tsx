import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  HomeIcon, ClipboardDocumentListIcon,
  PlusCircleIcon, ArchiveBoxIcon, ChartBarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ThemeToggleButton from '../components/UI/ThemeToggleButton';
import { useTheme } from '../hooks/useTheme';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}


interface SidebarProps {
  onClose?: () => void;
}

const navigation: NavItem[] = [
  { name: 'Donation Feed', href: '/feed', icon: HomeIcon },
  { name: 'Donor Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Add Stock', href: '/add-stock', icon: PlusCircleIcon },
  { name: 'Current Inventory', href: '/inventory', icon: ArchiveBoxIcon },
  { name: 'Impact Reports', href: '/reports', icon: ClipboardDocumentListIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div className={`flex h-full flex-col justify-between border-r transition-all duration-300 w-56 shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${
      theme === 'light' 
        ? 'border-gray-100 bg-white' 
        : 'border-gray-700 bg-gray-900'
    }`}>
      <div className="px-4 py-6">
       
        <div className="flex items-center justify-between mb-10 px-2">
           <span className={`text-2xl font-extrabold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
             FoodShare<span className={`${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>.</span>
           </span>
           

           {onClose && (
             <button onClick={onClose} className={`md:hidden p-1 rounded-md transition-colors ${
               theme === 'light' 
                 ? 'text-gray-400 hover:text-red-500' 
                 : 'text-gray-500 hover:text-red-400'
             }`}>
                <XMarkIcon className="w-6 h-6" />
             </button>
           )}
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-all duration-200
                  ${isActive 
                    ? `bg-blue-600 !text-white shadow-lg ${theme === 'light' ? 'shadow-blue-200' : 'shadow-blue-900'}` 
                    : theme === 'light'
                    ? 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-blue-400'
                }
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors
                    ${isActive ? '!text-white' : theme === 'light' ? 'text-gray-400 group-hover:text-blue-600' : 'text-gray-500 group-hover:text-blue-400'}
                  `}
                  aria-hidden="true"
                />
                <span className={`truncate ${isActive ? '!text-white' : ''}`}>
                  {item.name}
                </span>
              </a>
            );
          })}
        </nav>
      </div>


      <div className={`px-4 py-6 border-t ${
        theme === 'light' 
          ? 'border-gray-100' 
          : 'border-gray-700'
      }`}>
        <div className="flex items-center justify-center">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;