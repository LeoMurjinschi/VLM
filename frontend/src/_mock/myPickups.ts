export interface Pickup {
  id: number;
  title: string;
  donor: string;
  category: string;
  quantity: string;
  address: string;
  mapEmbedUrl: string;
  expiresIn: string;
  deadlineTimestamp: Date;
  status: 'In preparation' | 'Ready for pickup' | 'Urgent' | 'Confirmed' | 'Completed';
  image: string;
}

export const MOCK_ACTIVE_PICKUPS: Pickup[] = [
  { id: 101, title: 'Fresh Meat & Poultry', donor: 'Carrefour Market', category: '🥩 Meat', quantity: '8 kg', address: 'Soseaua Pipera 42, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '45 mins', deadlineTimestamp: new Date(Date.now() + 45 * 60000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bd682f?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 102, title: 'Lunch Menu (Catering Excess)', donor: 'La Mama Restaurant', category: '🍲 Cooked Meals', quantity: '20 portions', address: 'Strada Episcopiei 1, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Strada%20Episcopiei%201,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '2 hours', deadlineTimestamp: new Date(Date.now() + 120 * 60000), status: 'Ready for pickup', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 103, title: 'Artisan Bakery Products', donor: 'Paul Bakery', category: '🥐 Bakery', quantity: '50 pieces', address: 'Piata Romana 9, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '3 hours', deadlineTimestamp: new Date(Date.now() + 180 * 60000), status: 'In preparation', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 104, title: 'Artisan Bakery Products', donor: 'Paul Bakery', category: '🥐 Bakery', quantity: '50 pieces', address: 'Piata Romana 9, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '3 hours', deadlineTimestamp: new Date(Date.now() + 180 * 60000), status: 'In preparation', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400' }
];
