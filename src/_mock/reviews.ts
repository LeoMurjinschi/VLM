export type ReviewTargetType = 'donor' | 'stock';

export interface Review {
  id: string;
  targetType: ReviewTargetType;
  targetId: string;
  targetName: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'donor' | 'receiver';
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'flagged' | 'deleted';
  tags?: string[];
}

export interface ReviewAggregate {
  average: number;
  total: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export const REVIEW_TAGS = [
  'On time',
  'Great quality',
  'Friendly staff',
  'Well packaged',
  'Fresh',
  'Easy pickup',
  'Communicative',
  'Quantity matched',
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    targetType: 'donor',
    targetId: 'donor1',
    targetName: 'Auchan Supermarket',
    authorId: 'rec1',
    authorName: 'Save the Children',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 5,
    comment: 'Always reliable. Items were fresh and well-organized for pickup. Staff was incredibly welcoming.',
    date: '2026-04-12',
    status: 'approved',
    tags: ['On time', 'Great quality', 'Friendly staff'],
  },
  {
    id: 'r2',
    targetType: 'donor',
    targetId: 'donor1',
    targetName: 'Auchan Supermarket',
    authorId: 'rec2',
    authorName: 'Local Soup Kitchen',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 4,
    comment: 'Quality is consistent, but the pickup window was tight. Would be great to have more flexibility.',
    date: '2026-04-08',
    status: 'approved',
    tags: ['Great quality', 'Quantity matched'],
  },
  {
    id: 'r3',
    targetType: 'donor',
    targetId: 'donor1',
    targetName: 'Auchan Supermarket',
    authorId: 'rec3',
    authorName: 'Red Cross Center',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 5,
    comment: 'Outstanding partner. Their team coordinated everything smoothly.',
    date: '2026-03-28',
    status: 'approved',
    tags: ['On time', 'Communicative'],
  },
  {
    id: 'r4',
    targetType: 'donor',
    targetId: 'donor2',
    targetName: 'Paul Bakery',
    authorId: 'rec1',
    authorName: 'Save the Children',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 5,
    comment: 'Beautiful artisan bread, kept fresh until pickup. Truly a community-minded donor.',
    date: '2026-04-15',
    status: 'approved',
    tags: ['Fresh', 'Well packaged'],
  },
  {
    id: 'r5',
    targetType: 'stock',
    targetId: '1',
    targetName: 'Fresh Bio Apples',
    authorId: 'rec1',
    authorName: 'Save the Children',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 5,
    comment: 'Apples were in excellent condition, way better than expected from a surplus listing.',
    date: '2026-04-18',
    status: 'approved',
    tags: ['Fresh', 'Quantity matched'],
  },
  {
    id: 'r6',
    targetType: 'stock',
    targetId: '1',
    targetName: 'Fresh Bio Apples',
    authorId: 'rec2',
    authorName: 'Local Soup Kitchen',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 4,
    comment: 'Some bruising but otherwise great quality. Used in compote, kids loved it.',
    date: '2026-04-15',
    status: 'approved',
    tags: ['Great quality'],
  },
  {
    id: 'r7',
    targetType: 'stock',
    targetId: '2',
    targetName: 'Daily Bread Surplus',
    authorId: 'rec3',
    authorName: 'Red Cross Center',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    authorRole: 'receiver',
    rating: 5,
    comment: 'Sourdough still warm at pickup. Beautifully packaged.',
    date: '2026-04-19',
    status: 'approved',
    tags: ['Fresh', 'Well packaged'],
  },
];

export const MOCK_DONOR_PROFILES = [
  {
    id: 'donor1',
    name: 'Donor Company 1',
    description: 'Major retail chain committed to reducing food waste through daily surplus donations.',
    avatar: 'https://i.pravatar.cc/150?u=donor1',
    location: 'Bucharest, Sector 1',
    joinedDate: '2024-03-15',
    totalDonations: 142,
    totalKgRescued: 3850,
    verified: true,
  },
  {
    id: 'donor2',
    name: 'Donor Bakery 2',
    description: 'Artisan bakery donating daily surplus bread and pastries to community partners.',
    avatar: 'https://i.pravatar.cc/150?u=donor2',
    location: 'Bucharest, Center',
    joinedDate: '2024-06-20',
    totalDonations: 87,
    totalKgRescued: 1240,
    verified: true,
  },
  {
    id: 'donor3',
    name: 'Donor Supermarket 3',
    description: 'Local supermarket contributing surplus goods to help reduce food waste.',
    avatar: 'https://i.pinimg.com/736x/fa/8e/28/fa8e28964c40bb0d9b7e8ccf6a07a4b6.jpg',
    location: 'Bucharest, Sector 3',
    joinedDate: '2024-09-01',
    totalDonations: 45,
    totalKgRescued: 680,
    verified: false,
  },
];
