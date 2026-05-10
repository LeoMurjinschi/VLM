import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import {
  fetchReviews,
  fetchAggregate,
  fetchDonorProfile,
} from '../services/reviewsService';
import type { Review, ReviewAggregate } from '../_mock/reviews';
import type { Donation } from '../_mock';
import ReviewSummary from './reviews/ReviewSummary';
import ReviewList from './reviews/ReviewList';
import CommentThread from './comments/CommentThread';

interface StockDetailModalProps {
  isOpen: boolean;
  donation: Donation | null;
  onClose: () => void;
  onReserve?: (id: string, amount: number) => void;
}

const StockDetailModal: React.FC<StockDetailModalProps> = ({
  isOpen,
  donation,
  onClose,
  onReserve,
}) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(null);
  const [donor, setDonor] = useState<Awaited<ReturnType<typeof fetchDonorProfile>>>(null);
  const [loading, setLoading] = useState(false);
  const [reserveAmount, setReserveAmount] = useState(1);

  useEffect(() => {
    if (!isOpen || !donation) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [r, a, d] = await Promise.all([
        fetchReviews('stock', donation.id),
        fetchAggregate('stock', donation.id),
        donation.donorId ? fetchDonorProfile(donation.donorId) : Promise.resolve(null),
      ]);
      if (!cancelled) {
        setReviews(r);
        setAggregate(a);
        setDonor(d);
        setReserveAmount(1);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isOpen, donation]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !donation) return null;

  const isReceiver = user?.role === 'receiver';
  const isDonor = user?.role === 'donor';
  const isOwnStock = !!user && !!donation.donorId && user.id === donation.donorId;
  const isReserved = donation.status === 'Reserved';
  const canReserve = isReceiver && !isReserved;
  // Donors can only reply to comments on their own posts (read-only top-level)
  const commentsReadOnly = !user || (isDonor && !isOwnStock);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-3xl my-4 rounded-3xl border shadow-2xl overflow-hidden ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10 ${
            theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}
        >
          <h2
            className={`font-bold text-lg truncate ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Stock details
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg ${
              theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#262626]'
            }`}
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 sm:px-7 py-5 space-y-6">
          {/* Item header */}
          <div className="grid md:grid-cols-2 gap-5">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-56 md:h-full object-cover rounded-2xl"
            />
            <div className="flex flex-col">
              <span
                className={`self-start px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 ${
                  theme === 'light'
                    ? 'bg-[#16a34a]/10 text-[#16a34a]'
                    : 'bg-green-400/10 text-green-400'
                }`}
              >
                {donation.category}
              </span>
              <h3
                className={`text-2xl font-bold tracking-tight mb-2 ${
                  theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {donation.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {donation.description}
              </p>

              {donor && (
                <Link
                  to={`../donors/${donor.id}`}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-3 rounded-2xl border mb-3 transition-colors ${
                    theme === 'light'
                      ? 'bg-gray-50 border-gray-200 hover:border-[#16a34a]'
                      : 'bg-[#222] border-[#2e2e2e] hover:border-[#16a34a]'
                  }`}
                >
                  <img
                    src={donor.avatar}
                    alt={donor.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p
                        className={`font-bold text-sm truncate ${
                          theme === 'light' ? 'text-gray-900' : 'text-white'
                        }`}
                      >
                        {donor.name}
                      </p>
                      {donor.verified && (
                        <CheckBadgeIcon className="w-4 h-4 text-[#16a34a] shrink-0" />
                      )}
                    </div>
                    <p
                      className={`text-[11px] uppercase tracking-wider font-semibold ${
                        theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      View profile →
                    </p>
                  </div>
                </Link>
              )}

              <div
                className={`space-y-2 pt-3 border-t mt-auto ${
                  theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
                }`}
              >
                <div
                  className={`flex items-center text-sm ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}
                >
                  <MapPinIcon className="w-4 h-4 mr-2 text-[#16a34a]" />
                  {donation.pickupLocation}
                </div>
                <div
                  className={`flex items-center text-sm ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}
                >
                  <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                  Expires {new Date(donation.expirationDate).toLocaleDateString()}
                </div>
                <div
                  className={`text-sm font-semibold ${
                    theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                  }`}
                >
                  {donation.quantity} {donation.unit} available
                </div>
              </div>

              {canReserve && onReserve && (
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={donation.quantity}
                    value={reserveAmount}
                    onChange={(e) =>
                      setReserveAmount(
                        Math.max(1, Math.min(Number(e.target.value) || 1, donation.quantity))
                      )
                    }
                    className={`w-20 px-3 py-2.5 rounded-xl border text-sm outline-none ${
                      theme === 'light'
                        ? 'bg-white border-gray-200 text-gray-900'
                        : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
                    }`}
                  />
                  <button
                    onClick={() => {
                      onReserve(donation.id, reserveAmount);
                      onClose();
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20"
                  >
                    Reserve {reserveAmount} {donation.unit}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reviews */}
          <section className="space-y-3">
            <h3
              className={`text-base font-bold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Reviews
            </h3>
            {aggregate && <ReviewSummary aggregate={aggregate} />}
            <ReviewList reviews={reviews} loading={loading} />
          </section>

          {/* Comments */}
          <section>
            <h3
              className={`text-base font-bold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Discussion
            </h3>
            <CommentThread
              targetType="stock"
              targetId={donation.id}
              readOnly={commentsReadOnly}
              title="Questions & replies"
              maxHeight="400px"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default StockDetailModal;
