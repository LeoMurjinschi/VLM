import React from 'react';
import { ArrowUpDown } from 'lucide-react';

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
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
      <ArrowUpDown size={18} className="text-gray-400" />
      
      {label && (
        <span className="text-sm font-medium text-gray-600 hidden sm:inline">
          {label}
        </span>
      )}
      
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;