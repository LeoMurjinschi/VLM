import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  HomeIcon, MapIcon, UserCircleIcon, ClipboardDocumentListIcon, 
  PlusCircleIcon, ArchiveBoxIcon, ChartBarIcon, ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

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
  { name: 'Live Map', href: '/map', icon: MapIcon },
  { name: 'Donor Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Add Stock', href: '/add-stock', icon: PlusCircleIcon },
  { name: 'Current Inventory', href: '/inventory', icon: ArchiveBoxIcon },
  { name: 'Impact Reports', href: '/reports', icon: ClipboardDocumentListIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col justify-between border-r border-gray-100 bg-white w-56 transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="px-4 py-6">
       
        <div className="flex items-center justify-between mb-10 px-2">
           <span className="text-2xl font-extrabold text-blue-600">FoodShare<span className="text-gray-900">.</span></span>
           

           {onClose && (
             <button onClick={onClose} className="md:hidden p-1 text-gray-400 hover:text-red-500 rounded-md transition-colors">
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
                onClick={onClose} // <-- Când dai click pe un link, se închide meniul
                className={`
                  group flex items-center px-3 py-3 text-sm font-bold rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 !text-white shadow-lg shadow-blue-200' 
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors
                    ${isActive ? '!text-white' : 'text-gray-400 group-hover:text-blue-600'}
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
    </div>
  );
};

export default Sidebar;