import React, { useEffect, useState } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';
import { fetchComments } from '../../services/commentsService';
import type { Comment, CommentTargetType } from '../../_mock/comments';

interface CommentPreviewProps {
  targetType: CommentTargetType;
  targetId: string;
  onSeeMore?: () => void;
  limit?: number;
}

const CommentPreview: React.FC<CommentPreviewProps> = ({
  targetType,
  targetId,
  onSeeMore,
  limit = 3,
}) => {
  const { theme } = useTheme();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchComments(targetType, targetId);
      if (!cancelled) {
        setComments(data);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetType, targetId]);

  if (loading) return null;

  // Top-level only, newest first
  const top = comments
    .filter((c) => !c.parentCommentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (top.length === 0) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSeeMore?.();
        }}
        className={`mt-3 w-full text-left text-[11px] font-semibold inline-flex items-center gap-1.5 ${
          theme === 'light'
            ? 'text-gray-500 hover:text-[#16a34a]'
            : 'text-gray-400 hover:text-[#16a34a]'
        }`}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-3.5 h-3.5" />
        Be the first to comment
      </button>
    );
  }

  const remaining = comments.length - top.length;

  return (
    <div
      className={`mt-3 pt-3 border-t space-y-2 ${
        theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
      }`}
    >
      {top.map((c) => (
        <div key={c.id} className="flex items-start gap-2">
          <img
            src={c.authorAvatar}
            alt={c.authorName}
            className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
          />
          <p
            className={`text-[12px] leading-snug truncate ${
              theme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}
          >
            <span className="font-semibold">{c.authorName}: </span>
            <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
              {c.text}
            </span>
          </p>
        </div>
      ))}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSeeMore?.();
        }}
        className={`text-[11px] font-semibold transition-colors ${
          theme === 'light'
            ? 'text-[#16a34a] hover:text-[#15803d]'
            : 'text-[#16a34a] hover:text-green-400'
        }`}
      >
        {remaining > 0 ? `See ${remaining} more comment${remaining === 1 ? '' : 's'}` : 'See all comments'}
      </button>
    </div>
  );
};

export default CommentPreview;
