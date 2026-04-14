import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Squares2X2Icon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  StarIcon, 
  BookOpenIcon, 
  Cog8ToothIcon, 
  XMarkIcon,
  HomeIcon,
  PlusCircleIcon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  onClose?: () => void;
}

// === 1. LISTA PENTRU RECEIVER (ONG) ===
const receiverNavigation: NavItem[] = [
  { name: 'Donation Feed', href: '/receiver/dashboard', icon: Squares2X2Icon },
  { name: 'My Pickups', href: '/receiver/pickups', icon: ExclamationTriangleIcon },
  { name: 'History & Status', href: '/receiver/history', icon: ClockIcon },
  { name: 'Messages', href: '/receiver/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Feedback & Rating', href: '/receiver/feedback', icon: StarIcon },
  { name: 'Safety Guide', href: '/receiver/safety', icon: BookOpenIcon },
  { name: 'Profile Settings', href: '/receiver/settings', icon: Cog8ToothIcon },
];

// === 2. LISTA PENTRU DONOR ===
const donorNavigation: NavItem[] = [
  { name: 'Donation Feed', href: '/donor/feed', icon: HomeIcon },
  { name: 'Dashboard', href: '/donor/dashboard', icon: Squares2X2Icon },
  { name: 'Add Stock', href: '/donor/add-stock', icon: PlusCircleIcon },
  { name: 'Inventory', href: '/donor/inventory', icon: ArchiveBoxIcon },
  { name: 'Impact Reports', href: '/donor/reports', icon: ClipboardDocumentListIcon },
  { name: 'Settings', href: '/donor/settings', icon: Cog8ToothIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // === 3. LOGICA: Alegem lista corectă în funcție de URL ===
  const isReceiver = location.pathname.startsWith('/receiver');
  const currentNavigation = isReceiver ? receiverNavigation : donorNavigation;

  return (
    <div className={`flex h-full flex-col justify-between border-r transition-all duration-300 w-56 ${
      theme === 'light' 
        ? 'border-gray-200/80 bg-white' 
        : 'border-[#2e2e2e] bg-[#1a1a1a]'
    }`}>
      <div className="px-3 py-6">
        
        <div className="flex items-center justify-between mb-8 px-3">
           <div className="flex items-center gap-1.5">
             <span className="text-lg">🌿</span>
             <span className={`text-xl font-bold tracking-tight ${
               theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
             }`}>
               Food<span className="text-[#16a34a]">Share</span>
             </span>
           </div>

           {onClose && (
             <button onClick={onClose} className={`md:hidden p-1 rounded-md transition-colors ${
               theme === 'light' 
                 ? 'text-gray-400 hover:text-red-500' 
                 : 'text-gray-500 hover:text-red-400'
             }`}>
                <XMarkIcon className="w-5 h-5" />
             </button>
           )}
        </div>

        <nav className="space-y-1">
          {currentNavigation.map((item) => {
            const isActive = location.pathname.includes(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`
                  group relative flex items-center px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-[#F0FAF4] dark:bg-[#16a34a]/10 font-semibold border-l-[3px] border-[#16a34a] ml-0 pl-[9px]' 
                    : 'border-l-[3px] border-transparent ml-0 pl-[9px]'
                  }
                  ${isActive
                    ? theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'
                    : theme === 'light'
                    ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }
                `}
              >
                <item.icon
                  className={`mr-2.5 h-[18px] w-[18px] flex-shrink-0 transition-colors
                    ${isActive 
                      ? theme === 'light' ? 'text-[#16a34a]' : 'text-green-400'
                      : theme === 'light' ? 'text-gray-400 group-hover:text-gray-600' : 'text-gray-500 group-hover:text-gray-300'
                    }
                  `}
                  aria-hidden="true"
                />
                <span className="truncate">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={`mx-3 my-3 border-t ${theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'}`}></div>

        <button
          onClick={toggleTheme}
          className={`
            w-full group relative flex items-center px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-200
            border-l-[3px] border-transparent pl-[9px]
            ${theme === 'light'
              ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }
          `}
        >
          {theme === 'light' ? (
            <MoonIcon className={`mr-2.5 h-[18px] w-[18px] flex-shrink-0 transition-colors ${theme === 'light' ? 'text-gray-400 group-hover:text-gray-600' : 'text-gray-500 group-hover:text-gray-300'}`} />
          ) : (
            <SunIcon className="mr-2.5 h-[18px] w-[18px] flex-shrink-0 transition-colors text-gray-500 group-hover:text-gray-300" />
          )}
          <span className="truncate">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>

      <div className={`mx-3 mb-4 p-4 rounded-xl border ${
        theme === 'light' 
          ? 'bg-[#F0FAF4] border-green-100' 
          : 'bg-[#16a34a]/10 border-green-900/30'
      }`}>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-lg">🌱</span>
          <div>
            <p className={`text-[10px] uppercase tracking-widest font-semibold ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>Your Impact</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-[#16a34a] text-white">
            14
          </span>
          <span className={`text-sm font-semibold ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`}>meals saved</span>
        </div>
        <p className={`text-[11px] mt-2 font-medium leading-relaxed ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Top 5% of community heroes! 🌍
        </p>
      </div>

    </div>
  );
};

export default Sidebar;