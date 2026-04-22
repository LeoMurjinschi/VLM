import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_ADMIN_REVIEWS, type AdminReview } from '../../_mock/adminMockData';
import { toast } from 'react-toastify';
import { 
  TrashIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Modal from '../../components/ui/Modal';

const renderStars = (rating: number) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ? (
          <StarIconSolid key={star} className="w-4 h-4 text-amber-400" />
        ) : (
          <StarIcon key={star} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        )
      ))}
    </div>
  );
};

const AdminReviews: React.FC = () => {
  const { theme } = useTheme();
  
  // Sort naturally: flagged first, then by newest
  const sortedReviews = [...MOCK_ADMIN_REVIEWS].sort((a, b) => {
    if (a.status === 'flagged' && b.status !== 'flagged') return -1;
    if (a.status !== 'flagged' && b.status === 'flagged') return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const [reviews, setReviews] = useState<AdminReview[]>(sortedReviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<AdminReview | null>(null);

  const handleDeleteClick = (review: AdminReview) => {
    setReviewToDelete(review);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (reviewToDelete) {
      setReviews(prev => prev.map(rev => 
        rev.id === reviewToDelete.id ? { ...rev, status: 'deleted' } : rev
      ));
      toast.success('Review has been deleted successfully.');
      setModalOpen(false);
      setReviewToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative animate-fade-in-up">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-6 border-b ${theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'}`}>
        <div>
          <h1 className={`text-3xl font-bold tracking-tight mb-2 ${theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'}`} style={{ fontFamily: 'var(--font-display)' }}>
            Reviews Management
          </h1>
          <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
            Moderate feedback content. Remove fake or toxic reviews from the platform.
          </p>
        </div>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {reviews.map((review) => {
          const isDeleted = review.status === 'deleted';
          const isFlagged = review.status === 'flagged';
          
          return (
            <div key={review.id} className={`relative flex flex-col p-5 rounded-2xl border transition-all ${
              theme === 'light' 
                ? isDeleted ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 shadow-sm'
                : isDeleted ? 'bg-gray-900/30 border-[#2e2e2e] opacity-60' : 'bg-[#1a1a1a] border-[#2e2e2e]'
            } ${isFlagged ? (theme === 'light' ? 'ring-2 ring-red-400/40' : 'ring-2 ring-red-500/50') : ''}`}>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className={`font-bold text-sm leading-tight ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {review.userName}
                    </p>
                    <p className={`text-[11px] font-medium mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Reviewing: <span className="text-violet-500">{review.targetName}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1.5">
                  {renderStars(review.rating)}
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {review.date}
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-xl flex-grow text-sm italic mb-4 leading-relaxed border ${
                theme === 'light' 
                  ? isDeleted ? 'bg-gray-100 border-gray-200 text-gray-500' : 'bg-gray-50 border-gray-100 text-gray-700'
                  : isDeleted ? 'bg-gray-800/50 border-gray-700 text-gray-500' : 'bg-gray-800/30 border-gray-800 text-gray-300'
              }`}>
                {isDeleted ? (
                  <span className="flex items-center gap-2 font-medium">
                    <TrashIcon className="w-4 h-4" /> This review was deleted by an administrator.
                  </span>
                ) : (
                  `"${review.comment}"`
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <div>
                  {isFlagged && !isDeleted && (
                    <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/10 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider border border-red-100 dark:border-red-900/30">
                      <ExclamationTriangleIcon className="w-3.5 h-3.5" /> Flagged
                    </span>
                  )}
                  {review.status === 'approved' && (
                    <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500 font-semibold px-2.5 py-1 text-xs">
                      <CheckCircleIcon className="w-4 h-4" /> Allowed
                    </span>
                  )}
                </div>

                {!isDeleted && (
                  <button
                    onClick={() => handleDeleteClick(review)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                      theme === 'light'
                        ? 'bg-white text-red-600 border-red-100 hover:bg-red-50'
                        : 'bg-transparent text-red-400 border-red-900/30 hover:bg-red-900/20'
                    }`}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete Review
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Delete Review">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <TrashIcon className="h-8 w-8 text-red-600 dark:text-red-500" aria-hidden="true" />
          </div>
          <p className={`text-sm mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Are you sure you want to delete the review by <strong>{reviewToDelete?.userName}</strong>? This action will hide the review from the platform and mark it as deleted.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setModalOpen(false)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
            >
              Delete Review
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminReviews;
