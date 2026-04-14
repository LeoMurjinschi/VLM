import React from 'react';
import { 
  MapPinIcon, 
  ClockIcon,
  ArchiveBoxIcon,
  MapIcon,
  CheckCircleIcon
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
  // We can consider 'Completed' or 'Confirmed' as disabled states
  const isConfirmed = status === 'Confirmed' || status === 'Completed';
  const isUrgent = status === 'Urgent';

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'Urgent': 
        return 'bg-red-500/80 text-white';
      case 'In preparation': 
        return 'bg-amber-500/80 text-white';
      case 'Ready for pickup': 
        return 'bg-emerald-500/80 text-white';
      case 'Confirmed': 
      case 'Completed':
        return 'bg-gray-500/80 text-white';
      default: 
        return 'bg-blue-500/80 text-white';
    }
  };

  return (
    <div className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out
      hover:-translate-y-1.5 hover:shadow-xl h-full
      ${theme === 'light'
        ? 'bg-white border border-gray-200/80 shadow-sm hover:shadow-gray-200/60'
        : 'bg-[#1a1a1a] border border-[#2e2e2e] shadow-sm hover:shadow-black/30'
      }
      ${isUrgent ? 'ring-2 ring-red-400/40' : ''}
    `}>
      
      {/* Image section */}
      <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isConfirmed ? 'grayscale opacity-75' : ''}`}
        />
        
        {/* Quantity badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide shadow-sm bg-[#16a34a] text-white`}>
          {quantity}
        </span>

        {/* Status badge */}
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-grow p-4 pt-3.5">
        <span className={`self-start px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 ${
          theme === 'light'
            ? 'bg-[#16a34a]/10 text-[#16a34a]'
            : 'bg-green-400/10 text-green-400'
        }`}>
          MY PICKUP
        </span>

        <h3 className={`text-lg font-bold leading-snug mb-1.5 ${
          theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
        }`} style={{ fontSize: '18px' }}>
          {title}
        </h3>

        <div className="flex items-center gap-2 mb-3 mt-1">
          <div className="w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {donor.charAt(0)}
          </div>
          <p className={`text-xs font-medium truncate ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            from {donor}
          </p>
        </div>

        <div className={`mt-auto space-y-2 pt-3 border-t ${
          theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
        }`}>
          <div className={`flex items-center text-[13px] ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <MapPinIcon className="w-4 h-4 mr-2 text-[#16a34a] flex-shrink-0" />
            <span className="truncate">{address}</span>
          </div>
          <div className={`flex items-center text-[13px] ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <ClockIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${isUrgent ? 'text-red-500' : 'text-gray-400'}`} />
            <span>
              Expires:{' '}
              <span className={isUrgent ? 'text-red-500 font-semibold' : ''}>
                {expiresIn}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Slide-up Actions button on hover */}
      <div className={`absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2 ${
        theme === 'light' ? 'bg-white/95 backdrop-blur-sm' : 'bg-[#1a1a1a]/95 backdrop-blur-sm'
      }`}>
        <button 
          onClick={onOpenMap}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 ${
            theme === 'light'
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
          }`}
        >
          <MapIcon className="w-4 h-4" /> Map
        </button>

        <button 
          onClick={onConfirm}
          disabled={isConfirmed}
          className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 ${
            isConfirmed
              ? theme === 'light'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md shadow-green-500/20'
          }`}
        >
          <CheckCircleIcon className="w-4 h-4" /> {isConfirmed ? 'Confirmed' : 'Confirm'}
        </button>
      </div>

      {isUrgent && (
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-red-400 group-hover:opacity-0 transition-opacity" />
      )}
    </div>
  );
};

export default ReservationCard;