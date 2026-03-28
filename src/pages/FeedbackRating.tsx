import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import PageLayout from '../components/PageLayout';
import PendingReviewCard from '../components/PendingReviewCard';
import CompletedReviewCard from '../components/CompletedReviewCard';
import { MOCK_FEEDBACK, type FeedbackRecord } from './../_mock/feedback';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify'; // 1. Am importat toast-ul

const FeedbackRating: React.FC = () => {
  const { theme } = useTheme();
  
  const [feedbackData, setFeedbackData] = useState<FeedbackRecord[]>(MOCK_FEEDBACK);
  const [activeTab, setActiveTab] = useState<'Pending' | 'Completed'>('Pending');

 // Funcția care "trimite" feedback-ul
  const handleSubmitReview = (id: string, rating: number, comment: string, tags: string[]) => {
    setFeedbackData((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, status: 'completed', rating, comment, tags } : item
      )
    );
    toast.success('Thank you! Your feedback has been submitted. ⭐');
  };

  const pendingReviews = feedbackData.filter(f => f.status === 'pending');
  const completedReviews = feedbackData.filter(f => f.status === 'completed');

  return (
    <PageLayout>
      <div className={`max-w-4xl mx-auto min-h-screen w-full pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        {/* Header-ul Paginii */}
        <div className={`p-6 md:p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          theme === 'light' ? 'bg-white shadow-sm border border-gray-100' : 'bg-gray-800 border border-gray-700'
        }`}>
          <div>
            <h1 className={`text-3xl font-extrabold tracking-tight mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Feedback & Rating
            </h1>
            <p className={`text-base ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Your feedback builds trust and helps donors improve.
            </p>
          </div>
          
          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${theme === 'light' ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-900/20 text-emerald-400'}`}>
            <CheckBadgeIcon className="w-8 h-8" />
            <div>
              <div className="text-2xl font-black leading-none">{completedReviews.length}</div>
              <div className="text-xs font-bold uppercase tracking-wider">Reviews Given</div>
            </div>
          </div>
        </div>

        
        {/* Tab-uri (Box cu lățime egală 50/50) */}
        <div className="flex gap-2 mb-6 px-2 w-full max-w-md">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm text-center transition-all ${
              activeTab === 'Pending' 
                ? 'bg-blue-600 text-white shadow-md' 
                : theme === 'light' ? 'text-gray-600 hover:bg-gray-200 bg-gray-100' : 'text-gray-400 hover:bg-gray-800 bg-gray-800/50'
            }`}
          >
            To Review ({pendingReviews.length})
          </button>
          <button
            onClick={() => setActiveTab('Completed')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm text-center transition-all ${
              activeTab === 'Completed' 
                ? 'bg-blue-600 text-white shadow-md' 
                : theme === 'light' ? 'text-gray-600 hover:bg-gray-200 bg-gray-100' : 'text-gray-400 hover:bg-gray-800 bg-gray-800/50'
            }`}
          >
            History
          </button>
        </div>

        {/* Randarea Listei */}
        <div className="space-y-4 px-2 animate-fade-in-up">
          {activeTab === 'Pending' ? (
            pendingReviews.length > 0 ? (
              pendingReviews.map((item) => (
                <PendingReviewCard key={item.id} item={item} onSubmit={handleSubmitReview} />
              ))
            ) : (
              <div className={`text-center py-20 rounded-2xl border-2 border-dashed ${theme === 'light' ? 'border-gray-200 text-gray-400' : 'border-gray-700 text-gray-500'}`}>
                <p className="font-bold text-lg">All caught up!</p>
                <p className="text-sm">You have no pending reviews.</p>
              </div>
            )
          ) : (
            completedReviews.length > 0 ? (
              completedReviews.map((item) => (
                <CompletedReviewCard key={item.id} item={item} />
              ))
            ) : (
              <div className={`text-center py-20 rounded-2xl border-2 border-dashed ${theme === 'light' ? 'border-gray-200 text-gray-400' : 'border-gray-700 text-gray-500'}`}>
                <p className="text-sm">No review history yet.</p>
              </div>
            )
          )}
        </div>

      </div>
    </PageLayout>
  );
};

export default FeedbackRating;