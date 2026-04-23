import React, { useState, useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MOCK_ADMIN_REVIEWS, MOCK_ADMIN_ACCOUNTS, type AdminReview, type AdminAccount } from '../../_mock/adminMockData';
import { toast } from 'react-toastify';
import { 
  TrashIcon,
  StarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShieldExclamationIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ClockIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Modal from '../../components/ui/Modal';

// Extended interface for local UI state
interface LocalAdminReview extends AdminReview {
  isRead: boolean;
}

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

// Custom Dropdown UI component to match the premium design
const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  theme 
}: { 
  options: { label: string, value: string }[], 
  value: string, 
  onChange: (val: string) => void,
  theme: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div 
      className="relative z-20 w-48"
      onBlur={(e) => {
        // Close if focus leaves the dropdown wrapper
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] ${
          theme === 'light' 
            ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50' 
            : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-200 hover:bg-[#222222]'
        }`}
      >
        <span>{selectedOption.label}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1.5 rounded-xl border shadow-lg overflow-hidden animate-fade-in-up ${
          theme === 'light' ? 'bg-white border-gray-100' : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`} style={{ animationDuration: '150ms' }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                value === opt.value
                  ? theme === 'light' ? 'bg-[#8b5cf6]/10 text-[#8b5cf6] font-semibold' : 'bg-[#8b5cf6]/20 text-[#c4b5fd] font-semibold'
                  : theme === 'light' ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminReviews: React.FC = () => {
  const { theme } = useTheme();
  
  const [reviews, setReviews] = useState<LocalAdminReview[]>(
    MOCK_ADMIN_REVIEWS.map((r) => ({ ...r, isRead: r.status === 'approved' || r.status === 'deleted' }))
  );
  
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<LocalAdminReview | null>(null);

  // Deletion form states
  const [deleteReason, setDeleteReason] = useState('');
  const [issueWarning, setIssueWarning] = useState(false);

  // Warn Target form states
  const [warnTargetModalOpen, setWarnTargetModalOpen] = useState(false);
  const [reviewToWarnTarget, setReviewToWarnTarget] = useState<LocalAdminReview | null>(null);
  const [targetWarningReason, setTargetWarningReason] = useState('');

  // Profile view states
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [viewingProfileData, setViewingProfileData] = useState<{name: string, roleType: 'Reviewer' | 'Receiver', avatar?: string, fullAccount: AdminAccount | null} | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [readFilter, setReadFilter] = useState<string>('all');

  const handleDeleteClick = (review: LocalAdminReview) => {
    setReviewToDelete(review);
    setDeleteReason('');
    setIssueWarning(false);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (reviewToDelete) {
      if (!deleteReason.trim()) {
        toast.error('Please provide a reason for deletion.');
        return;
      }

      setReviews(prev => prev.map(rev => 
        rev.id === reviewToDelete.id ? { ...rev, status: 'deleted', isRead: true } : rev
      ));
      
      let toastMsg = 'Review deleted and Reviewer notified.';
      if (issueWarning) toastMsg += ' Warning strike added.';
      
      toast.success(toastMsg);
      setModalOpen(false);
      setReviewToDelete(null);
    }
  };

  const handleWarnTargetClick = (review: LocalAdminReview) => {
    setReviewToWarnTarget(review);
    setTargetWarningReason('');
    setWarnTargetModalOpen(true);
  };

  const confirmWarnTarget = () => {
    if (reviewToWarnTarget) {
      if (!targetWarningReason.trim()) {
        toast.error('Please provide a reason for the warning.');
        return;
      }
      
      setReviews(prev => prev.map(rev => 
        rev.id === reviewToWarnTarget.id ? { ...rev, isRead: true } : rev
      ));
      
      toast.success(`Warning successfully sent to ${reviewToWarnTarget.targetName}. Review marked as read.`);
      setWarnTargetModalOpen(false);
      setReviewToWarnTarget(null);
    }
  };

  const toggleReadStatus = (id: string) => {
    setReviews(prev => prev.map(rev => 
      rev.id === id ? { ...rev, isRead: !rev.isRead } : rev
    ));
  };

  const handleViewProfile = (review: AdminReview, type: 'Reviewer' | 'Receiver') => {
    const profileName = type === 'Reviewer' ? review.userName : review.targetName;
    const fullAccount = MOCK_ADMIN_ACCOUNTS.find(acc => acc.name === profileName) || null;

    setViewingProfileData({
      name: profileName,
      roleType: type,
      avatar: type === 'Reviewer' ? review.userAvatar : fullAccount?.avatar,
      fullAccount: fullAccount
    });
    setProfileModalOpen(true);
  };

  const filteredReviews = useMemo(() => {
    let result = reviews.filter(review => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        review.userName.toLowerCase().includes(searchLower) || 
        review.targetName.toLowerCase().includes(searchLower) ||
        review.comment.toLowerCase().includes(searchLower);
      
      // Status
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      
      // Rating
      const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;

      // Read status
      const matchesRead = readFilter === 'all' || 
        (readFilter === 'read' ? review.isRead : !review.isRead);

      return matchesSearch && matchesStatus && matchesRating && matchesRead;
    });

    // Sort naturally
    return result.sort((a, b) => {
      // Unread first
      if (!a.isRead && b.isRead) return -1;
      if (a.isRead && !b.isRead) return 1;
      // Flagged first
      if (a.status === 'flagged' && b.status !== 'flagged') return -1;
      if (a.status !== 'flagged' && b.status === 'flagged') return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [reviews, searchQuery, statusFilter, ratingFilter, readFilter]);

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

      {/* Filters Bar */}
      <div className={`p-4 rounded-2xl flex flex-col sm:flex-row gap-4 border shadow-sm ${
        theme === 'light' ? 'bg-white border-gray-200/80' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}>
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className={`h-5 w-5 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            placeholder="Search by text, reviewer or target..."
            className={`pl-10 pr-4 py-2 w-full border rounded-xl focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] outline-none transition-all text-sm font-medium ${
              theme === 'light' ? 'bg-white border-gray-200 text-gray-700' : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-100'
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 z-10 relative">
          <CustomDropdown 
            options={[
              { label: 'All View States', value: 'all' },
              { label: '📖 Unread', value: 'unread' },
              { label: '📚 Read', value: 'read' }
            ]}
            value={readFilter}
            onChange={setReadFilter}
            theme={theme}
          />

          <CustomDropdown 
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: '🚨 Flagged', value: 'flagged' },
              { label: '✅ Approved', value: 'approved' },
              { label: '🗑️ Deleted', value: 'deleted' }
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            theme={theme}
          />

          <CustomDropdown 
            options={[
              { label: 'All Ratings', value: 'all' },
              { label: '⭐⭐⭐⭐⭐ 5 Stars', value: '5' },
              { label: '⭐⭐⭐⭐ 4 Stars', value: '4' },
              { label: '⭐⭐⭐ 3 Stars', value: '3' },
              { label: '⭐⭐ 2 Stars', value: '2' },
              { label: '⭐ 1 Star', value: '1' }
            ]}
            value={ratingFilter}
            onChange={setRatingFilter}
            theme={theme}
          />
        </div>
      </div>

      {/* Grid of Reviews */}
      {filteredReviews.length === 0 ? (
         <div className={`py-12 flex flex-col items-center justify-center border border-dashed rounded-2xl ${theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'}`}>
           <p className={`font-semibold ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>No reviews found matching your filters.</p>
           <button onClick={() => { setSearchQuery(''); setStatusFilter('all'); setRatingFilter('all'); setReadFilter('all'); }} className="mt-3 text-sm text-[#8b5cf6] font-bold hover:underline">Clear Filters</button>
         </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {filteredReviews.map((review) => {
            const isDeleted = review.status === 'deleted';
            const isFlagged = review.status === 'flagged';
            const isRead = review.isRead;
            
            return (
              <div key={review.id} className={`relative flex flex-col p-5 rounded-2xl border transition-all ${
                theme === 'light' 
                  ? isDeleted ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 shadow-sm'
                  : isDeleted ? 'bg-gray-900/30 border-[#2e2e2e] opacity-60' : 'bg-[#1a1a1a] border-[#2e2e2e]'
              } ${isFlagged && !isDeleted ? (theme === 'light' ? 'ring-2 ring-red-400/40' : 'ring-2 ring-red-500/50') : ''}
                ${!isRead && !isDeleted ? (theme === 'light' ? 'shadow-md shadow-violet-500/10 border-violet-200' : 'shadow-md shadow-violet-500/10 border-violet-900/50') : ''}
              `}>
                
                {!isRead && !isDeleted && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#8b5cf6] rounded-full border-2 border-white dark:border-[#1a1a1a] animate-pulse"></span>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleViewProfile(review, 'Reviewer')} className="relative focus:outline-none shrink-0 cursor-pointer hover:opacity-80 transition-opacity rounded-full ring-2 ring-transparent hover:ring-[#8b5cf6] overflow-hidden group">
                      <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 object-cover" />
                    </button>
                    <div>
                      <button onClick={() => handleViewProfile(review, 'Reviewer')} className={`font-bold text-sm leading-tight hover:underline focus:outline-none ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {review.userName}
                      </button>
                      <p className={`text-[11px] font-medium mt-0.5 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                        Reviewing: <button onClick={() => handleViewProfile(review, 'Receiver')} className="text-violet-500 hover:text-violet-400 hover:underline inline-flex items-center gap-0.5"><UserIcon className="w-3 h-3" />{review.targetName}</button>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
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
                  <div className="flex items-center gap-2">
                    {isFlagged && !isDeleted && (
                      <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/10 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider border border-red-100 dark:border-red-900/30">
                        <ExclamationTriangleIcon className="w-3.5 h-3.5" /> Flagged
                      </span>
                    )}
                    {review.status === 'approved' && !isDeleted && (
                      <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500 font-semibold px-2.5 py-1 text-xs">
                        <CheckCircleIcon className="w-4 h-4" /> Allowed
                      </span>
                    )}

                    {!isDeleted && (
                      <button 
                        onClick={() => toggleReadStatus(review.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors border ${
                          theme === 'light' 
                            ? isRead ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 border-transparent' : 'bg-violet-50 text-violet-600 hover:bg-violet-100 border-transparent'
                            : isRead ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-transparent' : 'bg-violet-900/20 text-violet-400 hover:bg-violet-900/40 border-violet-900/50'
                        }`}
                      >
                        {isRead ? <EyeSlashIcon className="w-3.5 h-3.5" /> : <EyeIcon className="w-3.5 h-3.5" />}
                        {isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                    )}
                  </div>

                  {!isDeleted && (
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => handleWarnTargetClick(review)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors border ${
                          theme === 'light' 
                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-transparent'
                            : 'bg-amber-900/20 text-amber-400 hover:bg-amber-900/40 border-amber-900/50'
                        }`}
                      >
                         <ShieldExclamationIcon className="w-3.5 h-3.5" />
                         Warn Target
                       </button>

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
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Delete Review">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-500" aria-hidden="true" />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Delete Review by {reviewToDelete?.userName}</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>This review will be permanently removed.</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Reason for Deletion <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Explain why this review violates platform rules..."
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-colors ${
                  theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
                }`}
                rows={3}
              />
              <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>This reason will be visible to the user who wrote it.</p>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    checked={issueWarning}
                    onChange={(e) => setIssueWarning(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-red-600"
                  />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-900 group-hover:text-red-600' : 'text-gray-100 group-hover:text-red-400'}`}>
                    Issue Warning Strike to {reviewToDelete?.userName}
                  </p>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Adds 1 violation to their Moderation Standing.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setModalOpen(false)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
            >
              Delete & Send Notices
            </button>
          </div>
        </div>
      </Modal>

      {/* Profile Details Modal */}
      <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} title="Profile Quick View">
        {viewingProfileData && (
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {viewingProfileData.avatar ? (
                <img src={viewingProfileData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-violet-100 dark:border-violet-900/50" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center border-4 border-violet-50 dark:border-violet-900/50 text-violet-500">
                  <UserIcon className="w-10 h-10" />
                </div>
              )}
              {viewingProfileData.fullAccount?.status === 'inactive' && (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Account Suspended">
                   <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                </span>
              )}
              {viewingProfileData.fullAccount?.status === 'active' && (
                <span className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Active Account">
                   <CheckCircleIcon className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
            
            <h3 className={`text-2xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {viewingProfileData.fullAccount?.name || viewingProfileData.name}
            </h3>
            
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-6 ${
              viewingProfileData.fullAccount?.role === 'donor' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                : viewingProfileData.fullAccount?.role === 'receiver'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                : theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-gray-800 text-gray-400'
            }`}>
              Platform {viewingProfileData.fullAccount?.role || viewingProfileData.roleType}
            </span>

            {/* Full Account Details Details Grid */}
            {viewingProfileData.fullAccount ? (
              <div className="w-full space-y-4">
                
                <div className={`p-4 rounded-xl border grid grid-cols-1 gap-3 ${
                  theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/20 border-gray-800'
                }`}>
                   <div className="flex items-center gap-3">
                     <EnvelopeIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                     <div>
                       <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Email Address</p>
                       <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfileData.fullAccount.email}</p>
                     </div>
                   </div>

                   <div className="flex items-center gap-3">
                     <CalendarDaysIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                     <div>
                       <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Joined Platform</p>
                       <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfileData.fullAccount.joinDate}</p>
                     </div>
                   </div>

                   <div className="flex items-center gap-3">
                     <ClockIcon className={`w-5 h-5 shrink-0 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                     <div>
                       <p className={`text-[10px] uppercase font-bold tracking-wider ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Last Active</p>
                       <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{viewingProfileData.fullAccount.lastActive}</p>
                     </div>
                   </div>
                </div>

                {/* Moderation Standing explicitly mapped from account info */}
                {(() => {
                  const acc = viewingProfileData.fullAccount;
                  const totalInfractions = acc.violations + acc.deletedDonations + acc.deletedReviews;
                  const isClean = totalInfractions === 0;

                  return (
                    <div className={`p-4 rounded-xl border flex flex-col gap-3 ${
                      isClean 
                        ? theme === 'light' ? 'bg-green-50 border-green-200' : 'bg-green-900/10 border-green-900/30'
                        : theme === 'light' ? 'bg-amber-50 border-amber-200' : 'bg-amber-900/10 border-amber-900/30'
                    }`}>
                      <div className="flex items-center gap-3">
                        {isClean ? (
                          <CheckCircleIcon className={`w-8 h-8 shrink-0 ${theme === 'light' ? 'text-green-500' : 'text-green-400'}`} />
                        ) : (
                          <ShieldExclamationIcon className={`w-8 h-8 shrink-0 ${theme === 'light' ? 'text-amber-500' : 'text-amber-400'}`} />
                        )}
                        <div>
                          <p className={`text-sm font-bold ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>Moderation Standing</p>
                          <p className={`text-xs mt-0.5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            {isClean 
                              ? 'User has a pristine record.'
                              : `User has ${totalInfractions} total infractions recorded.`
                            }
                          </p>
                        </div>
                      </div>

                      {!isClean && (
                        <div className={`grid grid-cols-3 gap-2 mt-2 pt-3 border-t ${theme === 'light' ? 'border-amber-200' : 'border-amber-900/30'}`}>
                           <div className="text-center">
                             <p className={`text-lg font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{acc.violations}</p>
                             <p className={`text-[9px] uppercase font-bold tracking-widest ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>Direct Viol</p>
                           </div>
                           <div className="text-center">
                             <p className={`text-lg font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{acc.deletedDonations}</p>
                             <p className={`text-[9px] uppercase font-bold tracking-widest ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>Del Feed</p>
                           </div>
                           <div className="text-center">
                             <p className={`text-lg font-bold ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>{acc.deletedReviews}</p>
                             <p className={`text-[9px] uppercase font-bold tracking-widest ${theme === 'light' ? 'text-amber-600' : 'text-amber-500'}`}>Del Revw</p>
                           </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

              </div>
            ) : (
               <div className={`p-4 rounded-xl w-full border text-center ${theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-gray-800/30 border-gray-800'}`}>
                 <p className={`text-sm italic ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                   Detailed account information is unavailable for this user.
                 </p>
               </div>
            )}

            <div className="mt-8 w-full border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between">
              <button onClick={() => setProfileModalOpen(false)} className={`w-full py-2.5 rounded-lg flex justify-center font-semibold text-sm transition-colors ${
                theme === 'light' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}>
                 Close View
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Warn Target Modal */}
      <Modal isOpen={warnTargetModalOpen} onClose={() => setWarnTargetModalOpen(false)} title="Issue Warning">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
              <ShieldExclamationIcon className="h-6 w-6 text-amber-600 dark:text-amber-500" aria-hidden="true" />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Warn {reviewToWarnTarget?.targetName}</h4>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>The review itself will remain visible, but marked as read.</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Reason for the Warning <span className="text-amber-500">*</span>
              </label>
              <textarea 
                value={targetWarningReason}
                onChange={(e) => setTargetWarningReason(e.target.value)}
                placeholder="Briefly explain the issue (e.g. hygiene constraints breached) based on the reviewer's feedback..."
                className={`w-full p-3 rounded-xl border text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors ${
                  theme === 'light' ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#1a1a1a] border-[#2e2e2e] text-white'
                }`}
                rows={3}
              />
              <p className={`text-[10px] mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>This reason will be sent directly to {reviewToWarnTarget?.targetName} and adds an infraction to their account.</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setWarnTargetModalOpen(false)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmWarnTarget}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-colors bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"
            >
              Issue Warning Strike
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminReviews;
