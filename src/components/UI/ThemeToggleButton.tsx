import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex w-full p-1 rounded-xl transition-colors duration-300 ${
      theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'
    }`}>
      <button
        onClick={() => theme !== 'light' && toggleTheme()}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
          theme === 'light' 
            ? 'bg-white text-[#425C2A] shadow-sm' 
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <SunIcon className={`w-4 h-4 ${theme === 'light' ? 'text-amber-500' : ''}`} />
        <span>Light</span>
      </button>

      <button
        onClick={() => theme !== 'dark' && toggleTheme()}
        className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-700 text-[#AEB784] shadow-sm' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <MoonIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-300' : ''}`} />
        <span>Dark</span>
      </button>
    </div>
  );
};

export default ThemeToggleButton;import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleButtonProps {
  className?: string;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-all duration-300 shadow-lg ${
        theme === 'light'
          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-gray-300'
          : 'bg-gray-700 text-yellow-400 hover:bg-gray-600 shadow-gray-900'
      } ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
