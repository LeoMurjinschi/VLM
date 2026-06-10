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
  PhoneIcon,
  HomeIcon,
  LockClosedIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import { fetchReviews, fetchAggregate } from '../services/reviewsService';
import type { Review, ReviewAggregate } from '../_mock/reviews';
import ReviewSummary from '../components/reviews/ReviewSummary';
import ReviewList from '../components/reviews/ReviewList';
import ReviewFormModal from '../components/reviews/ReviewFormModal';
import CommentThread from '../components/comments/CommentThread';
import { userService, receiverProfileService, userStatisticsService } from '../api';
import type { UserInfoDto } from '../api/userService';
import type { ReceiverProfileDto } from '../api/receiverProfileService';
import type { UserStatisticsDto } from '../api/userStatisticsService';

const ReceiverProfile: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { receiverId = '' } = useParams<{ receiverId: string }>();
  const receiverIdNum = parseInt(receiverId, 10);

  const [userInfo, setUserInfo] = useState<UserInfoDto | null>(null);
  const [receiverProfileData, setReceiverProfileData] = useState<ReceiverProfileDto | null>(null);
  const [stats, setStats] = useState<UserStatisticsDto | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregate, setAggregate] = useState<ReviewAggregate | null>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    const [u, rp, s, r, a] = await Promise.allSettled([
      userService.getById(receiverIdNum),
      receiverProfileService.getByUser(receiverIdNum),
      userStatisticsService.getByUser(receiverIdNum),
      fetchReviews('receiver', receiverId),
      fetchAggregate('receiver', receiverId),
    ]);
    if (u.status === 'fulfilled') setUserInfo(u.value);
    if (rp.status === 'fulfilled') setReceiverProfileData(rp.value);
    if (s.status === 'fulfilled') setStats(s.value);
    if (r.status === 'fulfilled') setReviews(r.value);
    if (a.status === 'fulfilled') setAggregate(a.value);
    setLoading(false);
  };

  useEffect(() => {
    if (receiverIdNum) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId]);

  const categories = useMemo(
    () =>
      (receiverProfileData?.acceptedCategories || '')
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean),
    [receiverProfileData]
  );

  const profile = useMemo(() => {
    if (!userInfo) return null;
    return {
      id: receiverId,
      name: userInfo.name,
      avatar: userInfo.avatar || `https://i.pravatar.cc/150?u=${receiverId}`,
      description: receiverProfileData?.missionStatement || userInfo.bio || '',
      location: receiverProfileData?.location || receiverProfileData?.address || '—',
      joinedDate: userInfo.createdDate,
      verified: false,
      email: userInfo.email,
    };
  }, [userInfo, receiverProfileData, receiverId]);

  const canReview = user?.role === 'donor';
  const isOwnProfile = user?.id === receiverId;
  const isAdmin = user?.role === 'admin';
  const isPrivate = receiverProfileData?.isPublic === false && !isOwnProfile && !isAdmin;

  const handleChat = () => {
    const base = location.pathname.startsWith('/receiver')
      ? '/receiver/messages'
      : location.pathname.startsWith('/admin')
      ? '/admin/messages'
      : '/donor/messages';
    navigate(base, {
      state: {
        openChatWith: {
          id: receiverIdNum,
          name: profile?.name ?? receiverId,
          role: 'Receiver',
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#16a34a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          Receiver not found.
        </p>
        <Link to=".." className="mt-4 inline-block text-[#16a34a] font-bold hover:underline">
          ← Back
        </Link>
      </div>
    );
  }

  if (isPrivate) {
    return (
      <div className="max-w-3xl mx-auto p-8 space-y-4 animate-fade-in-up">
        <Link to=".." className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
          theme === 'light' ? 'text-gray-500 hover:text-gray-900' : 'text-gray-400 hover:text-white'
        }`}>
          <ArrowLeftIcon className="w-4 h-4" /> Back
        </Link>
        <div className={`rounded-3xl border p-10 text-center ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <LockClosedIcon className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <h1 className={`text-xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
            {userInfo.name}
          </h1>
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            This profile is private.
          </p>
        </div>
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

      {/* Profile header */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}
      >
        <div className="h-32 bg-gradient-to-r from-blue-500/70 via-emerald-500/60 to-teal-500/60" />
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
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
                  receiver
                </span>
              </div>
              {receiverProfileData?.orgName && (
                <p className={`text-xs font-mono mb-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {receiverProfileData.orgName}
                </p>
              )}
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
              label="Reservations"
              value={String(stats?.totalReservations ?? 0)}
            />
            <Stat
              icon={<ScaleIcon className="w-4 h-4" />}
              label="Total reserved"
              value={`${stats?.totalReserved ?? 0} units`}
            />
          </div>

          {/* Contact rows — phone/address gated by the receiver's visibility settings */}
          <div className={`mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <span className="flex items-center gap-2">
              <EnvelopeIcon className="w-3.5 h-3.5" />
              {profile?.email}
            </span>
            {receiverProfileData?.showPhone && receiverProfileData.phone && (
              <span className="flex items-center gap-2">
                <PhoneIcon className="w-3.5 h-3.5" />
                {receiverProfileData.phone}
              </span>
            )}
            {receiverProfileData?.showAddress && receiverProfileData.address && (
              <span className="flex items-center gap-2">
                <HomeIcon className="w-3.5 h-3.5" />
                {receiverProfileData.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Accepted categories */}
      {categories.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <TagIcon className={`w-5 h-5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`} />
            <h2
              className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Accepted Categories
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span
                key={c}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/20 text-green-400'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
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

      {/* Comment thread */}
      <section>
        <h2
          className={`text-lg font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Community Wall
        </h2>
        <CommentThread
          targetType="receiver"
          targetId={receiverId}
          readOnly={isOwnProfile}
          title="Wall posts"
        />
      </section>

      {profile && user && (
        <ReviewFormModal
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          targetType="receiver"
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

export default ReceiverProfile;
