export interface FeedbackRecord {
  id: string;
  donorName: string;
  donationTitle: string;
  date: string;
  image: string;
  status: 'pending' | 'completed';
  rating?: number;
  comment?: string;
  tags?: string[]; // <-- AM ADĂUGAT ASTA
}


export const MOCK_FEEDBACK: FeedbackRecord[] = [
  {
    id: 'f1',
    donorName: 'Auchan Supermarket',
    donationTitle: 'Fresh Vegetables & Fruits (15 kg)',
    date: 'Oct 24, 2023 - 14:30',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300&h=300',
    status: 'pending',
  },
  {
    id: 'f2',
    donorName: 'Paul Bakery',
    donationTitle: 'Assorted Pastries (5 kg)',
    date: 'Oct 23, 2023 - 19:00',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300&h=300',
    status: 'pending',
  },
  {
    id: 'f3',
    donorName: 'Mega Image',
    donationTitle: 'Dairy & Milk Cartons',
    date: 'Oct 15, 2023 - 10:00',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300&h=300',
    status: 'completed',
    rating: 5,
    comment: 'Perfect condition! The staff was incredibly helpful and had everything ready on time.',
  },
  {
    id: 'f4',
    donorName: 'La Mama Restaurant',
    donationTitle: 'Cooked Meals (10 portions)',
    date: 'Sep 28, 2023 - 21:00',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=300&h=300',
    status: 'completed',
    rating: 4,
    comment: 'Great quality, but we had to wait 15 minutes past the pickup window.',
  }
];