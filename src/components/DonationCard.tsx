import React, { useState } from 'react';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { Donation } from '../_mock';
import ReservationModal from './ReservationModal';
import { useTheme } from '../hooks/useTheme';

interface DonationCardProps {
  donation: Donation;
  onReserve: (id: string, amount: number) => void; 
}

const DonationCard: React.FC<DonationCardProps> = ({ donation, onReserve }) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('fruit')) return { bg: 'bg-orange-500/80', text: 'text-white' };
    if (lower.includes('baker')) return { bg: 'bg-amber-500/80', text: 'text-white' };
    if (lower.includes('veg')) return { bg: 'bg-green-600/80', text: 'text-white' };
    if (lower.includes('dairy')) return { bg: 'bg-blue-500/80', text: 'text-white' };
    if (lower.includes('cook')) return { bg: 'bg-red-500/80', text: 'text-white' };
    return { bg: 'bg-gray-500/80', text: 'text-white' };
  };

  const isReserved = donation.status === 'Reserved';
  const isAvailable = donation.status === 'Available';
  const expiration = new Date(donation.expirationDate).getTime();
  const daysLeft = Math.ceil((expiration - new Date().getTime()) / 86400000);
  const isExpiringSoon = daysLeft <= 1 && daysLeft >= 0;
  const catColors = getCategoryColor(donation.category);

  return (
    <>
      <div className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out
        hover:-translate-y-1.5 hover:shadow-xl
        ${theme === 'light'
          ? 'bg-white border border-gray-200/80 shadow-sm hover:shadow-gray-200/60'
          : 'bg-[#1a1a1a] border border-[#2e2e2e] shadow-sm hover:shadow-black/30'
        }
        ${isExpiringSoon ? 'ring-2 ring-amber-400/40' : ''}
      `}>
        
        {/* Image section — fixed 200px */}
        <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Frosted category badge — top left */}
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide shadow-sm ${catColors.bg} ${catColors.text}`}>
            {donation.category}
          </span>

          {/* Status badge — top right */}
          <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${
            isAvailable
              ? 'bg-green-500/80 text-white'
              : 'bg-amber-500/80 text-white'
          }`}>
            {donation.status}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-grow p-4 pt-3.5">
          {/* Category chip */}
          <span className={`self-start px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 ${
            theme === 'light'
              ? 'bg-[#16a34a]/10 text-[#16a34a]'
              : 'bg-green-400/10 text-green-400'
          }`}>
            {donation.category}
          </span>

          {/* Title */}
          <h3 className={`text-lg font-bold leading-snug mb-1.5 ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`} style={{ fontSize: '18px' }}>
            {donation.title}
          </h3>

          {/* Description */}
          <p className={`text-[13px] mb-3 line-clamp-2 leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {donation.description}
          </p>

          {/* Donor row */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              {donation.pickupLocation.charAt(0)}
            </div>
            <p className={`text-xs font-medium truncate ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              from {donation.pickupLocation.split(',')[0]}
            </p>
          </div>

          {/* Info rows */}
          <div className={`mt-auto space-y-2 pt-3 border-t ${
            theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
          }`}>
            <div className={`flex items-center text-[13px] ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <MapPinIcon className="w-4 h-4 mr-2 text-[#16a34a] flex-shrink-0" />
              <span className="truncate">{donation.pickupLocation}</span>
            </div>
            <div className={`flex items-center text-[13px] ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <ClockIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${isExpiringSoon ? 'text-amber-500' : 'text-gray-400'}`} />
              <span>
                Expires:{' '}
                <span className={isExpiringSoon ? 'text-amber-500 font-semibold' : ''}>
                  {new Date(donation.expirationDate).toLocaleDateString()}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Slide-up Reserve button on hover */}
        <div className={`absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${
          theme === 'light' ? 'bg-white/95 backdrop-blur-sm' : 'bg-[#1a1a1a]/95 backdrop-blur-sm'
        }`}>
          <button 
            onClick={() => setIsModalOpen(true)}
            disabled={isReserved}
            className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all active:scale-[0.98] ${
              isReserved
                ? theme === 'light'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md shadow-green-500/20'
            }`}
          >
            {isReserved ? 'Already Reserved' : 'Reserve Now'}
          </button>
        </div>

        {/* Expiry urgency bar */}
        {isExpiringSoon && (
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-amber-400 group-hover:opacity-0 transition-opacity" />
        )}
      </div>

      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        donation={donation}
        onReserve={onReserve}
      />
    </>
  );
};

export default DonationCard;