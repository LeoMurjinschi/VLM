import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Select from './ui/Select';
import { useTheme } from '../hooks/useTheme';

export const DASHBOARD_CATEGORIES = ['Veggies', 'Cooked Meals', 'Bakery', 'Dairy', 'Canned', 'Meat'];

interface DashboardFilterProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  clearFilters: () => void;
}

const SORT_OPTIONS = [
  { value: 'asc', label: 'Nearest Deadline' },
  { value: 'desc', label: 'Latest Deadline' }
];

const DashboardFilter: React.FC<DashboardFilterProps> = ({
  isOpen, onClose, sortBy, setSortBy, selectedCategories, toggleCategory,
  statusFilter, setStatusFilter, clearFilters
}) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-[calc(100%+0.75rem)] w-[280px] sm:w-80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border p-6 z-50 animate-fade-in-up ${
      theme === 'light'
        ? 'bg-white border-gray-100'
        : 'bg-[#1a1a1a] border-[#2e2e2e]'
    }`}>
      <div className={`flex justify-between items-center mb-5 pb-3 border-b ${
        theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
      }`}>
        <h3 className={`font-extrabold text-lg ${
          theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
        }`}>Filters & Sorting</h3>
        <button onClick={onClose} className={`transition-colors ${
          theme === 'light'
            ? 'text-gray-400 hover:text-red-500'
            : 'text-gray-500 hover:text-red-400'
        }`}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-5 relative z-20"> 
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-500'
        }`}>Sort By</label>
        <Select 
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      <div className="mb-5 relative z-10">
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-500'
        }`}>Categories</label>
        <div className="space-y-2">
          {DASHBOARD_CATEGORIES.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className={`w-4 h-4 rounded border-gray-300 focus:ring-[#16a34a] cursor-pointer ${
                  theme === 'light' ? 'text-[#16a34a] bg-gray-100' : 'text-green-500 bg-[#2e2e2e] border-gray-600'
                }`}
              />
              <span className={`text-sm font-medium transition-colors cursor-pointer ${
                theme === 'light'
                  ? 'text-gray-700 group-hover:text-[#16a34a]'
                  : 'text-gray-300 group-hover:text-[#16a34a]'
              }`}>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-500'
        }`}>Status</label>
        <div className="flex flex-wrap gap-2">
          {['All', 'Urgent', 'In preparation', 'Ready for pickup'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors active:scale-95
                ${statusFilter === status 
                  ? 'bg-[#16a34a]/10 border-[#16a34a]/30 text-[#16a34a]' 
                  : theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                  : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-300 hover:bg-[#2a2a2a]'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className={`w-full py-2.5 text-sm font-bold rounded-xl transition-all active:scale-[0.98] relative z-10 ${
          theme === 'light'
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            : 'bg-[#2a2a2a] hover:bg-[#333333] text-gray-300'
        }`}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default DashboardFilter;
