export const DONATION_CATEGORIES = [
  'Vegetables', 
  'Fruits', 
  'Bakery', 
  'Cooked Food', 
  'Dairy'
];

export interface Donation {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Available' | 'Reserved';
  pickupLocation: string;
  expirationDate: string;
  postedAt: string;
  image: string;
  quantity: number;
  unit: string;
}

export const MOCK_DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Fresh Bio Apples',
    description: 'A box of red apples, slightly bruised but perfectly edible. Great for pies or compote. Need to be picked up today.',
    category: 'Fruits',
    status: 'Available',
    pickupLocation: 'Green Valley Market, Sector 1',
    expirationDate: '2026-03-01T18:00:00Z',
    postedAt: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 15,
    unit: 'kg'
  },
  {
    id: '2',
    title: 'Daily Bread Surplus',
    description: 'Mixed artisan bread loaves from today\'s batch. Sourdough and whole wheat available.',
    category: 'Bakery',
    status: 'Available',
    pickupLocation: 'Artisan Bakery, Center',
    expirationDate: '2026-02-23T20:00:00Z',
    postedAt: '30 mins ago',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 20,
    unit: 'bucăți'
  },
  {
    id: '3',
    title: 'Carrots & Potatoes',
    description: 'Leftover stock from local farm delivery. Needs to be cooked soon.',
    category: 'Vegetables',
    status: 'Reserved',
    pickupLocation: 'Farm Connect Warehouse',
    expirationDate: '2026-02-24T12:00:00Z',
    postedAt: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 50,
    unit: 'kg'
  },
  {
    id: '4',
    title: 'Lunch Menu Soups',
    description: 'Vegetable cream soup portions prepared for lunch but not sold. Kept at safe temperatures.',
    category: 'Cooked Food',
    status: 'Available',
    pickupLocation: 'Bistro 44',
    expirationDate: '2026-02-22T22:00:00Z',
    postedAt: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 12,
    unit: 'porții'
  }
];