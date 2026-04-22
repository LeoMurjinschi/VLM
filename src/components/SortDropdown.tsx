import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  label?: string;
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  label = "Sort by:", 
  options, 
  value, 
  onChange 
}) => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border shadow-sm transition-colors ${
      theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
    }`}>
      <ArrowUpDown size={18} className={theme === 'light' ? 'text-gray-400' : 'text-gray-500'} />
      
      {label && (
        <span className={`text-sm font-medium hidden sm:inline ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {label}
        </span>
      )}
      
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-transparent text-sm font-bold focus:outline-none cursor-pointer border-none outline-none ${
          theme === 'light' ? 'text-gray-800' : 'text-gray-100'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className={theme === 'light' ? 'text-gray-800 bg-white' : 'text-gray-100 bg-[#1a1a1a]'}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;