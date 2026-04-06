import React from 'react';
import Navbar from '../layout/Navbar';
import { useTheme } from '../../hooks/useTheme';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#F9FAFB]' : 'bg-[#121212]'
    }`}>
      <Navbar />
      
      <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className={`mt-2 text-center text-3xl font-black tracking-tight ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            {title}
          </h2>
          <p className={`mt-2 text-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            {subtitle}
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md md:max-w-2xl">
          <div className={`py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border transition-colors duration-300 ${
            theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};