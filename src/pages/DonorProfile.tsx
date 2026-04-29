import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  CheckBadgeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  GiftIcon,
  ScaleIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import {
  fetchReviews,
  fetchAggregate,
  fetchDonorProfile,
} from '../services/reviewsService';
import type { Review, ReviewAggregate } from '../_mock/reviews';
import { MOCK_DONATIONS } from '../_mock';
import ReviewSummary from '../components/reviews/ReviewSummary';
import ReviewList from '../components/reviews/ReviewList';
import ReviewFormModal from '../components/reviews/ReviewFormModal';
import CommentThread from '../components/comments/CommentThread';
import DonationCard from '../components/DonationCard';
import StockDetailModal from '../components/StockDetailModal';
import type { Donation } from '../_mock';

const DonorProfile: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { donorId = 'donor1' } = useParams<{ donorId: string }>();

  const [profile, setProfile] = useState<Awaited<ReturnType<typeof fetchDonorProfile>>>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [activeStock, setActiveStock] = useState<Donation | null>(null);

  const load = async () => {
    setLoading(true);
    const [p, r, a] = await Promise.all([
      fetchDonorProfile(donorId),
      fetchReviews('donor', donorId),
      fetchAggregate('donor', donorId),
    ]);
    setProfile(p);
    setReviews(r);
    setAggregate(a);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorId]);

  const activeStocks = useMemo(
    () =>
      MOCK_DONATIONS.filter(
        (d) => d.donorId === donorId && d.status === 'Available'
      ),
    [donorId]
  );

  const canReview = user?.role === 'receiver';
  const isOwnProfile = user?.id === donorId;

  const handleChat = () => {
    const base = location.pathname.startsWith('/receiver')
      ? '/receiver/messages'
      : location.pathname.startsWith('/admin')
      ? '/admin/messages'
      : '/donor/messages';
    navigate(`${base}?to=${donorId}`);
  };

  if (!loading && !profile) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          Donor not found.
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

      {/* Profile header — Instagram style */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}
      >
        <div className="h-32 bg-gradient-to-r from-[#16a34a]/80 via-emerald-500/60 to-teal-500/60" />
        <div className="px-6 sm:px-8 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <img
              src={profile?.avatar}
              alt={profile?.name}
              className={`w-24 h-24 rounded-2xl object-cover border-4 shadow-lg ${
                theme === 'light' ? 'border-white' : 'border-[#1a1a1a]'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1
                  className={`text-2xl sm:text-3xl font-bold tracking-tight truncate ${
                    theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {profile?.name}
                </h1>
                {profile?.verified && (
                  <CheckBadgeIcon className="w-6 h-6 text-[#16a34a] shrink-0" />
                )}
              </div>
              <p className={`text-xs font-mono mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                @{profile?.id}
              </p>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {profile?.description}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              {!isOwnProfile && user && (
                <button
                  onClick={handleChat}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20 transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  Chat
                </button>
              )}
              {canReview && (
                <button
                  onClick={() => setFormOpen(true)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    theme === 'light'
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      : 'bg-[#262626] hover:bg-[#333] text-gray-100'
                  }`}
                >
                  <PencilSquareIcon className="w-4 h-4" />
                  Review
                </button>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className={`mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t ${
            theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
          }`}>
            <Stat
              icon={<MapPinIcon className="w-4 h-4" />}
              label="Location"
              value={profile?.location || '—'}
            />
            <Stat
              icon={<CalendarDaysIcon className="w-4 h-4" />}
              label="Member since"
              value={
                profile?.joinedDate
                  ? new Date(profile.joinedDate).toLocaleDateString(undefined, {
                      month: 'short',
                      year: 'numeric',
                    })
                  : '—'
              }
            />
            <Stat
              icon={<GiftIcon className="w-4 h-4" />}
              label="Donations"
              value={profile?.totalDonations?.toString() || '0'}
            />
            <Stat
              icon={<ScaleIcon className="w-4 h-4" />}
              label="Rescued"
              value={`${profile?.totalKgRescued || 0} kg`}
            />
          </div>

          {/* Email row */}
          <div className={`mt-4 flex items-center gap-2 text-xs ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <EnvelopeIcon className="w-3.5 h-3.5" />
            <span>{profile?.id}@vlm.community</span>
          </div>
        </div>
      </div>

      {/* Available Stocks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-lg font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Available Stocks
          </h2>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-[#262626] text-gray-300'
            }`}
          >
            {activeStocks.length} active
          </span>
        </div>

        {activeStocks.length === 0 ? (
          <div
            className={`py-10 text-center rounded-2xl border border-dashed ${
              theme === 'light'
                ? 'bg-gray-50 border-gray-200 text-gray-500'
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-400'
            }`}
          >
            <p className="text-sm font-medium">No active stocks right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeStocks.map((d) => (
              <DonationCard
                key={d.id}
                donation={d}
                onReserve={() => {}}
                canReserve={user?.role === 'receiver'}
                mode="profile"
                onCardClick={(stock) => setActiveStock(stock)}
              />
            ))}
          </div>
        )}
      </section>

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

      {/* Comment thread on profile */}
      <section>
        <h2
          className={`text-lg font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Community Wall
        </h2>
        <CommentThread
          targetType="donor"
          targetId={donorId}
          readOnly={isOwnProfile}
          title="Wall posts"
        />
      </section>

      <StockDetailModal
        isOpen={!!activeStock}
        donation={activeStock}
        onClose={() => setActiveStock(null)}
      />

      {profile && user && (
        <ReviewFormModal
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          targetType="donor"
          targetId={profile.id}
          targetName={profile.name}
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

const Stat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => {
  const { theme } = useTheme();
  return (
    <div>
      <div
        className={`flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider mb-1 ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}
      >
        {icon}
        {label}
      </div>
      <p className={`text-sm font-semibold truncate ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
        {value}
      </p>
    </div>
  );
};

export default DonorProfile;
