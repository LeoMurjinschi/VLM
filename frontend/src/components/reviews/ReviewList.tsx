import React, { useMemo, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ReviewCard from './ReviewCard';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import type { Review } from '../../_mock/reviews';

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
}

type SortBy = 'recent' | 'highest' | 'lowest';

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading }) => {
  const { theme } = useTheme();
  const [sortBy, setSortBy] = useState<SortBy>('recent');

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sortBy === 'highest') return list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'lowest') return list.sort((a, b) => a.rating - b.rating);
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [reviews, sortBy]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-32 rounded-2xl animate-pulse ${
              theme === 'light' ? 'bg-gray-100' : 'bg-[#1a1a1a]'
            }`}
          />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div
        className={`py-14 flex flex-col items-center justify-center border border-dashed rounded-2xl ${
          theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}
      >
        <ChatBubbleBottomCenterTextIcon
          className={`w-10 h-10 mb-3 ${theme === 'light' ? 'text-gray-300' : 'text-gray-700'}`}
        />
        <p className={`font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          No reviews yet
        </p>
        <p className={`text-sm mt-1 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
          Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-bold uppercase tracking-wider ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className={`text-xs font-semibold rounded-lg px-3 py-1.5 border outline-none focus:ring-2 focus:ring-[#16a34a]/30 ${
            theme === 'light'
              ? 'bg-white border-gray-200 text-gray-700'
              : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-200'
          }`}
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <div className="space-y-3">
        {sorted.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
