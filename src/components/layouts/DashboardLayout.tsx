import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

const DashboardLayout: React.FC = () => { 
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      <aside className="hidden md:flex flex-shrink-0 w-72 z-20">
        <Sidebar />
      </aside>

      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
            <span className="font-bold text-xl text-teal-600">EcoFoodWaste</span>
            <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
                <Bars3Icon className="w-6 h-6" />
            </button>
        </header>

        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-8">
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;