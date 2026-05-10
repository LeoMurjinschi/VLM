import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  BuildingStorefrontIcon 
} from '@heroicons/react/24/outline';

interface HistoryHeaderProps {
  totalPickups: number;
  foodSavedKg: number;
  favoriteDonor: string;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ 
  totalPickups, 
  foodSavedKg, 
  favoriteDonor 
}) => {
  const { theme } = useTheme();

  return (
    <div className={`pb-6 border-b relative z-20 ${
      theme === 'light' ? 'border-gray-100' : 'border-gray-700'
    }`}>
      {/* Titlul Paginii */}
      <div className="mb-6">
        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight mb-2 ${
          theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
        }`} style={{ fontFamily: 'var(--font-display)' }}>
          History & Status
        </h1>
        <p className={`text-base md:text-lg leading-relaxed ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Track your past pickups and see the impact you've made.
        </p>
      </div>

      {/* Mini-Statistici (Impact Summary) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up">
        
        {/* Card 1: Total Pickups */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
          theme === 'light' ? 'bg-white border-gray-200/60 hover:shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:bg-[#222222]'
        }`}>
          <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'}`}>
            <ShoppingBagIcon className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Total Pickups</p>
            <p className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`}>{totalPickups}</p>
          </div>
        </div>

        {/* Card 2: Food Saved */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
          theme === 'light' ? 'bg-white border-gray-200/60 hover:shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:bg-[#222222]'
        }`}>
          <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-amber-50 text-amber-600' : 'bg-amber-900/30 text-amber-400'}`}>
            <HeartIcon className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Food Saved</p>
            <p className={`text-xl font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`}>{foodSavedKg} kg</p>
          </div>
        </div>

        {/* Card 3: Favorite Donor */}
        <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
          theme === 'light' ? 'bg-white border-gray-200/60 hover:shadow-sm' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:bg-[#222222]'
        }`}>
          <div className={`p-3 rounded-xl ${theme === 'light' ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-900/30 text-indigo-400'}`}>
            <BuildingStorefrontIcon className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Top Donor</p>
            <p className={`text-lg font-bold truncate ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`}>{favoriteDonor}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HistoryHeader;
