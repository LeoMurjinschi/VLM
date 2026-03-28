import React, { useState } from 'react';
import Modal from './UI/Modal';
import { MapPinIcon, ClockIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import type { Donation } from '../_mock';
import { toast } from 'react-toastify';
import { useTheme } from '../hooks/useTheme';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: Donation;
  onReserve: (id: string, amount: number) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, donation, onReserve }) => {
  const { theme } = useTheme();

  const [quantity, setQuantity] = useState<number | string>(1);

  const handleConfirmReservation = () => {
    const finalQuantity = Number(quantity);
    

    if (isNaN(finalQuantity) || finalQuantity < 1) {
      toast.error('Please enter a valid amount (minimum 1).');
      setQuantity(1);
      return;
    }

    if (finalQuantity > donation.quantity) {
      toast.error(`You cannot reserve more than the available stock (${donation.quantity}).`);
      setQuantity(donation.quantity);
      return;
    }

    onReserve(donation.id, finalQuantity);
    toast.success(`You successfully reserved ${finalQuantity} ${donation.unit} of "${donation.title}"!`);
    
    setQuantity(1);
    onClose();
  };

  const handleDecrement = () => {
    const current = Number(quantity) || 0;
    if (current > 1) setQuantity(current - 1);
  };

  const handleIncrement = () => {
    const current = Number(quantity) || 0;
    if (current < donation.quantity) setQuantity(current + 1);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setQuantity('');
      return;
    }
    
    const num = Number(val);

    if (num > donation.quantity) {
      setQuantity(donation.quantity);
    } else {
      setQuantity(num);
    }
  };

  const isMaxReached = Number(quantity) >= donation.quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve Item">
      

      <div className="flex gap-4 mb-5">
        <img 
          src={donation.image} 
          alt={donation.title} 
          className={`w-20 h-20 rounded-xl object-cover shadow-sm border ${
            theme === 'light' ? 'border-gray-100' : 'border-gray-700'
          }`} 
        />
        <div className="flex flex-col justify-center">
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-md uppercase w-max mb-1.5">
            {donation.category}
          </span>
          <h3 className={`text-base font-extrabold leading-tight ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {donation.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs font-bold text-emerald-600">
             <ArchiveBoxIcon className="w-3.5 h-3.5" />
             <span>Stock: {donation.quantity} {donation.unit}</span>
          </div>
        </div>
      </div>


      <div className={`p-3 rounded-xl mb-5 border ${
        theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-700/50 border-gray-600'
      }`}>
        <p className={`text-xs leading-relaxed font-medium ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          {donation.description}
        </p>
      </div>

   
      <div className="space-y-3 mb-6">
        <div className={`flex items-center text-xs p-2.5 rounded-xl border shadow-sm ${
          theme === 'light' ? 'bg-white border-gray-100 text-gray-700' : 'bg-gray-900 border-gray-600 text-gray-300'
        }`}>
          <div className={`p-1.5 rounded-lg mr-3 ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30'}`}>
            <MapPinIcon className={`w-4 h-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              Pickup Location
            </p>
            <span className={`font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              {donation.pickupLocation}
            </span>
          </div>
        </div>
        
        <div className={`flex items-center text-xs p-2.5 rounded-xl border shadow-sm ${
          theme === 'light' ? 'bg-white border-gray-100 text-gray-700' : 'bg-gray-900 border-gray-600 text-gray-300'
        }`}>
          <div className={`p-1.5 rounded-lg mr-3 ${theme === 'light' ? 'bg-orange-50' : 'bg-orange-900/30'}`}>
            <ClockIcon className={`w-4 h-4 ${theme === 'light' ? 'text-orange-500' : 'text-orange-400'}`} />
          </div>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
              Use Before
            </p>
            <span className="font-bold text-red-500">{new Date(donation.expirationDate).toLocaleString()}</span>
          </div>
        </div>
      </div>

    
      <div className={`mb-6 flex items-center justify-between p-3 border rounded-xl shadow-sm ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-600'
      }`}>
        <div className="flex flex-col">
          <label className={`text-xs font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
            Select Amount
          </label>
          <span className={`text-[10px] font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            in {donation.unit} (Max: {donation.quantity})
          </span>
        </div>
        
        <div className={`flex items-center gap-3 p-1 rounded-lg border ${
          theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-700 border-gray-600'
        }`}>
          <button 
            onClick={handleDecrement} 
            className={`w-7 h-7 flex items-center justify-center rounded-md font-bold transition-all ${
              theme === 'light'
                ? 'bg-white text-gray-600 hover:text-blue-600 hover:shadow-sm'
                : 'bg-gray-600 text-gray-300 hover:text-blue-400 hover:bg-gray-500'
            }`}
          >
            -
          </button>
          
  
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min="1"
            max={donation.quantity}
            className={`w-10 text-center font-extrabold text-sm bg-transparent border-b-2 focus:outline-none focus:border-blue-500 transition-colors hide-arrows ${
              theme === 'light' ? 'text-gray-900 border-gray-300' : 'text-gray-100 border-gray-500'
            }`}
          />
          
          <button 
            onClick={handleIncrement} 
            disabled={isMaxReached}
            className={`w-7 h-7 flex items-center justify-center rounded-md font-bold transition-all ${
              isMaxReached 
                ? theme === 'light' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-900 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            +
          </button>
        </div>
      </div>

 
      <button 
        onClick={handleConfirmReservation} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-200/50 transition-all active:scale-[0.98] text-sm"
      >
        Confirm {quantity} {donation.unit}
      </button>
    </Modal>
  );
};

export default ReservationModal;