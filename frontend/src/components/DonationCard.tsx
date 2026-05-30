import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPinIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  MinusIcon,
  PlusIcon,
  CheckIcon,
  MapIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { Donation } from '../_mock';
import ReservationModal from './ReservationModal';
import { useTheme } from '../hooks/useTheme';
import StarRating from './reviews/StarRating';
import { computeAggregate } from '../services/reviewsService';
import CommentPreview from './comments/CommentPreview';
import StockEditModal, { type StockEditPayload } from './StockEditModal';

interface DonationCardProps {
  donation: Donation;
  onReserve: (id: string, amount: number) => void;
  canReserve?: boolean;
  mode?: 'feed' | 'inventory' | 'profile';
  onEdit?: (id: string, payload: StockEditPayload) => void;
  onDelete?: (id: string) => void;
  onQuantityChange?: (id: string, qty: number) => void;
  onStatusChange?: (id: string, status: 'Available' | 'Reserved') => void;
  onCardClick?: (donation: Donation) => void;
  showSafetyWarning?: boolean;
}

const DonationCard: React.FC<DonationCardProps> = ({
  donation,
  onReserve,
  canReserve = true,
  mode = 'feed',
  onEdit,
  onDelete,
  onQuantityChange,
  onStatusChange,
  onCardClick,
  showSafetyWarning = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editOpen, setEditOpen] = useState(false);
  const [draftQty, setDraftQty] = useState<number | string>(donation.quantity);
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

  const [isMapOpen, setIsMapOpen] = useState(false);
  const stockAggregate = useMemo(() => computeAggregate('stock', donation.id), [donation.id]);

  const isReserved = donation.status === 'Reserved';
  const isAvailable = donation.status === 'Available';
  const expiration = new Date(donation.expirationDate).getTime();
  const daysLeft = Math.ceil((expiration - new Date().getTime()) / 86400000);
  const isExpiringSoon = daysLeft <= 1 && daysLeft >= 0;
  const catColors = getCategoryColor(donation.category);

  const navigateToStock = () => {
    const base = location.pathname.startsWith('/receiver')
      ? '/receiver'
      : location.pathname.startsWith('/admin')
      ? '/admin'
      : '/donor';
    navigate(`${base}/stock/${donation.id}`);
  };

  const showCommentPreview = mode === 'feed' || mode === 'profile';
  const showReserveSlide = mode === 'feed';
  const isInventory = mode === 'inventory';
  const draftQtyNum = Number(draftQty);
  const hasQtyChange = !isNaN(draftQtyNum) && draftQtyNum !== donation.quantity;

  const handleCardClick = () => {
    if (onCardClick) onCardClick(donation);
    else if (mode !== 'inventory') navigateToStock();
  };

  const imageUrl = donation.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`group relative rounded-lg overflow-hidden flex flex-col transition-colors cursor-pointer
        ${theme === 'light'
          ? 'bg-white border border-gray-200'
          : 'bg-[#1a1a1a] border border-[#2e2e2e]'
        }
        ${isExpiringSoon ? 'ring-2 ring-amber-400' : ''}
      `}>
        
        {showSafetyWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
            >
              <ExclamationCircleIcon className="w-24 h-24 text-red-600" />
            </motion.div>
          </motion.div>
        )}

        <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
          <img
            src={imageUrl}
            alt={donation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide shadow-sm ${catColors.bg} ${catColors.text}`}>
            {donation.category}
          </span>

          <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${
            isAvailable
              ? 'bg-green-500/80 text-white'
              : 'bg-amber-500/80 text-white'
          }`}>
            {donation.status}
          </span>
        </div>

        <div className="flex flex-col flex-grow p-4 pt-3.5">
          <span className={`self-start px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 ${
            theme === 'light'
              ? 'bg-[#16a34a]/10 text-[#16a34a]'
              : 'bg-green-400/10 text-green-400'
          }`}>
            {donation.category}
          </span>

          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              className={`text-lg font-bold leading-snug ${
                theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
              }`}
              style={{ fontSize: '18px' }}
            >
              {donation.title}
            </h3>
            {stockAggregate.total > 0 && (
              <div
                className="shrink-0 mt-1"
                title={`${stockAggregate.average.toFixed(1)} from ${stockAggregate.total} reviews`}
              >
                <StarRating
                  value={stockAggregate.average}
                  size="sm"
                  showValue
                  reviewCount={stockAggregate.total}
                />
              </div>
            )}
          </div>

          <p className={`text-[13px] mb-3 line-clamp-2 leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {donation.description}
          </p>

          {donation.donorId ? (
            <Link
              to={`../donors/${donation.donorId}`}
              className="flex items-center gap-2 mb-3 group/donor"
              onClick={(e) => e.stopPropagation()}
            >
              {donation.donorAvatar ? (
                <img
                  src={donation.donorAvatar}
                  alt={donation.donorName}
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {(donation.donorName || donation.pickupLocation).charAt(0)}
                </div>
              )}
              <p className={`text-xs font-medium truncate group-hover/donor:underline ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                from {donation.donorName || donation.pickupLocation.split(',')[0]}
              </p>
            </Link>
          ) : (
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
          )}

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

            {donation.mapEmbedUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMapOpen(true);
                }}
                className={`w-full mt-2 px-3 py-2 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 border ${
                  theme === 'light'
                    ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    : 'bg-[#161616] border-[#2e2e2e] text-gray-200 hover:bg-[#1f1f1f]'
                }`}
              >
                <MapIcon className="w-4 h-4" /> View location
              </button>
            )}
          </div>

          {showCommentPreview && (
            <CommentPreview
              targetType="stock"
              targetId={donation.id}
              onSeeMore={navigateToStock}
            />
          )}

          {isInventory && (
            <div
              className="flex items-center gap-2 mt-4 pt-3 border-t"
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: theme === 'light' ? '#f3f4f6' : '#2e2e2e' }}
            >
              <div
                className={`flex-1 flex items-center justify-center gap-1 p-1.5 rounded-xl border ${
                  theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#262626] border-[#2e2e2e]'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setDraftQty((q) => Math.max(0, (Number(q) || 0) - 1))
                  }
                  className={`p-1.5 rounded-lg transition-all ${
                    theme === 'light'
                      ? 'hover:bg-red-50 hover:text-red-600 text-gray-500'
                      : 'hover:bg-red-900/30 hover:text-red-400 text-gray-400'
                  }`}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={draftQty}
                  onChange={(e) => setDraftQty(e.target.value)}
                  className={`w-12 text-center font-bold text-sm bg-transparent focus:outline-none ${
                    theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setDraftQty((q) => (Number(q) || 0) + 1)}
                  className={`p-1.5 rounded-lg transition-all ${
                    theme === 'light'
                      ? 'hover:bg-green-50 hover:text-green-600 text-gray-500'
                      : 'hover:bg-green-900/30 hover:text-green-400 text-gray-400'
                  }`}
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (hasQtyChange) {
                    onQuantityChange?.(donation.id, draftQtyNum);
                  } else {
                    setEditOpen(true);
                  }
                }}
                className={`flex items-center justify-center p-2.5 rounded-xl transition-all active:scale-95 ${
                  hasQtyChange
                    ? 'bg-[#16a34a] text-white shadow-md shadow-green-500/20'
                    : theme === 'light'
                    ? 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-500'
                    : 'bg-[#262626] border border-[#2e2e2e] hover:bg-gray-800 text-gray-400'
                }`}
                aria-label={hasQtyChange ? 'Save quantity' : 'Edit'}
              >
                {hasQtyChange ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <PencilIcon className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  onStatusChange?.(donation.id, isAvailable ? 'Reserved' : 'Available')
                }
                title={isAvailable ? 'Mark as Reserved' : 'Mark as Available'}
                className={`px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 ${
                  isAvailable
                    ? theme === 'light'
                      ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                      : 'bg-amber-900/30 text-amber-300 hover:bg-amber-900/50'
                    : theme === 'light'
                    ? 'bg-green-50 text-green-600 hover:bg-green-100'
                    : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
                }`}
              >
                {isAvailable ? 'Reserve' : 'Free'}
              </button>

              <button
                type="button"
                onClick={() => onDelete?.(donation.id)}
                className={`flex items-center justify-center p-2.5 rounded-xl transition-all active:scale-95 ${
                  theme === 'light'
                    ? 'bg-white border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-500'
                    : 'bg-[#262626] border border-[#2e2e2e] hover:bg-red-900/30 hover:text-red-400 text-gray-400'
                }`}
                aria-label="Delete"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {showReserveSlide && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out border-t ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
            }`}
          >
            <button
              onClick={() => canReserve && setIsModalOpen(true)}
              disabled={isReserved || !canReserve}
              title={!canReserve ? 'Only receiver organizations can reserve donations' : undefined}
              className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all active:scale-[0.98] ${
                isReserved || !canReserve
                  ? theme === 'light'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md shadow-green-500/20'
              }`}
            >
              {isReserved ? 'Already Reserved' : !canReserve ? 'Donors cannot reserve' : 'Reserve Now'}
            </button>
          </div>
        )}

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

      <StockEditModal
        isOpen={editOpen}
        item={donation as any}
        onClose={() => setEditOpen(false)}
        onSave={(payload) => {
          onEdit?.(donation.id, payload);
          setEditOpen(false);
        }}
      />

      {isMapOpen && donation.mapEmbedUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMapOpen(false)}
        >
          <div
            className={`w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border ${
              theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between px-5 py-4 border-b ${
              theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
            }`}>
              <div>
                <p className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Location preview
                </p>
                <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {donation.pickupLocation}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                className={`p-2 rounded-lg ${
                  theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#262626]'
                }`}
                aria-label="Close map preview"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[320px]">
              <iframe
                src={donation.mapEmbedUrl}
                title={`Map of ${donation.pickupLocation}`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={`px-5 py-4 border-t ${
              theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
            }`}>
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                className="w-full px-4 py-2 rounded-2xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-all"
              >
                Close map
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationCard;