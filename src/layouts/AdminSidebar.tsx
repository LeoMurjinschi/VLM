import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  HomeIcon, ClipboardDocumentListIcon,
  UserGroupIcon, ShieldCheckIcon, StarIcon,
  XMarkIcon, SunIcon, MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

interface AdminSidebarProps {
  onClose?: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Donation Feed', href: '/admin/donations', icon: ClipboardDocumentListIcon },
  { name: 'Accounts', href: '/admin/accounts', icon: UserGroupIcon },
  { name: 'Sign-Up Requests', href: '/admin/signups', icon: ShieldCheckIcon },
  { name: 'Reviews', href: '/admin/reviews', icon: StarIcon },
];

const ACCENT = '#8b5cf6';
const ACCENT_LIGHT_BG = '#f3f0ff';
const ACCENT_DARK_BG = 'rgba(139, 92, 246, 0.10)';

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
               Food<span style={{ color: ACCENT }}>Share</span>
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

        <div className="px-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: ACCENT }}>
            <ShieldCheckIcon className="w-3.5 h-3.5" />
            Admin Panel
          </span>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`
                  group relative flex items-center px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-200
                  ${isActive 
                    ? `font-semibold border-l-[3px] ml-0 pl-[9px]` 
                    : 'border-l-[3px] border-transparent ml-0 pl-[9px]'
                  }
                  ${isActive
                    ? theme === 'light' ? 'text-[#7c3aed]' : 'text-violet-400'
                    : theme === 'light'
                    ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                  }
                `}
                style={isActive ? { 
                  borderLeftColor: ACCENT,
                  backgroundColor: theme === 'light' ? ACCENT_LIGHT_BG : ACCENT_DARK_BG 
                } : undefined}
              >
                <item.icon
                  className={`mr-2.5 h-[18px] w-[18px] flex-shrink-0 transition-colors
                    ${isActive 
                      ? theme === 'light' ? 'text-[#7c3aed]' : 'text-violet-400'
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
          ? 'bg-violet-50 border-violet-100' 
          : 'bg-violet-500/10 border-violet-900/30'
      }`}>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-lg">🛡️</span>
          <div>
            <p className={`text-[10px] uppercase tracking-widest font-semibold ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>Platform Health</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: ACCENT }}>
            3
          </span>
          <span className={`text-sm font-semibold ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`}>pending signups</span>
        </div>
        <p className={`text-[11px] mt-2 font-medium leading-relaxed ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          2 flagged items need attention ⚠️
        </p>
      </div>

    </div>
  );
};

export default AdminSidebar;
