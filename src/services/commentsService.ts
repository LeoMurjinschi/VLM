import { MOCK_COMMENTS, type Comment, type CommentTargetType } from '../_mock/comments';

const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));

const store: Comment[] = [...MOCK_COMMENTS];

export const fetchComments = async (
  targetType: CommentTargetType,
  targetId: string
): Promise<Comment[]> => {
  await delay();
  return store
    .filter((c) => c.targetType === targetType && c.targetId === targetId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const postComment = async (
  input: Omit<Comment, 'id' | 'date' | 'likes'>
): Promise<Comment> => {
  await delay(300);
  const created: Comment = {
    ...input,
    id: `c_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString(),
    likes: 0,
  };
  store.push(created);
  return created;
};

export const likeComment = async (id: string): Promise<Comment | null> => {
  await delay(100);
  const c = store.find((x) => x.id === id);
  if (!c) return null;
  c.likes += 1;
  return c;
};

export const deleteComment = async (id: string, authorId: string): Promise<boolean> => {
  await delay(150);
  const idx = store.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  if (store[idx].authorId !== authorId) return false;
  // Cascade-remove direct replies as well
  const toRemove = new Set<string>([id]);
  let added = true;
  while (added) {
    added = false;
    for (const c of store) {
      if (c.parentCommentId && toRemove.has(c.parentCommentId) && !toRemove.has(c.id)) {
        toRemove.add(c.id);
        added = true;
      }
    }
  }
  for (const rid of toRemove) {
    const i = store.findIndex((c) => c.id === rid);
    if (i !== -1) store.splice(i, 1);
  }
  return true;
};

export interface NestedComment extends Comment {
  replies: NestedComment[];
}

export const buildThread = (comments: Comment[]): NestedComment[] => {
  const byId = new Map<string, NestedComment>();
  comments.forEach((c) => byId.set(c.id, { ...c, replies: [] }));
  const roots: NestedComment[] = [];
  byId.forEach((node) => {
    if (node.parentCommentId && byId.has(node.parentCommentId)) {
      byId.get(node.parentCommentId)!.replies.push(node);
    } else {
      roots.push(node);
    }
  });
  // Roots: newest first; replies: oldest first (chronological)
  roots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  byId.forEach((n) =>
    n.replies.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );
  return roots;
};
