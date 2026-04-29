import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import StarRating from './StarRating';
import type { ReviewAggregate } from '../../_mock/reviews';

interface ReviewSummaryProps {
  aggregate: ReviewAggregate;
  compact?: boolean;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ aggregate, compact = false }) => {
  const { theme } = useTheme();
  const { average, total, distribution } = aggregate;
  const max = Math.max(1, ...Object.values(distribution));

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <StarRating value={average} size="sm" showValue reviewCount={total} />
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-2xl border ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex flex-col items-center text-center sm:border-r sm:pr-6 sm:min-w-[140px]
          border-gray-100 dark:border-[#2e2e2e]"
        >
          <p className={`text-5xl font-bold tracking-tight ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`} style={{ fontFamily: 'var(--font-display)' }}>
            {total === 0 ? '—' : average.toFixed(1)}
          </p>
          <div className="mt-1.5 mb-1">
            <StarRating value={average} size="md" />
          </div>
          <p className={`text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {total} {total === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="flex-1 w-full space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star as 1 | 2 | 3 | 4 | 5];
            const pct = (count / max) * 100;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className={`w-3 font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {star}
                </span>
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
                }`}>
                  <div
                    className="h-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`w-8 text-right font-medium ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
