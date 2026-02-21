import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => { 
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      <aside className="hidden md:flex flex-shrink-0 w-72 z-20">
        <Sidebar />
      </aside>

      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        
        

        
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