import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import type { FeedbackRecord } from './../_mock/feedback'; 

const CompletedReviewCard: React.FC<{ item: FeedbackRecord }> = ({ item }) => {
  const { theme } = useTheme();
  const isPositive = (item.rating || 0) >= 4;

  return (
    <div className={`p-5 flex flex-col sm:flex-row gap-5 rounded-2xl border ${
      theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
    }`}>
      <img src={item.image} alt={item.donationTitle} className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl shrink-0 grayscale opacity-80" />

      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`text-base font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>
            {item.donationTitle}
          </h3>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarSolid key={star} className={`w-4 h-4 ${star <= (item.rating || 0) ? (isPositive ? 'text-yellow-400' : 'text-orange-400') : (theme === 'light' ? 'text-gray-200' : 'text-gray-700')}`} />
            ))}
          </div>
        </div>
        
        <p className={`text-xs font-medium mb-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
          From {item.donorName} • {item.date}
        </p>

        {/* Aici afișăm Smart Tags-urile alese anterior */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.map(tag => (
              <span key={tag} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                isPositive 
                  ? (theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-[#16a34a]/10 text-green-400') 
                  : (theme === 'light' ? 'bg-orange-50 text-orange-700' : 'bg-orange-900/30 text-orange-400')
              }`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {item.comment && (
          <div className={`p-3 rounded-xl text-sm italic border-l-2 ${
            theme === 'light' ? 'bg-gray-50 text-gray-600 border-gray-300' : 'bg-[#222222] text-gray-400 border-[#2e2e2e]'
          }`}>
            "{item.comment}"
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedReviewCard;