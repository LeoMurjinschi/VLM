import { useCallback, useEffect, useState } from 'react';
import { reviewService, type PendingReviewDto } from '../api';
import { toast } from 'react-toastify';

export function usePendingReviews(receiverId: number | undefined) {
  const [pendingReviews, setPendingReviews] = useState<PendingReviewDto[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async (): Promise<PendingReviewDto[]> => {
    if (!receiverId) {
      setPendingReviews([]);
      return [];
    }
    setLoading(true);
    try {
      const list = await reviewService.getPending(receiverId);
      setPendingReviews(list);
      return list;
    } catch (err: any) {
      const detail = err.response?.data || err.message;
      console.error('Failed to load pending reviews', detail);
      toast.error(`Error loading pending reviews: ${detail}`);
      setPendingReviews([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [receiverId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getPendingByDonationId = useCallback(
    (donationId: number) => pendingReviews.find((p) => p.donationId === donationId),
    [pendingReviews]
  );

  const getPendingByReservationId = useCallback(
    (reservationId: number) => pendingReviews.find((p) => p.reservationId === reservationId),
    [pendingReviews]
  );

  const submitReview = useCallback(
    async (
      reviewId: number,
      donationId: number,
      donorId: number,
      receiverIdNum: number,
      rating: number,
      comment: string,
      reservationId?: number
    ) => {
      const payload = {
        donorId,
        receiverId: receiverIdNum,
        donationId,
        reservationId,
        rating,
        text: comment,
      };

      // In our logic, a pending review is tied to a reservation, so we always update.
      // The `reviewId` from a pending review is actually the `reservationId`.
      await reviewService.update(reviewId, payload);

      await refresh();
    },
    [refresh]
  );

  return {
    pendingReviews,
    loading,
    refresh,
    getPendingByDonationId,
    getPendingByReservationId,
    submitReview,
  };
}