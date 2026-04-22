import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const AdminSignups: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold tracking-tight ${
        theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
      }`} style={{ fontFamily: 'var(--font-display)' }}>
        Sign-Up Requests
      </h1>
      <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
      </p>
    </div>
  );
};

export default AdminSignups;
