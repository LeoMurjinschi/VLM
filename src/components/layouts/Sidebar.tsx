import React from 'react';
import { 
  HomeIcon, 
  MapIcon, 
  UserCircleIcon, 
  ClipboardDocumentListIcon, 
  PlusCircleIcon, 
  ArchiveBoxIcon, 
  ChartBarIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
}

const navigation: NavItem[] = [
  { name: 'Donation Feed', href: '/feed', icon: HomeIcon, current: true },
  { name: 'Live Map', href: '/map', icon: MapIcon, current: false },
  { name: 'My Profile', href: '/profile', icon: UserCircleIcon, current: false },
  { name: 'Donor Dashboard', href: '/dashboard', icon: ChartBarIcon, current: false },
  { name: 'Add Stock', href: '/add-stock', icon: PlusCircleIcon, current: false },
  { name: 'Current Inventory', href: '/inventory', icon: ArchiveBoxIcon, current: false },
  { name: 'Impact Reports', href: '/reports', icon: ClipboardDocumentListIcon, current: false },
];

const Sidebar: React.FC = () => {
  return (
    <div className="flex h-screen flex-col justify-between border-r border-gray-100 bg-white w-72 transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="px-6 py-8">
       
        <div className="flex items-center mb-10 px-2">
           <span className="text-3xl font-extrabold text-blue-600">FoodShare<span className="text-gray-900">.</span></span>
        </div>

    
        <div className="mb-8 p-4 bg-blue-50 rounded-2xl flex items-center gap-3 border border-blue-100">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-200">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">Mihai Ionescu</span>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Business Partner</span>
          </div>
        </div>

       
        <nav className="space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-200
                ${item.current 
                  ? 'bg-blue-600 !text-white shadow-lg shadow-blue-200' 
                  : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}
              `}
            >
              <item.icon
                className={`mr-3 h-6 w-6 flex-shrink-0 transition-colors
                  ${item.current ? '!text-white' : 'text-gray-400 group-hover:text-blue-600'}
                `}
                aria-hidden="true"
              />
             
              <span className={item.current ? '!text-white' : ''}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>
      </div>

      
     
      
      <div className="p-6 border-t border-blue-100">
        <button className="flex w-full items-center justify-center px-4 py-3 text-sm font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-500 shadow-md shadow-sky-200 transition-all active:scale-[0.98]">
          <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 !text-white" />
          <span className="!text-white">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;