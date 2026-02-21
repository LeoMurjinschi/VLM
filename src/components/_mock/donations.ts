
export interface Donation {
  id: string;
  title: string;
  description: string;
  quantity: string;
  category: 'Vegetables' | 'Fruits' | 'Bakery' | 'Cooked Food' | 'Dairy';
  expirationDate: string; 
  postedAt: string;       
  status: 'Available' | 'Reserved' | 'Completed';
  image: string;          
  pickupLocation: string;
}


export const MOCK_DONATIONS: Donation[] = [
  {
    id: '1',
    title: 'Fresh Bio Apples',
    description: 'A box of red apples, slightly bruised but perfectly edible. Great for pies or juice.',
    quantity: '5 kg',
    category: 'Fruits',
    expirationDate: '2026-03-01T18:00:00',
    postedAt: '2 hours ago',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pickupLocation: 'Green Valley Market, Sector 1',
  },
  {
    id: '2',
    title: 'Daily Bread Surplus',
    description: 'Mixed artisan bread loaves from today\'s batch. Sourdough and whole wheat.',
    quantity: '10 loaves',
    category: 'Bakery',
    expirationDate: '2026-02-16T10:00:00',
    postedAt: '30 mins ago',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pickupLocation: 'Artisan Bakery, Center',
  },
  {
    id: '3',
    title: 'Carrots & Potatoes',
    description: 'Leftover stock from local farm delivery. Needs to be cooked soon.',
    quantity: '15 kg',
    category: 'Vegetables',
    expirationDate: '2026-02-20T12:00:00',
    postedAt: '5 hours ago',
    status: 'Reserved', 
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pickupLocation: 'Farm Connect Warehouse',
  },
  {
    id: '4',
    title: 'Lunch Menu Soups',
    description: 'Vegetable cream soup portions prepared for lunch but not sold.',
    quantity: '8 portions',
    category: 'Cooked Food',
    expirationDate: '2026-02-15T22:00:00', 
    postedAt: '1 hour ago',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pickupLocation: 'Bistro 44',
  },
];