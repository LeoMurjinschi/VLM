import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../hooks/useTheme';

const DashboardLayout: React.FC = () => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      

      <aside className="hidden md:flex flex-shrink-0 w-56 z-20">
        <Sidebar />
      </aside>

  
      

      {isMobileMenuOpen && (
        <div 
          className={`fixed inset-0 backdrop-blur-sm z-40 md:hidden transition-opacity ${theme === 'light' ? 'bg-gray-900/60' : 'bg-black/60'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          theme === 'light' ? 'bg-white' : 'bg-gray-900'
        } ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </aside>


      <div className="flex-1 flex flex-col overflow-hidden relative">
        

        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className={`flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 pt-6 ${
          theme === 'light' ? 'bg-gray-50/50' : 'bg-gray-900/50'
        }`}>
          <div className="mx-auto max-w-7xl">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;