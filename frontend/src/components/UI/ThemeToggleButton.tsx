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