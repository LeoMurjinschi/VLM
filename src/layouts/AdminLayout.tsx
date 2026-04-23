import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useTheme } from '../hooks/useTheme';

const AdminLayout: React.FC = () => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      <aside className="hidden md:flex flex-shrink-0 w-56 z-20">
        <AdminSidebar />
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
        <AdminSidebar onClose={() => setIsMobileMenuOpen(false)} />
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
        <div className="sticky top-0 z-40">
          <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        </div>

        <main className="flex-1 p-4 md:p-8 pt-6 bg-transparent">
          <div className="mx-auto max-w-7xl">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
