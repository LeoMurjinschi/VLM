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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Reserved': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const isReserved = donation.status === 'Reserved';

  return (
    <>
      <div className={`group rounded-2xl border overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full relative z-0 ${
        theme === 'light'
          ? 'bg-white border-gray-100'
          : 'bg-gray-900 border-gray-700'
      }`}>
        <div className="relative h-52 w-full overflow-hidden">
          <div className={`absolute inset-0 group-hover:bg-black/0 transition-colors z-10 ${
            theme === 'light' ? 'bg-black/5' : 'bg-black/20'
          }`} />
          <img src={donation.image} alt={donation.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(donation.status)} shadow-sm z-20 backdrop-blur-sm`}>
            {donation.status}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase">{donation.category}</span>
            <span className={`text-xs font-medium ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>{donation.postedAt}</span>
          </div>

          <h3 className={`text-xl font-extrabold mb-2 leading-tight group-hover:text-blue-600 transition-colors ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>{donation.title}</h3>
          <p className={`text-sm mb-5 line-clamp-2 leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>{donation.description}</p>

          <div className={`mt-auto space-y-3 pt-4 border-t ${
            theme === 'light' ? 'border-gray-50' : 'border-gray-700'
          }`}>
            <div className={`flex items-center text-sm font-medium ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <MapPinIcon className="w-5 h-5 mr-2.5 text-blue-400" />
              <span className="truncate">{donation.pickupLocation}</span>
            </div>
            <div className={`flex items-center text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <ClockIcon className={`w-5 h-5 mr-2.5 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span>Expires: <span className="text-red-500 font-bold">{new Date(donation.expirationDate).toLocaleDateString()}</span></span>
            </div>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            disabled={isReserved}
            className={`w-full mt-6 py-3 px-4 rounded-xl font-bold transition-all active:scale-[0.98] ${
              isReserved
                ? theme === 'light'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : `bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all ${
                    theme === 'light' ? 'shadow-blue-200 hover:shadow-blue-300' : 'shadow-blue-900 hover:shadow-blue-950'
                  }`
            }`}
          >
            {isReserved ? 'Already Reserved' : 'Reserve Donation'}
          </button>
        </div>
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