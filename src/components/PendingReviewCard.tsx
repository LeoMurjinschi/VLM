import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import type { FeedbackRecord } from './../_mock/feedback'; 

interface PendingReviewCardProps {
  item: FeedbackRecord;
  onSubmit: (id: string, rating: number, comment: string, tags: string[]) => void;
}

const GOOD_TAGS = ['✅ Ready on time', '✨ Great quality', '🤝 Friendly staff', '📦 Perfect packaging', '📈 Extra amount'];
const BAD_TAGS = ['⏱️ Late pickup', '📦 Poor packaging', '📉 Less quantity', '❌ Quality issues', '💬 Poor communication'];

const PendingReviewCard: React.FC<PendingReviewCardProps> = ({ item, onSubmit }) => {
  const { theme } = useTheme();
  
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Resetăm tag-urile dacă utilizatorul se răzgândește și schimbă de la 5 stele la 2 stele
  const isPositive = rating >= 4;
  useEffect(() => {
    setSelectedTags([]);
  }, [isPositive]);

  const availableTags = rating > 0 ? (isPositive ? GOOD_TAGS : BAD_TAGS) : [];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(item.id, rating, comment, selectedTags);
  };

  return (
    <div className={`p-5 flex flex-col sm:flex-row gap-5 rounded-2xl border transition-all ${
      theme === 'light' ? 'bg-white border-gray-200 hover:border-[#16a34a]/30 hover:shadow-md' : 'bg-[#1a1a1a] border-[#2e2e2e] hover:border-[#16a34a]/50'
    }`}>
      <img src={item.image} alt={item.donationTitle} className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl shrink-0" />

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'}`} style={{ fontFamily: 'var(--font-display)' }}>
              {item.donationTitle}
            </h3>
            <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              From {item.donorName} • {item.date}
            </p>
          </div>
        </div>

        {/* Steluțele Interactive */}
        <div className="flex items-center gap-1 my-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              {star <= (hoveredRating || rating) ? (
                <StarSolid className={`w-8 h-8 ${isPositive || hoveredRating >= 4 ? 'text-yellow-400' : 'text-orange-400'}`} />
              ) : (
                <StarOutline className={`w-8 h-8 ${theme === 'light' ? 'text-gray-300' : 'text-gray-600'}`} />
              )}
            </button>
          ))}
          <span className={`ml-3 text-sm font-bold ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
            {rating > 0 ? `${rating}/5 Selected` : 'Tap a star to rate'}
          </span>
        </div>

        {/* Smart Tags & Textarea (Apar doar după ce dă o stea) */}
        {rating > 0 && (
          <div className="mt-2 animate-fade-in flex flex-col gap-3">
            
            {/* Butoanele de Tag-uri */}
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      isSelected 
                        ? (isPositive 
                            ? (theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a] border-[#16a34a]/20' : 'bg-[#16a34a]/10 text-green-400 border-[#16a34a]/30')
                            : (theme === 'light' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-orange-900/40 text-orange-400 border-orange-700'))
                        : (theme === 'light' ? 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400' : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400')
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>

            <textarea
              placeholder="Tell us more about your pickup experience (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full p-3 rounded-xl border text-sm resize-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] outline-none transition-colors ${
                theme === 'light' ? 'bg-white border-gray-200 text-gray-800' : 'bg-[#222222] border-[#2e2e2e] text-gray-100'
              }`}
              rows={2}
            />
            <button
              onClick={handleSubmit}
              className="self-end px-6 py-2 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingReviewCard;