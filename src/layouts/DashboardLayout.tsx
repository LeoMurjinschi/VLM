import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout: React.FC = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      

      <aside className="hidden md:flex flex-shrink-0 w-56 z-20">
        <Sidebar />
      </aside>

  
      

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)} // Dai click afară = se închide
        />
      )}
      

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-white transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </aside>


      <div className="flex-1 flex flex-col overflow-hidden relative">
        

        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-8 pt-6">
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;