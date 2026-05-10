import React, { useEffect, useState } from 'react';
import {
  HeartIcon,
  PaperAirplaneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import {
  fetchComments,
  postComment,
  likeComment,
  deleteComment,
  buildThread,
  type NestedComment,
} from '../../services/commentsService';
import type { Comment, CommentTargetType } from '../../_mock/comments';

interface CommentThreadProps {
  targetType: CommentTargetType;
  targetId: string;
  readOnly?: boolean;
  title?: string;
  maxHeight?: string;
}

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(iso).toLocaleDateString();
};

const CommentThread: React.FC<CommentThreadProps> = ({
  targetType,
  targetId,
  readOnly = false,
  title = 'Comments',
  maxHeight = '420px',
}) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const load = async () => {
    setLoading(true);
    const data = await fetchComments(targetType, targetId);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetType, targetId]);

  const handlePost = async (parentCommentId?: string, body?: string) => {
    const value = body !== undefined ? body : text;
    if (!user || !value.trim() || posting) return;
    setPosting(true);
    try {
      const created = await postComment({
        targetType,
        targetId,
        authorId: user.id,
        authorName: user.name,
        authorAvatar: user.avatar || '',
        authorRole: (user.role as 'donor' | 'receiver' | 'admin') || 'receiver',
        text: value.trim(),
        parentCommentId,
      });
      setComments((prev) => [...prev, created]);
      if (parentCommentId) {
        setReplyText('');
        setReplyingTo(null);
      } else {
        setText('');
      }
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (id: string) => {
    if (liked.has(id)) return;
    setLiked((prev) => new Set(prev).add(id));
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
    await likeComment(id);
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    const ok = await deleteComment(id, user.id);
    if (ok) {
      setComments((prev) => {
        const removed = new Set<string>([id]);
        let added = true;
        while (added) {
          added = false;
          for (const c of prev) {
            if (c.parentCommentId && removed.has(c.parentCommentId) && !removed.has(c.id)) {
              removed.add(c.id);
              added = true;
            }
          }
        }
        return prev.filter((c) => !removed.has(c.id));
      });
    }
  };

  const canPost = !readOnly && !!user;
  const tree = buildThread(comments);

  const renderNode = (node: NestedComment, depth = 0): React.ReactNode => {
    const isLiked = liked.has(node.id);
    const isOwn = !!user && node.authorId === user.id;
    const isReplying = replyingTo === node.id;
    const indentMax = depth >= 2 ? 2 : depth;

    return (
      <div
        key={node.id}
        className="flex gap-3"
        style={{ marginLeft: indentMax === 0 ? 0 : indentMax === 1 ? 24 : 40 }}
      >
        <img
          src={node.authorAvatar}
          alt={node.authorName}
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div
            className={`px-3 py-2 rounded-2xl rounded-tl-md ${
              theme === 'light' ? 'bg-gray-100' : 'bg-[#262626]'
            }`}
          >
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span
                className={`font-bold text-xs ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}
              >
                {node.authorName}
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded ${
                  node.authorRole === 'donor'
                    ? 'bg-[#16a34a]/10 text-[#16a34a]'
                    : node.authorRole === 'receiver'
                    ? 'bg-blue-500/10 text-blue-500'
                    : 'bg-purple-500/10 text-purple-500'
                }`}
              >
                {node.authorRole}
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed break-words ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-200'
              }`}
            >
              {node.text}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-1 px-2">
            <span
              className={`text-[11px] ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {timeAgo(node.date)}
            </span>
            <button
              onClick={() => handleLike(node.id)}
              disabled={readOnly}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                isLiked
                  ? 'text-red-500'
                  : theme === 'light'
                  ? 'text-gray-500 hover:text-red-500'
                  : 'text-gray-400 hover:text-red-400'
              } disabled:opacity-50`}
            >
              {isLiked ? (
                <HeartSolid className="w-3.5 h-3.5" />
              ) : (
                <HeartIcon className="w-3.5 h-3.5" />
              )}
              {node.likes > 0 && node.likes}
            </button>
            {canPost && (
              <button
                onClick={() => {
                  setReplyingTo(isReplying ? null : node.id);
                  setReplyText('');
                }}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  theme === 'light'
                    ? 'text-gray-500 hover:text-[#16a34a]'
                    : 'text-gray-400 hover:text-[#16a34a]'
                }`}
              >
                <ArrowUturnLeftIcon className="w-3.5 h-3.5" />
                Reply
              </button>
            )}
            {isOwn && (
              <button
                onClick={() => handleDelete(node.id)}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                  theme === 'light'
                    ? 'text-gray-500 hover:text-red-500'
                    : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Delete
              </button>
            )}
          </div>

          {isReplying && (
            <div
              className={`mt-2 flex items-center gap-2 px-2 py-1.5 rounded-xl border ${
                theme === 'light'
                  ? 'border-gray-200 bg-white'
                  : 'border-[#2e2e2e] bg-[#1a1a1a]'
              }`}
            >
              <input
                type="text"
                autoFocus
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handlePost(node.id, replyText);
                  }
                  if (e.key === 'Escape') {
                    setReplyingTo(null);
                    setReplyText('');
                  }
                }}
                placeholder={`Reply to ${node.authorName}...`}
                className={`flex-1 bg-transparent text-sm outline-none ${
                  theme === 'light'
                    ? 'text-gray-900 placeholder-gray-400'
                    : 'text-white placeholder-gray-500'
                }`}
              />
              <button
                onClick={() => handlePost(node.id, replyText)}
                disabled={!replyText.trim() || posting}
                className="p-1.5 rounded-full text-[#16a34a] hover:bg-[#16a34a]/10 transition-colors disabled:opacity-40"
                aria-label="Post reply"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          {node.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {node.replies.map((r) => renderNode(r, depth + 1))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`rounded-2xl border ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-[#2e2e2e]'
      }`}
    >
      <div
        className={`px-5 py-4 border-b flex items-center gap-2 ${
          theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
        }`}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-[#16a34a]" />
        <h3
          className={`font-bold text-sm tracking-wide ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
        >
          {title}
        </h3>
        <span
          className={`ml-auto text-xs font-semibold ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {comments.length}
        </span>
      </div>

      <div
        className="px-5 py-4 overflow-y-auto space-y-4"
        style={{ maxHeight }}
      >
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`h-14 rounded-xl animate-pulse ${
                  theme === 'light' ? 'bg-gray-100' : 'bg-[#222]'
                }`}
              />
            ))}
          </div>
        ) : tree.length === 0 ? (
          <p
            className={`py-8 text-center text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            No comments yet. {canPost && 'Start the conversation.'}
          </p>
        ) : (
          tree.map((n) => renderNode(n))
        )}
      </div>

      {canPost && (
        <div
          className={`px-5 py-3 border-t flex items-center gap-2 ${
            theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
          }`}
        >
          <img
            src={user?.avatar || ''}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 bg-gray-200"
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePost();
              }
            }}
            placeholder="Write a comment..."
            className={`flex-1 bg-transparent text-sm outline-none ${
              theme === 'light'
                ? 'text-gray-900 placeholder-gray-400'
                : 'text-white placeholder-gray-500'
            }`}
          />
          <button
            onClick={() => handlePost()}
            disabled={!text.trim() || posting}
            className="p-2 rounded-full text-[#16a34a] hover:bg-[#16a34a]/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Post comment"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {readOnly && !loading && (
        <div
          className={`px-5 py-2.5 border-t text-[11px] text-center font-medium ${
            theme === 'light'
              ? 'border-gray-100 text-gray-400'
              : 'border-[#2e2e2e] text-gray-500'
          }`}
        >
          Read-only
        </div>
      )}
    </div>
  );
};

export default CommentThread;
