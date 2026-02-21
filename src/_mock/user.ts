export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  avatarInitial: string;
}

export const MOCK_USER: User = {
  id: '1',
  name: 'Mihai Ionescu',
  email: 'mihai.ionescu@example.com',
  role: 'Business Partner',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  avatarInitial: 'M',
};
