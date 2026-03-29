import React from 'react';
import { 
  MapPinIcon, 
  ClockIcon, 
  ArchiveBoxIcon, 
  CheckCircleIcon, 
  MapIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

interface ReservationCardProps {
  title: string;
  donor: string;
  quantity: string;
  address: string;
  expiresIn: string;
  status: 'Ready for pickup' | 'In preparation' | 'Urgent' | 'Confirmed' | string;
  image: string;
  onOpenMap: () => void;
  onConfirm?: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  title, donor, quantity, address, expiresIn, status, image, onOpenMap, onConfirm
}) => {
  const { theme } = useTheme();
  const isConfirmed = status === 'Confirmed';

  // Culorile semantice din designul original FoodShare
  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Urgent': 
        return 'bg-red-100 text-red-700 border-red-200';
      case 'In preparation': 
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Ready for pickup': 
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Confirmed': 
        return theme === 'light' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-gray-700 text-gray-400 border-gray-600';
      default: 
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className={`group rounded-2xl border overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col h-full relative z-0
      ${isConfirmed 
        ? theme === 'light' 
          ? 'bg-gray-50/80 border-gray-200 opacity-75' 
          : 'bg-gray-900/80 border-gray-800 opacity-75'
        : theme === 'light'
          ? 'bg-white border-gray-100'
          : 'bg-gray-800 border-gray-700'
      }
    `}>
      
      {/* Imaginea și Badge-ul (Design exact ca în DonationCard) */}
      <div className="relative h-52 w-full overflow-hidden shrink-0">
        <div className={`absolute inset-0 group-hover:bg-black/0 transition-colors z-10 ${
          theme === 'light' ? 'bg-black/5' : 'bg-black/20'
        }`} />
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${isConfirmed ? 'grayscale' : ''}`} 
        />
        <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold border ${getStatusColor(status)} shadow-sm z-20 backdrop-blur-sm`}>
          {status}
        </span>
      </div>

      {/* Conținutul Cardului */}
      <div className="p-6 flex flex-col grow">
        
        {/* Donor Tag (Echivalentul categoriei din DonationCard) */}
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-bold tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase">
            {donor}
          </span>
        </div>

        {/* Titlu */}
        <h3 className={`text-xl font-extrabold mb-4 leading-tight transition-colors ${
          isConfirmed 
            ? theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            : theme === 'light' ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-100 group-hover:text-blue-400'
        }`}>
          {title}
        </h3>

        {/* Detaliile cu Iconițe Heroicons */}
        <div className={`mt-auto space-y-3 pt-4 border-t ${
          theme === 'light' ? 'border-gray-50' : 'border-gray-700'
        }`}>
          <div className={`flex items-center text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            <ArchiveBoxIcon className={`w-5 h-5 mr-2.5 shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
            <span className="truncate">Quantity: <span className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{quantity}</span></span>
          </div>

          <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            <ClockIcon className={`w-5 h-5 mr-2.5 shrink-0 ${status === 'Urgent' ? 'text-red-500' : theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className="truncate">
              Deadline: <span className={`font-bold ${status === 'Urgent' ? 'text-red-500' : ''}`}>{expiresIn}</span>
            </span>
          </div>

          <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            <MapPinIcon className={`w-5 h-5 mr-2.5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className="truncate">{address}</span>
          </div>
        </div>

        {/* Butoane */}
        <div className="flex gap-2 mt-6">
          <button 
            onClick={onOpenMap}
            disabled={isConfirmed}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.98]
              ${isConfirmed 
                ? theme === 'light' 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : theme === 'light'
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
                  : 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50 border border-blue-800'
              } 
            `}
          >
            <MapIcon className="w-4 h-4" />
            <span className="text-sm">Map</span>
          </button>
          
          <button 
            onClick={onConfirm}
            disabled={isConfirmed}
            className={`flex-[1.5] flex items-center justify-center gap-2 px-3 py-2.5 font-bold rounded-xl transition-all duration-200 active:scale-[0.98]
              ${isConfirmed 
                ? theme === 'light'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : theme === 'light'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200/50'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-black/50'
              } 
            `}
          >
            <CheckCircleIcon className="w-4 h-4" />
            <span className="text-sm">{isConfirmed ? 'Picked Up' : 'Pickup'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReservationCard;