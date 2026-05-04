import React, { useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import type { Reservation } from '../types/reservation';

interface PickupConfirmModalProps {
  reservation: Reservation;
  onConfirm: (actualQty: number) => void;
  onClose: () => void;
}

const PickupConfirmModal: React.FC<PickupConfirmModalProps> = ({ reservation, onConfirm, onClose }) => {
  const { theme } = useTheme();
  const [qty, setQty] = useState(reservation.quantityReserved);
  const isDark = theme === 'dark';

  const handleConfirm = () => {
    const clamped = Math.min(Math.max(0.1, qty), reservation.quantityReserved);
    onConfirm(clamped);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'}`}
        onClick={onClose}
      />
      <div className={`relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up ${
        isDark ? 'bg-[#1a1a1a]' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 pt-6 pb-4 border-b ${isDark ? 'border-[#2e2e2e]' : 'border-gray-100'}`}>
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-widest mb-2 ${
                isDark ? 'bg-green-400/10 text-green-400' : 'bg-[#16a34a]/10 text-[#16a34a]'
              }`}>
                Confirm Pickup
              </span>
              <h3 className={`text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {reservation.stockTitle}
              </h3>
              <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                from {reservation.donorName}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ml-4 flex-shrink-0 ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className={`p-3 rounded-xl text-sm ${isDark ? 'bg-[#222] text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
            <span className="font-semibold">Reserved quantity: </span>
            {reservation.quantityReserved} {reservation.unit}
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Quantity actually received ({reservation.unit})
            </label>
            <input
              type="number"
              min={0.1}
              max={reservation.quantityReserved}
              step={0.1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] outline-none transition-all text-sm font-medium ${
                isDark
                  ? 'bg-[#222] border-[#2e2e2e] text-gray-100'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
            />
            {qty < reservation.quantityReserved && qty > 0 && (
              <p className={`text-xs mt-1.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                The remaining {(reservation.quantityReserved - qty).toFixed(1)} {reservation.unit} will be returned to the feed.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 pb-6 flex gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              isDark
                ? 'bg-[#222] text-gray-300 hover:bg-gray-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={qty <= 0}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-[#16a34a] hover:bg-[#15803d] text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircleIcon className="w-4 h-4" />
            Confirm Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupConfirmModal;
