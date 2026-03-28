import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ArchiveBoxIcon, CalendarIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import type { HistoryRecord } from '../pages/ReservationHistory'; 

interface HistoryItemProps {
  item: HistoryRecord;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const { theme } = useTheme();

  // Culori semantice bazate pe designul FoodShare
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Expired':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Cancelled':
        return theme === 'light' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-gray-800 text-gray-400 border-gray-700';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 rounded-2xl border transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700'
    }`}>
      
      {/* Imaginea */}
      <div className="w-full sm:w-20 h-32 sm:h-20 shrink-0 overflow-hidden rounded-xl border border-transparent dark:border-gray-700">
        <img 
          src={item.image} 
          alt={item.title} 
          className={`w-full h-full object-cover ${item.status !== 'Completed' ? 'grayscale opacity-70' : ''}`}
        />
      </div>

      {/* Detalii Principale (Titlu & Donator) */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-lg font-bold truncate mb-1 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`}>
          {item.title}
        </h4>
        <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          <BuildingStorefrontIcon className="w-4 h-4 mr-1.5 shrink-0" />
          <span className="truncate">{item.donor}</span>
        </div>
      </div>

      {/* Data și Ora */}
      <div className={`flex-1 min-w-0 flex items-center text-sm font-medium ${
        theme === 'light' ? 'text-gray-600' : 'text-gray-300'
      }`}>
        <CalendarIcon className={`w-5 h-5 mr-2 shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
        <span className="truncate">{item.pickupDate}</span>
      </div>

      {/* Cantitate și Status (În dreapta) */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2 sm:gap-1.5 shrink-0">
        <div className={`flex items-center text-sm font-bold ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`}>
          <ArchiveBoxIcon className={`w-4 h-4 mr-1.5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
          {item.quantity}
        </div>
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusBadge(item.status)}`}>
          {item.status}
        </span>
      </div>

    </div>
  );
};

export default HistoryItem;