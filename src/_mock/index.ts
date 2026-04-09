// Poți pune asta într-un fișier separat (ex: types.ts) sau direct în fișierul principal
export interface HistoryRecord {
  id: string;
  title: string;
  donor: string;
  quantity: string;
  pickupDate: string; // ex: "Oct 24, 2023 - 14:30"
  status: 'Completed' | 'Cancelled' | 'Expired';
  image: string;
}


export const mockHistoryData: HistoryRecord[] = [
  {
    id: 'h1',
    title: 'Kvelb srl',
    donor: 'Murjiinski Leonea',
    quantity: '15 kg',
    pickupDate: 'Oct 24, 2023 - 14:30',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 'h2',
    title: 'Bakery ',
    donor: 'Paul Bakery',
    quantity: '5 kg',
    pickupDate: 'Oct 20, 2023 - 19:00',
    status: 'Cancelled',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 'h3',
    title: 'Dairy & Milk Cartons',
    donor: 'Mega Image',
    quantity: '12 Liters',
    pickupDate: 'Oct 15, 2023 - 10:00',
    status: 'Expired',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300&h=300',
  }
];