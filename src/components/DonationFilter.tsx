import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DONATION_CATEGORIES } from '../_mock/donations';
import Select from './UI/Select'; // <-- IMPORTĂM NOUA COMPONENTĂ

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

// Definim opțiunile pentru noul nostru Select
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Added' },
  { value: 'expires_first', label: 'Expiring First' },
  { value: 'name_asc', label: 'Name (A-Z)' },
];

const DonationFilter: React.FC<DonationFilterProps> = ({
  isOpen, onClose, sortBy, setSortBy, selectedCategories, toggleCategory,
  statusFilter, setStatusFilter, urgencyFilter, setUrgencyFilter, clearFilters
}) => {
  
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-3 w-[280px] sm:w-80 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-6 z-50 animate-fade-in-up">
      {/* Header Filtru */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
        <h3 className="font-extrabold text-gray-900 text-lg">Filters & Sorting</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Sortare - FOLOSIM COMPONENTA NOUĂ AICI */}
      <div className="mb-5 relative z-20"> {/* z-20 adaugat pentru a asigura ca meniul cade PESTE elementele de dedesubt */}
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sort By</label>
        <Select 
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Filtru Categorii */}
      <div className="mb-5 relative z-10">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</label>
        <div className="space-y-2">
          {DONATION_CATEGORIES.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtru Disponibilitate */}
      <div className="mb-5 relative z-10">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Availability</label>
        <div className="flex gap-2">
          {['All', 'Available', 'Reserved'].map(status => (
            <button 
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors
                ${statusFilter === status 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Filtru Urgență */}
      <div className="mb-6 relative z-10">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Urgency</label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            checked={urgencyFilter === 'Expiring Soon'}
            onChange={(e) => setUrgencyFilter(e.target.checked ? 'Expiring Soon' : 'All')}
            className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 cursor-pointer" 
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">Expiring Soon (&lt; 48h)</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button 
        onClick={clearFilters}
        className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors relative z-10"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default DonationFilter;