import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import StarRating from './StarRating';
import type { Review } from '../../_mock/reviews';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-5 rounded-2xl border transition-colors ${
        theme === 'light'
          ? 'bg-white border-gray-200 hover:border-gray-300'
          : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-[#3e3e3e]'
      }`}
    >
      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={review.authorAvatar}
            alt={review.authorName}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className={`font-bold text-sm truncate ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {review.authorName}
            </p>
            <p className={`text-[11px] uppercase tracking-wider font-semibold ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {review.authorRole === 'receiver' ? 'Receiver' : 'Donor'} · {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <StarRating value={review.rating} size="md" />
      </div>

      <p className={`text-sm leading-relaxed mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
        {review.comment}
      </p>

      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                theme === 'light'
                  ? 'bg-[#16a34a]/10 text-[#16a34a]'
                  : 'bg-green-400/10 text-green-400'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
