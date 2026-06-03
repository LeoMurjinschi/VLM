import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, ClockIcon, ArchiveBoxIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { Donation } from '../_mock';
import { toast } from 'react-toastify';
import { useTheme } from '../hooks/useTheme';
import { createPortal } from 'react-dom';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: Donation;
  onReserve: (id: string, amount: number) => Promise<void>; // Modificat să fie async
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, donation, onReserve }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number | string>(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSafetyWarning, setShowSafetyWarning] = useState(false); // Stare pentru animația de eroare

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Resetăm stările la deschidere
      setShowSuccess(false);
      setShowSafetyWarning(false);
      setQuantity(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isKg = donation.unit.toLowerCase() === 'kg';
  const stepSize = isKg ? 0.1 : 1;

  const handleConfirmReservation = async () => {
    const finalQuantity = Number(quantity);
    
    if (isNaN(finalQuantity) || finalQuantity < (isKg ? 0.1 : 1)) {
      toast.error(`Enter at least ${isKg ? '0.1' : '1'} ${donation.unit} to start helping your community.`);
      setQuantity(isKg ? 0.1 : 1);
      return;
    }

    if (finalQuantity > donation.quantity) {
      toast.error(`Only ${donation.quantity} ${donation.unit} available. Adjust your amount to complete the reservation.`);
      setQuantity(donation.quantity);
      return;
    }

    try {
      // Așteptăm finalizarea rezervării
      await onReserve(donation.id, finalQuantity);
      
      // Dacă a avut succes, afișăm animația de succes
      setShowSuccess(true);
      setTimeout(() => {
        toast.success(`You secured ${finalQuantity} ${donation.unit}! Ready for pickup.`);
        onClose();
      }, 1200);

    } catch (error: any) {
      // Verificăm mesajul de eroare de la backend
      if (error?.response?.data?.message === "Safety commitment not accepted") {
        setShowSafetyWarning(true); // Afișăm animația de eroare
        toast.warn('Please accept the safety commitment before reserving items.');
        
        setTimeout(() => {
          onClose(); // Închidem modalul
          navigate('/receiver/safety'); // Redirecționăm
        }, 1500);
      } else {
        // Eroare generică
        const message = error?.response?.data?.message || error.message || 'Failed to reserve item';
        toast.error(message);
      }
    }
  };

  const handleDecrement = () => {
    const current = Number(quantity) || 0;
    const next = Math.round((current - stepSize) * 10) / 10;
    if (next >= (isKg ? 0.1 : 1)) setQuantity(next);
  };

  const handleIncrement = () => {
    const current = Number(quantity) || 0;
    const next = Math.round((current + stepSize) * 10) / 10;
    if (next <= donation.quantity) setQuantity(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') { setQuantity(''); return; }
    let num = Number(val);
    if (isNaN(num)) return;
    if (!isKg) num = Math.floor(num);
    if (num > donation.quantity) {
      setQuantity(donation.quantity);
    } else {
      setQuantity(num);
    }
  };

  const isMaxReached = Number(quantity) >= donation.quantity;

  if (!isOpen) return null;

  const getCategoryColor = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('fruit')) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    if (lower.includes('baker')) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    if (lower.includes('veg')) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    if (lower.includes('dairy')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    if (lower.includes('cook')) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 transition-opacity ${
          theme === 'light' ? 'bg-black/30' : 'bg-black/50'
        }`}
        onClick={onClose}
      />

      <div className={`relative rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up ${
        theme === 'light'
          ? 'bg-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.2)]'
          : 'bg-[#1a1a1a] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7)]'
      }`}>
        
        {/* Overlay-uri de stare */}
        {(showSuccess || showSafetyWarning) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-sm"
          >
            {showSuccess && (
              <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                <CheckCircleIcon className="w-20 h-20 text-[#16a34a]" />
              </motion.div>
            )}
            {showSafetyWarning && (
              <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                <ExclamationCircleIcon className="w-20 h-20 text-red-500" />
              </motion.div>
            )}
          </motion.div>
        )}

        <div className="relative h-[180px] overflow-hidden flex-shrink-0">
          <img 
            src={donation.image} 
            alt={donation.title} 
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            theme === 'light' ? 'from-white/30' : 'from-[#1a1a1a]/40'
          } to-transparent`} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-5 flex-grow">
          <div className="mb-4">
            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider mb-2 ${getCategoryColor(donation.category)}`}>
              {donation.category}
            </span>
            <h3 className={`text-2xl font-bold leading-tight ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`} style={{ fontFamily: 'var(--font-display)', fontSize: '24px' }}>
              {donation.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-2">
              <ArchiveBoxIcon className="w-4 h-4 text-[#16a34a]" />
              <span className="text-sm font-semibold text-[#16a34a]">
                {donation.quantity} {donation.unit} available
              </span>
            </div>
          </div>

          <p className={`text-[13px] leading-relaxed mb-5 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {donation.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className={`flex items-start gap-2.5 p-3 rounded-xl ${
              theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
            }`}>
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                theme === 'light' ? 'bg-green-100' : 'bg-green-900/30'
              }`}>
                <MapPinIcon className="w-4 h-4 text-[#16a34a]" />
              </div>
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`}>Pickup</p>
                <p className={`text-xs font-semibold truncate ${
                  theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
                }`}>{donation.pickupLocation}</p>
              </div>
            </div>
            
            <div className={`flex items-start gap-2.5 p-3 rounded-xl ${
              theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
            }`}>
              <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                theme === 'light' ? 'bg-amber-100' : 'bg-amber-900/30'
              }`}>
                <ClockIcon className="w-4 h-4 text-[#f59e0b]" />
              </div>
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`}>Expires</p>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 truncate">
                  {new Date(donation.expirationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className={`flex items-center justify-between p-3 rounded-xl mb-5 ${
            theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
          }`}>
            <div>
              <p className={`text-xs font-semibold ${
                theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
              }`}>Select Amount</p>
              <p className={`text-[10px] ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`}>in {donation.unit} (max {donation.quantity})</p>
            </div>
            
            <div className={`inline-flex items-center rounded-full border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#262626] border-[#2e2e2e]'
            }`}>
              <button 
                onClick={handleDecrement}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-lg font-medium transition-colors ${
                  theme === 'light'
                    ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                }`}
              >
                −
              </button>
              
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                min={isKg ? "0.1" : "1"}
                max={donation.quantity}
                step={isKg ? "0.1" : "1"}
                className={`w-12 text-center font-bold text-sm bg-transparent focus:outline-none ${
                  theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
                }`}
              />
              
              <button 
                onClick={handleIncrement}
                disabled={isMaxReached}
                className={`w-9 h-9 flex items-center justify-center rounded-full text-lg font-medium transition-colors ${
                  isMaxReached 
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : theme === 'light'
                      ? 'text-[#16a34a] hover:bg-green-50'
                      : 'text-green-400 hover:bg-green-900/20'
                }`}
              >
                +
              </button>
            </div>
          </div>

          <button 
            onClick={handleConfirmReservation}
            disabled={showSuccess || showSafetyWarning}
            className="group w-full relative overflow-hidden bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3.5 px-4 rounded-full shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] text-sm"
          >
            <span className="relative z-10">Confirm {quantity} {donation.unit}</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer pointer-events-none" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReservationModal;