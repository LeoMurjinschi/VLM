import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import Select from './ui/Select'; 

interface HistoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  dateFilter: string;
  onDateChange: (value: string) => void;
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateFilter,
  onDateChange
}) => {
  const { theme } = useTheme();

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Completed', label: '✅ Completed' },
    { value: 'Cancelled', label: '❌ Cancelled' },
    { value: 'Expired', label: '⚠️ Expired' },
  ];

  const dateOptions = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Last 7 Days', label: 'Last 7 Days' },
    { value: 'This Month', label: 'This Month' },
    { value: 'This Year', label: 'This Year' },
  ];

  return (
    <div className={`p-4 rounded-2xl border mb-6 transition-all duration-300 animate-fade-in-up relative z-40 ${
      theme === 'light' ? 'bg-white border-gray-200/60 shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e]'
    }`}>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        
        <div className="relative w-full md:flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className={`h-5 w-5 ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <input
            type="text"
            placeholder="Search by food name or donor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 transition-all ${
              theme === 'light' 
                ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:ring-[#16a34a]/20' 
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-100 placeholder-gray-500 focus:border-[#16a34a] focus:ring-[#16a34a]/20'
            }`}
          />
        </div>

        <div className="w-full md:w-48 shrink-0">
          <Select 
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusChange}
          />
        </div>

        <div className="w-full md:w-48 shrink-0">
          <Select 
            options={dateOptions}
            value={dateFilter}
            onChange={onDateChange}
          />
        </div>

      </div>
    </div>
  );
};

export default HistoryFilters;
