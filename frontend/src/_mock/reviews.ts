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

export const MOCK_REVIEWS: Review[] = [];

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
