import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DONATION_CATEGORIES } from '../_mock';
import Select from './UI/Select';
import { useTheme } from '../hooks/useTheme';

interface DonationFilterProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  urgencyFilter: string;
  setUrgencyFilter: (val: string) => void;
  clearFilters: () => void;
}


const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Added' },
  { value: 'expires_first', label: 'Expiring First' },
  { value: 'name_asc', label: 'Name (A-Z)' },
];

const DonationFilter: React.FC<DonationFilterProps> = ({
  isOpen, onClose, sortBy, setSortBy, selectedCategories, toggleCategory,
  statusFilter, setStatusFilter, urgencyFilter, setUrgencyFilter, clearFilters
}) => {
  const { theme } = useTheme();
  
  if (!isOpen) return null;

  return (
    <div className={`absolute right-0 top-full mt-3 w-[280px] sm:w-80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border p-6 z-50 animate-fade-in-up ${
      theme === 'light'
        ? 'bg-white border-gray-100'
        : 'bg-gray-900 border-gray-700'
    }`}>

      <div className={`flex justify-between items-center mb-5 pb-3 border-b ${
        theme === 'light' ? 'border-gray-100' : 'border-gray-700'
      }`}>
        <h3 className={`font-extrabold text-lg ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
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
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sort By</label>
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
          {DONATION_CATEGORIES.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
              <span className={`text-sm font-medium transition-colors ${
                theme === 'light'
                  ? 'text-gray-700 group-hover:text-blue-600'
                  : 'text-gray-300 group-hover:text-blue-400'
              }`}>{category}</span>
            </label>
          ))}
        </div>
      </div>


      <div className="mb-5 relative z-10">
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-500'
        }`}>Availability</label>
        <div className="flex gap-2">
          {['All', 'Available', 'Reserved'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors
                ${statusFilter === status 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>


      <div className="mb-6 relative z-10">
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
          theme === 'light' ? 'text-gray-400' : 'text-gray-500'
        }`}>Urgency</label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={urgencyFilter === 'Expiring Soon'}
            onChange={(e) => setUrgencyFilter(e.target.checked ? 'Expiring Soon' : 'All')}
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" 
          />
          <span className={`text-sm font-medium transition-colors ${
            theme === 'light'
              ? 'text-gray-700 group-hover:text-orange-600'
              : 'text-gray-300 group-hover:text-orange-400'
          }`}>Expiring Soon (&lt; 48h)</span>
        </label>
      </div>


      <button 
        onClick={clearFilters}
        className={`w-full py-2.5 text-sm font-bold rounded-xl transition-colors relative z-10 ${
          theme === 'light'
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
        }`}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default DonationFilter;