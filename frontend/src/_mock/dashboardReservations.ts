export interface Reservation {
  id: number;
  title: string;
  donor: string;
  category: string;
  quantity: string;
  address: string;
  mapEmbedUrl: string;
  expiresIn: string;
  deadlineTimestamp: Date;
  status: 'Ready for pickup' | 'In preparation' | 'Urgent' | 'Confirmed';
  image: string;
}

export const MOCK_RESERVATIONS: Reservation[] = [
  { id: 1, title: 'Fresh Vegetables & Fruits', donor: 'Auchan Supermarket', category: '🥦 Veggies', quantity: '15 kg', address: 'Bulevardul Moscova 17, Chisinau', mapEmbedUrl: 'https://maps.google.com/maps?q=Bulevardul%20Moscova%2017,%20Chisinau&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '1 hour and 30 mins', deadlineTimestamp: new Date(Date.now() + 90 * 60000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'Lunch Menu (Catering Excess)', donor: 'La Mama Restaurant', category: '🍲 Cooked Meals', quantity: '20 portions', address: 'Strada Episcopiei 1, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Strada%20Episcopiei%201,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '4 hours', deadlineTimestamp: new Date(Date.now() + 240 * 60000), status: 'Ready for pickup', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 3, title: 'Artisan Bakery Products', donor: 'Paul Bakery', category: '🥐 Bakery', quantity: '50 pieces', address: 'Piata Romana 9, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: 'Tomorrow, 10:00 AM', deadlineTimestamp: new Date(Date.now() + 24 * 3600000), status: 'In preparation', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 4, title: 'Dairy & Milk Cartons', donor: 'Mega Image', category: '🥛 Dairy', quantity: '12 Liters', address: 'Bulevardul Unirii 12, Bucuresti', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179657.48512169117!2d25.929007687842777!3d44.43798533728341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest!5e0!3m2!1sen!2sro!4v1715000000000!5m2!1sen!2sro', expiresIn: '2 hours', deadlineTimestamp: new Date(Date.now() + 120 * 60000), status: 'Ready for pickup', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 5, title: 'Assorted Canned Goods', donor: 'Kaufland', category: '🥫 Canned', quantity: '30 cans', address: 'Strada Barbu Vacarescu 120, Bucuresti', mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/4', expiresIn: 'Completed', deadlineTimestamp: new Date(Date.now() - 24 * 3600000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 6, title: 'Kvelb SRL', donor: 'leonicik', category: 'sweets and chocolates', quantity: '8 kg', address: 'Soseaua Pipera 42, Bucuresti', mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/5', expiresIn: '45 mins', deadlineTimestamp: new Date(Date.now() + 45 * 60000), status: 'Urgent', image: 'https://i.pinimg.com/1200x/5c/e2/bb/5ce2bbd3caa6a66d846335fb94c25b7b.jpg' },
  { id: 7, title: 'Galusca market', donor: 'vanecika', category: 'Grocery store', quantity: '8 kg', address: 'Soseaua Pipera 42, Bucuresti', mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/5', expiresIn: '45 mins', deadlineTimestamp: new Date(Date.now() + 45 * 60000), status: 'Urgent', image: 'https://i.pinimg.com/1200x/5c/e2/bb/5ce2bbd3caa6a66d846335fb94c25b7b.jpg' },
  { id: 7, title: 'Fidesco express', donor: 'linella', category: 'Grocery store', quantity: '8 kg', address: 'Soseaua Pipera 42, Bucuresti', mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/5', expiresIn: '45 mins', deadlineTimestamp: new Date(Date.now() + 45 * 60000), status: 'Urgent', image: 'https://i.pinimg.com/1200x/5c/e2/bb/5ce2bbd3caa6a66d846335fb94c25b7b.jpg' }
];

