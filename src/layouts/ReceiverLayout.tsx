import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

const ReceiverLayout: React.FC = () => {
  const { theme } = useTheme();
  // Mutăm logica de deschidere a meniului aici, în Layout!
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div 
      className="flex h-screen overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      
      {/* === 1. SIDEBAR DESKTOP === */}
      <aside className="hidden md:flex flex-col h-screen w-56 z-20">
        <Sidebar />
      </aside>

      {/* === 2. OVERLAY MOBIL (Fundalul negru când deschizi meniul) === */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}
      
      {/* === 3. SIDEBAR MOBIL === */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Dacă componenta ta Sidebar are nevoie de onClose, i-l pasăm */}
        <Sidebar onClose={toggleSidebar} /> 
      </aside>

      {/* === 4. ZONA DE CONȚINUT (DREAPTA) === */}
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-transparent">
        
        {/* Header-ul stă fixat sus */}
        <div className="sticky top-0 z-40">
          <Header onMenuClick={toggleSidebar} />
        </div>

        {/* <Outlet /> este "gaura" unde React Router va introduce 
            dinamic paginile (Dashboard, Messages, MyPickups etc.) */}
        <main className="flex-1 bg-transparent relative w-full">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default ReceiverLayout;