import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../UI/Modal';
import StarRating from './StarRating';
import { useTheme } from '../../hooks/useTheme';
import { REVIEW_TAGS, type ReviewTargetType } from '../../_mock/reviews';
import { submitReview } from '../../services/reviewsService';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: ReviewTargetType;
  targetId: string;
  targetName: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'donor' | 'receiver';
  onSubmitted?: () => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetName,
  authorId,
  authorName,
  authorAvatar,
  authorRole,
  onSubmitted,
}) => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setRating(0);
    setComment('');
    setTags([]);
  };

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please pick a rating before submitting.');
      return;
    }
    if (comment.trim().length < 10) {
      toast.error('Add a few words about your experience (at least 10 characters).');
      return;
    }

    try {
      setSubmitting(true);
      await submitReview({
        targetType,
        targetId,
        targetName,
        authorId,
        authorName,
        authorAvatar,
        authorRole,
        rating,
        comment: comment.trim(),
        tags,
      });
      toast.success('Thanks! Your review helps the community.');
      reset();
      onSubmitted?.();
      onClose();
    } catch {
      toast.error('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Review ${targetName}`}>
      <div className="flex flex-col gap-5">
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Your rating <span className="text-red-500">*</span>
          </label>
          <StarRating value={rating} onChange={setRating} size="lg" interactive />
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            What stood out? <span className={theme === 'light' ? 'text-gray-400' : 'text-gray-500'}>(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {REVIEW_TAGS.map((tag) => {
              const active = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    active
                      ? 'bg-[#16a34a] text-white border-[#16a34a]'
                      : theme === 'light'
                      ? 'bg-white border-gray-200 text-gray-700 hover:border-[#16a34a]'
                      : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-300 hover:border-[#16a34a]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            Your experience <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What was the quality, communication, and pickup like?"
            rows={4}
            className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a] outline-none transition-colors ${
              theme === 'light'
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
            }`}
          />
          <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            Reviews are public and may be moderated by our team.
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            disabled={submitting}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              theme === 'light'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-[#16a34a] hover:bg-[#15803d] text-white shadow-md shadow-green-500/20 disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewFormModal;
