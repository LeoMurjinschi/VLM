import React, { useState, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import HistoryHeader from '../components/HistoryHeader';
import HistoryFilters from '../components/HistoryFilters';
import HistoryItem from '../components/HistoryItem';
import ReviewSubmitModal from '../components/ReviewSubmitModal';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import { usePendingReviews } from '../hooks/usePendingReviews';
import type { PendingReviewDto } from '../api';
import type { Reservation } from '../types/reservation';
import { toast } from 'react-toastify';

export interface HistoryRecord {
  id: string;
  donationId: number;
  title: string;
  donor: string;
  quantity: string;
  pickupDate: string;
  status: 'Completed' | 'Cancelled' | 'Expired' | 'Waiting for Receiver';
  image: string;
  pendingReview?: PendingReviewDto;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/vector-1740026651800-93fb37caa211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D';

/** Reservation statuses that belong on History & Status (pickup confirmed or finished). */
const HISTORY_STATUSES = new Set(['donor_confirmed', 'receiver_confirmed', 'completed', 'cancelled']);

const mapStatus = (s: string): 'Completed' | 'Cancelled' | 'Expired' | 'Waiting for Receiver' => {
  if (s === 'completed') return 'Completed';
  if (s === 'receiver_confirmed') return 'Completed';
  if (s === 'cancelled') return 'Cancelled';
  if (s === 'donor_confirmed') return 'Waiting for Receiver';

  return 'Expired';
};

const formatPickupDate = (iso?: string) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ReservationHistory: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { myReservations, loading } = useReservations();
  const userId = user?.id ? Number(user.id) : undefined;
  const { getPendingByReservationId, submitReview } = usePendingReviews(
    user?.role === 'receiver' ? userId : undefined
  );
  const [reviewingItem, setReviewingItem] = useState<PendingReviewDto | null>(null);

  const historyData = useMemo(() => {
    if (!user?.id) return [];

    const mine =
      user.role === 'donor'
        ? myReservations.filter((r) => r.donorId === user.id)
        : myReservations.filter((r) => r.receiverId === user.id);

    return mine
      .filter((r) => HISTORY_STATUSES.has(r.status))
      .sort((a, b) => {
        const dateA = a.receiverConfirmedAt ?? a.completedAt ?? a.reservedAt;
        const dateB = b.receiverConfirmedAt ?? b.completedAt ?? b.reservedAt;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      })
      .map((r): HistoryRecord => {
        const pickupIso = r.receiverConfirmedAt ?? r.completedAt ?? r.reservedAt;
        const reservationId = parseInt(r.id, 10);
        const pendingReview =
          r.status !== 'cancelled' ? getPendingByReservationId(reservationId) : undefined;

        return {
          id: r.id,
          donationId: parseInt(r.stockId, 10),
          title: r.stockTitle,
          donor: r.donorName,
          quantity: `${r.quantityReserved} ${r.unit}`,
          pickupDate: formatPickupDate(pickupIso),
          status: mapStatus(r.status),
          image: r.stockImage || DEFAULT_IMAGE,
          pendingReview,
        };
      });
  }, [myReservations, user?.id, user?.role, getPendingByReservationId]);

  const handleSubmitReview = async (
    reviewId: number,
    donationId: number,
    donorId: number,
    rating: number,
    comment: string,
    reservationId?: number
  ) => {
    if (!userId) return;
    await submitReview(reviewId, donationId, donorId, userId, rating, comment, reservationId);
    toast.success('Thank you! Your review has been submitted.');
    setReviewingItem(null);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All Time');

  const filteredData = useMemo(() => {
    return historyData.filter((item) => {
      // Filtru Search
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donor.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtru Status
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

      // (Aici s-ar adăuga logica reală pentru dateFilter dacă ai avea timestamp-uri reale)
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, dateFilter, historyData]);

  const totalPickups = historyData.filter(i => i.status === 'Completed').length;
  const foodSavedKg = historyData.filter(i => i.status === 'Completed').length * 5;
  const favoriteDonor = historyData[0]?.donor ?? '—';

  return (
    <PageLayout>
      <div className="space-y-6 max-w-7xl mx-auto min-h-screen pb-10">
        
        {/* Zona de Sus (Titlu + Statistici) */}
        <HistoryHeader 
          totalPickups={totalPickups}
          foodSavedKg={foodSavedKg}
          favoriteDonor={favoriteDonor}
        />

        {/* Bara de Filtre */}
        <HistoryFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
        />

        {/* Lista de Istoric sau Empty State */}
        {loading ? (
          <div className={`text-center py-16 rounded-2xl ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Loading history…
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-3 animate-fade-in-up">
            {filteredData.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onRate={
                  item.pendingReview
                    ? () => setReviewingItem(item.pendingReview!)
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed transition-all ${
            theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            <ArchiveBoxXMarkIcon className={`w-16 h-16 mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-gray-600'}`} />
            <p className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              No confirmed pickups yet.
            </p>
            <p className={`text-sm mt-1 text-center max-w-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Donations you have confirmed at pickup will appear here after you complete pickup in My Pickups.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setStatusFilter('All'); setDateFilter('All Time'); }}
              className={`mt-6 px-6 py-2.5 font-bold text-sm rounded-xl transition-all active:scale-[0.98] ${
                theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a] hover:bg-[#16a34a]/20' : 'bg-[#16a34a]/10 text-[#16a34a] border border-[#16a34a]/30 hover:bg-[#16a34a]/20'
              }`}
            >
              Clear Filters
            </button>
          </div>
        )}

        {reviewingItem && (
          <ReviewSubmitModal
            isOpen={!!reviewingItem}
            item={reviewingItem}
            onClose={() => setReviewingItem(null)}
            onSubmit={(reviewId, donationId, donorId, rating, comment) => 
              handleSubmitReview(reviewId, donationId, donorId, rating, comment, reviewingItem.reservationId)
            }
          />
        )}
      </div>
    </PageLayout>
  );
};

export default ReservationHistory;