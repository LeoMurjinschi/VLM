import React from 'react';
import Modal from './UI/Modal';
import PendingReviewCard from './PendingReviewCard';
import type { PendingReviewDto } from '../api';

interface ReviewSubmitModalProps {
  isOpen: boolean;
  item: PendingReviewDto | null;
  onClose: () => void;
  onSubmit: (reviewId: number, donationId: number, donorId: number, rating: number, comment: string) => Promise<void>;
}

const ReviewSubmitModal: React.FC<ReviewSubmitModalProps> = ({
  isOpen,
  item,
  onClose,
  onSubmit,
}) => {
  if (!item) return null;

  const handleSubmit = async (rating: number, comment: string) => {
    await onSubmit(item.reviewId, item.donationId, item.donorId, rating, comment);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rate your pickup">
      <PendingReviewCard item={item} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default ReviewSubmitModal;
