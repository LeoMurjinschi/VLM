import React, { useState } from 'react';
import Modal from './UI/Modal';
import { MapPinIcon, ClockIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import {type Donation } from '../_mock/donations';
import { useTheme } from '../hooks/useTheme';

import { toast } from 'react-toastify';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: Donation;
  onReserve: (id: string, amount: number) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, donation, onReserve }) => {
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState<number>(1);

  const handleConfirmReservation = () => {
 
    onReserve(donation.id, quantity);
    

    toast.success(`You successfully reserved ${quantity} ${donation.unit} of "${donation.title}"!`);
    

    setQuantity(1);
    onClose();
  };

  const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrement = () => setQuantity(Math.min(donation.quantity, quantity + 1));

  const isMaxReached = quantity >= donation.quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve Item">
      

      <div className="flex gap-4 mb-5">
        <img src={donation.image} alt={donation.title} className={`w-20 h-20 rounded-xl object-cover shadow-sm border ${
          theme === 'light' ? 'border-gray-100' : 'border-gray-700'
        }`} />
        <div className="flex flex-col justify-center">
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-md uppercase w-max mb-1.5">{donation.category}</span>
          <h3 className={`text-base font-extrabold leading-tight ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>{donation.title}</h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs font-bold text-emerald-600">
             <ArchiveBoxIcon className="w-3.5 h-3.5" />
             <span>Stock: {donation.quantity} {donation.unit}</span>
          </div>
        </div>
      </div>

      <div className={`p-3 rounded-xl mb-5 border ${
        theme === 'light'
          ? 'bg-gray-50 border-gray-100'
          : 'bg-gray-700 border-gray-600'
      }`}>
        <p className={`text-xs leading-relaxed font-medium ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        }`}>{donation.description}</p>
      </div>


      <div className="space-y-3 mb-6">
        <div className={`flex items-center text-xs p-2.5 rounded-xl border shadow-sm ${
          theme === 'light'
            ? 'bg-white border-gray-100 text-gray-700'
            : 'bg-gray-800 border-gray-700 text-gray-300'
        }`}>
          <div className={`p-1.5 rounded-lg mr-3 ${
            theme === 'light' ? 'bg-blue-50' : 'bg-gray-700'
          }`}>
            <MapPinIcon className={`w-4 h-4 ${
              theme === 'light' ? 'text-blue-600' : 'text-blue-400'
            }`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`}>Pickup Location</p>
            <span className={`font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-100'
            }`}>{donation.pickupLocation}</span>
          </div>
        </div>
        <div className={`flex items-center text-xs p-2.5 rounded-xl border shadow-sm ${
          theme === 'light'
            ? 'bg-white border-gray-100 text-gray-700'
            : 'bg-gray-800 border-gray-700 text-gray-300'
        }`}>
          <div className={`p-1.5 rounded-lg mr-3 ${
            theme === 'light' ? 'bg-orange-50' : 'bg-gray-700'
          }`}>
            <ClockIcon className={`w-4 h-4 ${
              theme === 'light' ? 'text-orange-500' : 'text-orange-400'
            }`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`}>Use Before</p>
            <span className="font-bold text-red-500">{new Date(donation.expirationDate).toLocaleString()}</span>
          </div>
        </div>
      </div>


      <div className={`mb-6 flex items-center justify-between p-3 border rounded-xl shadow-sm ${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-gray-800 border-gray-700'
      }`}>
        <div className="flex flex-col">
          <label className={`text-xs font-bold ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>Select Amount</label>
          <span className={`text-[10px] font-medium ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>in {donation.unit} (Max: {donation.quantity})</span>
        </div>
        <div className={`flex items-center gap-3 p-1 rounded-lg border ${
          theme === 'light'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-gray-700 border-gray-600'
        }`}>
          <button onClick={handleDecrement} className={`w-7 h-7 flex items-center justify-center rounded-md font-bold transition-all ${
            theme === 'light'
              ? 'bg-white text-gray-600 hover:text-blue-600 hover:shadow-sm'
              : 'bg-gray-600 text-gray-300 hover:text-blue-400 hover:shadow-sm'
          }`}>-</button>
          <span className={`text-sm font-extrabold w-5 text-center ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>{quantity}</span>
          <button onClick={handleIncrement} disabled={isMaxReached} className={`w-7 h-7 flex items-center justify-center rounded-md font-bold transition-all ${
            isMaxReached
              ? theme === 'light'
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
          }`}>+</button>
        </div>
      </div>


      <button onClick={handleConfirmReservation} className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] text-sm shadow-lg ${
        theme === 'light' ? 'shadow-blue-200 hover:shadow-blue-300' : 'shadow-blue-900 hover:shadow-blue-950'
      }`}>
        Confirm {quantity} {donation.unit}
      </button>
    </Modal>
  );
};

export default ReservationModal;