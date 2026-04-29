import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  PencilSquareIcon,
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
import ReviewSummary from '../components/reviews/ReviewSummary';
import ReviewList from '../components/reviews/ReviewList';
import ReviewFormModal from '../components/reviews/ReviewFormModal';
import CommentThread from '../components/comments/CommentThread';
import { useInventory } from '../context/InventoryContext';

const StockDetail: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { donations } = useInventory();
  const { stockId = '1' } = useParams<{ stockId: string }>();

  const item = useMemo(() => donations.find((d) => d.id === stockId) ?? null, [stockId, donations]);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(null);
  const [donor, setDonor] = useState<Awaited<ReturnType<typeof fetchDonorProfile>>>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    const [r, a, d] = await Promise.all([
      fetchReviews('stock', stockId),
      fetchAggregate('stock', stockId),
      item?.donorId ? fetchDonorProfile(item.donorId) : Promise.resolve(null),
    ]);
    setReviews(r);
    setAggregate(a);
    setDonor(d);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockId]);

  const isReceiver = user?.role === 'receiver';
  const isOwnStock = !!user && !!item?.donorId && user.id === item.donorId;

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          Stock item not found.
        </p>
        <Link to=".." className="mt-4 inline-block text-[#16a34a] font-bold hover:underline">
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
      <Link
        to=".."
        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
          theme === 'light' ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'
        }`}
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back
      </Link>

      {/* Item header */}
      <div className={`rounded-3xl border overflow-hidden ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}>
        <div className="grid md:grid-cols-2 gap-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="p-6 sm:p-8 flex flex-col">
            <span className={`self-start px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 ${
              theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-green-400/10 text-green-400'
            }`}>
              {item.category}
            </span>

            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`} style={{ fontFamily: 'var(--font-display)' }}>
              {item.title}
            </h1>

            <p className={`text-sm leading-relaxed mb-4 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {item.description}
            </p>

            {/* Donor card link */}
            {donor && (
              <Link
                to={`../donors/${donor.id}`}
                className={`flex items-center gap-3 p-3 rounded-2xl border mb-4 transition-colors ${
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
                    <p className={`font-bold text-sm truncate ${
                      theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {donor.name}
                    </p>
                    {donor.verified && (
                      <CheckBadgeIcon className="w-4 h-4 text-[#16a34a] shrink-0" />
                    )}
                  </div>
                  <p className={`text-[11px] uppercase tracking-wider font-semibold ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    View profile →
                  </p>
                </div>
              </Link>
            )}

            <div className={`space-y-2 pt-4 border-t mt-auto ${
              theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
            }`}>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                <MapPinIcon className="w-4 h-4 mr-2 text-[#16a34a]" />
                {item.pickupLocation}
              </div>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                Expires {new Date(item.expirationDate).toLocaleDateString()}
              </div>
              <div className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                {item.quantity} {item.unit} available
              </div>
            </div>

            {isReceiver && (
              <button
                onClick={() => setFormOpen(true)}
                className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20 transition-colors"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Review This Item
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="space-y-4">
        <h2
          className={`text-lg font-bold ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Reviews
        </h2>
        {aggregate && <ReviewSummary aggregate={aggregate} />}
        <ReviewList reviews={reviews} loading={loading} />
      </section>

      {/* Comment thread */}
      <section>
        <h2
          className={`text-lg font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Discussion
        </h2>
        <CommentThread
          targetType="stock"
          targetId={item.id}
          readOnly={!user || (user.role === 'donor' && !isOwnStock)}
          title="Questions & replies"
        />
      </section>

      {user && (
        <ReviewFormModal
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          targetType="stock"
          targetId={item.id}
          targetName={item.title}
          authorId={user.id}
          authorName={user.name}
          authorAvatar={user.avatar || ''}
          authorRole={(user.role === 'donor' ? 'donor' : 'receiver') as 'donor' | 'receiver'}
          onSubmitted={load}
        />
      )}
    </div>
  );
};

export default StockDetail;
