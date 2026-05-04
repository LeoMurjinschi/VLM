export type CommentTargetType = 'donor' | 'stock';

export interface Comment {
  id: string;
  targetType: CommentTargetType;
  targetId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'donor' | 'receiver' | 'admin';
  text: string;
  date: string;
  likes: number;
  parentCommentId?: string;
}

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    targetType: 'donor',
    targetId: 'donor1',
    authorId: 'rec1',
    authorName: 'Save the Children',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    text: 'Working with you has been a privilege. Looking forward to our next pickup! 🙌',
    date: '2026-04-22T10:15:00Z',
    likes: 4,
  },
  {
    id: 'c2',
    targetType: 'donor',
    targetId: 'donor1',
    authorId: 'rec3',
    authorName: 'Red Cross Center',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    text: 'Your team is incredibly organized. Easy to coordinate.',
    date: '2026-04-19T16:00:00Z',
    likes: 2,
  },
  {
    id: 'c3',
    targetType: 'stock',
    targetId: '1',
    authorId: 'rec2',
    authorName: 'Local Soup Kitchen',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    text: 'Are these still available for pickup tomorrow morning?',
    date: '2026-04-25T09:30:00Z',
    likes: 0,
  },
  {
    id: 'c4',
    targetType: 'stock',
    targetId: '1',
    authorId: 'donor1',
    authorName: 'Auchan Supermarket',
    authorAvatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
    authorRole: 'donor',
    text: 'Yes! Available until 6pm tomorrow. Just confirm via DM.',
    date: '2026-04-25T11:10:00Z',
    likes: 1,
    parentCommentId: 'c3',
  },
  {
    id: 'c5',
    targetType: 'stock',
    targetId: '1',
    authorId: 'rec2',
    authorName: 'Local Soup Kitchen',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    text: 'Perfect, thank you so much!',
    date: '2026-04-25T11:30:00Z',
    likes: 0,
    parentCommentId: 'c4',
  },
  {
    id: 'c6',
    targetType: 'stock',
    targetId: '2',
    authorId: 'rec1',
    authorName: 'Save the Children',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    text: 'Bread looks fresh! Can we pick up at 5pm?',
    date: '2026-04-26T08:00:00Z',
    likes: 2,
  },
];
