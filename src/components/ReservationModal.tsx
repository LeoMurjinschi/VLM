import React, { useState } from 'react';
import Modal from './UI/Modal';
import { MapPinIcon, ClockIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import {type Donation } from '../_mock/donations';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: Donation;
  onReserve: (id: string, amount: number) => void; 
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, donation, onReserve }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleConfirmReservation = () => {
 
    onReserve(donation.id, quantity);
    

    setQuantity(1);
    onClose();
  };

  const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrement = () => setQuantity(Math.min(donation.quantity, quantity + 1));

  const isMaxReached = quantity >= donation.quantity;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserve Item">

      <div className="flex gap-4 mb-5">
        <img src={donation.image} alt={donation.title} className="w-20 h-20 rounded-xl object-cover shadow-sm border border-gray-100" />
        <div className="flex flex-col justify-center">
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-md uppercase w-max mb-1.5">{donation.category}</span>
          <h3 className="text-base font-extrabold text-gray-900 leading-tight">{donation.title}</h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs font-bold text-emerald-600">
             <ArchiveBoxIcon className="w-3.5 h-3.5" />
             <span>Stock: {donation.quantity} {donation.unit}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl mb-5 border border-gray-100">
        <p className="text-xs text-gray-600 leading-relaxed font-medium">{donation.description}</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
          <div className="bg-blue-50 p-1.5 rounded-lg mr-3"><MapPinIcon className="w-4 h-4 text-blue-600" /></div>
          <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Pickup Location</p><span className="font-bold text-gray-900">{donation.pickupLocation}</span></div>
        </div>
        <div className="flex items-center text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
          <div className="bg-orange-50 p-1.5 rounded-lg mr-3"><ClockIcon className="w-4 h-4 text-orange-500" /></div>
          <div><p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Use Before</p><span className="font-bold text-red-500">{new Date(donation.expirationDate).toLocaleString()}</span></div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-900">Select Amount</label>
          <span className="text-[10px] text-gray-500 font-medium">in {donation.unit} (Max: {donation.quantity})</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200">
          <button onClick={handleDecrement} className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-gray-600 hover:text-blue-600 hover:shadow-sm font-bold transition-all">-</button>
          <span className="text-sm font-extrabold text-gray-900 w-5 text-center">{quantity}</span>
          <button onClick={handleIncrement} disabled={isMaxReached} className={`w-7 h-7 flex items-center justify-center rounded-md font-bold transition-all ${isMaxReached ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'}`}>+</button>
        </div>
      </div>

      <button onClick={handleConfirmReservation} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm">
        Confirm {quantity} {donation.unit}
      </button>
    </Modal>
  );
};

export default ReservationModal;