import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  CheckBadgeIcon,
  MapPinIcon,
  CalendarDaysIcon,
  GiftIcon,
  ScaleIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import StockDetailModal from '../components/StockDetailModal';
import { MOCK_DONATIONS, type Donation } from '../_mock';
import type { StockEditPayload } from '../components/StockEditModal';
import {
  fetchReviews,
  fetchAggregate,
  fetchDonorProfile,
} from '../services/reviewsService';
import type { Review, ReviewAggregate } from '../_mock/reviews';
import ReviewSummary from '../components/reviews/ReviewSummary';
import ReviewList from '../components/reviews/ReviewList';
import CommentThread from '../components/comments/CommentThread';
import DonationCard from '../components/DonationCard';

const UserProfilePage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const [profile, setProfile] = useState<Awaited<ReturnType<typeof fetchDonorProfile>>>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStock, setActiveStock] = useState<Donation | null>(null);

  const role = user?.role || 'receiver';
  const isDonor = role === 'donor';
  const settingsBase =
    role === 'donor' ? '/donor/settings' : role === 'admin' ? '/admin/settings' : '/receiver/settings';

  const [myStocks, setMyStocks] = useState<Donation[]>([]);
  useEffect(() => {
    if (user && isDonor) {
      setMyStocks(MOCK_DONATIONS.filter((d) => d.donorId === user.id));
    } else {
      setMyStocks([]);
    }
  }, [user, isDonor]);

  const handleEdit = (id: string, payload: StockEditPayload) => {
    setMyStocks((prev) => prev.map((d) => (d.id === id ? { ...d, ...payload } : d)));
    toast.success('Stock updated');
  };
  const handleDelete = (id: string) => {
    setMyStocks((prev) => prev.filter((d) => d.id !== id));
    toast.success('Stock deleted');
  };
  const handleQty = (id: string, qty: number) => {
    setMyStocks((prev) => prev.map((d) => (d.id === id ? { ...d, quantity: qty } : d)));
    toast.success(`Quantity set to ${qty}`);
  };
  const handleStatus = (id: string, status: 'Available' | 'Reserved') => {
    setMyStocks((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    toast.success(`Marked as ${status}`);
  };

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [p, r, a] = await Promise.all([
        isDonor ? fetchDonorProfile(user.id) : Promise.resolve(null),
        isDonor ? fetchReviews('donor', user.id) : Promise.resolve([] as Review[]),
        isDonor ? fetchAggregate('donor', user.id) : Promise.resolve(null),
      ]);
      if (!cancelled) {
        setProfile(p);
        setReviews(r);
        setAggregate(a);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, isDonor]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          You must be logged in to view your profile.
        </p>
      </div>
    );
  }

  const displayName = profile?.name || user.name;
  const displayAvatar =
    profile?.avatar ||
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=16a34a&color=fff`;
  const description =
    profile?.description ||
    (role === 'donor'
      ? 'Donor sharing surplus food with the community.'
      : role === 'receiver'
      ? 'Receiver organization rescuing food for those in need.'
      : 'Platform administrator.');
  const location = profile?.location || '—';
  const joined = profile?.joinedDate
    ? new Date(profile.joinedDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    : 'Recently';
  const donations = profile?.totalDonations ?? (isDonor ? myStocks.length : 0);
  const rescued = profile?.totalKgRescued ?? 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
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
              src={displayAvatar}
              alt={displayName}
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
                  {displayName}
                </h1>
                {profile?.verified && (
                  <CheckBadgeIcon className="w-6 h-6 text-[#16a34a] shrink-0" />
                )}
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                    role === 'donor'
                      ? 'bg-[#16a34a]/10 text-[#16a34a]'
                      : role === 'receiver'
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'bg-purple-500/10 text-purple-500'
                  }`}
                >
                  {role}
                </span>
              </div>
              <p className={`text-xs font-mono mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                @{user.id}
              </p>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {description}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <Link
                to={settingsBase}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                  theme === 'light'
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    : 'bg-[#262626] hover:bg-[#333] text-gray-100'
                }`}
              >
                <Cog6ToothIcon className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div
            className={`mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t ${
              theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
            }`}
          >
            <Stat icon={<MapPinIcon className="w-4 h-4" />} label="Location" value={location} />
            <Stat
              icon={<CalendarDaysIcon className="w-4 h-4" />}
              label="Member since"
              value={joined}
            />
            <Stat
              icon={<GiftIcon className="w-4 h-4" />}
              label="Donations"
              value={donations.toString()}
            />
            <Stat
              icon={<ScaleIcon className="w-4 h-4" />}
              label="Rescued"
              value={`${rescued} kg`}
            />
          </div>

          {/* Email row */}
          <div
            className={`mt-4 flex items-center gap-2 text-xs ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <EnvelopeIcon className="w-3.5 h-3.5" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>

      {/* Available Stocks (donors only) */}
      {isDonor && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              My Stocks
            </h2>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-[#262626] text-gray-300'
              }`}
            >
              {myStocks.length} total
            </span>
          </div>

          {myStocks.length === 0 ? (
            <div
              className={`py-10 text-center rounded-2xl border border-dashed ${
                theme === 'light'
                  ? 'bg-gray-50 border-gray-200 text-gray-500'
                  : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-400'
              }`}
            >
              <p className="text-sm font-medium">You haven't posted any donations yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {myStocks.map((d) => (
                <DonationCard
                  key={d.id}
                  donation={d}
                  onReserve={() => {}}
                  canReserve={false}
                  mode="inventory"
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onQuantityChange={handleQty}
                  onStatusChange={handleStatus}
                  onCardClick={(s) => setActiveStock(s)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Reviews (donors only) */}
      {isDonor && (
        <section className="space-y-4">
          <h2
            className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Reviews
          </h2>
          {aggregate && <ReviewSummary aggregate={aggregate} />}
          <ReviewList reviews={reviews} loading={loading} />
        </section>
      )}

      <StockDetailModal
        isOpen={!!activeStock}
        donation={activeStock}
        onClose={() => setActiveStock(null)}
      />

      {/* Wall comments (Steam-style) */}
      <section>
        <h2
          className={`text-lg font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Community Wall
        </h2>
        <CommentThread
          targetType="donor"
          targetId={user.id}
          readOnly
          title="Wall posts"
        />
      </section>
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
      <p
        className={`text-sm font-semibold truncate ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default UserProfilePage;
