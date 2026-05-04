import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
}

const sizeMap = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
};

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 'md',
  showValue = false,
  reviewCount,
  interactive = false,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex gap-0.5" role={interactive ? 'radiogroup' : undefined}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(display);
          const Icon = filled ? StarIconSolid : StarIcon;
          const cls = `${sizeMap[size]} ${filled ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'} ${
            interactive ? 'cursor-pointer transition-transform hover:scale-110' : ''
          }`;
          return interactive ? (
            <button
              type="button"
              key={star}
              onClick={() => onChange?.(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none focus:ring-2 focus:ring-amber-400/40 rounded"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              <Icon className={cls} />
            </button>
          ) : (
            <Icon key={star} className={cls} />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          {value > 0 ? value.toFixed(1) : '—'}
          {typeof reviewCount === 'number' && (
            <span className="ml-1 font-medium text-gray-400 dark:text-gray-500">
              ({reviewCount})
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default StarRating;
