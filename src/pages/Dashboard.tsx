import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import { MapPinIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import SortDropdown from '../components/SortDropdown';
import PageLayout from '../components/PageLayout';
import ReservationCard from '../components/ReservationCard';

interface Reservation {
  id: number;
  title: string;
  donor: string;
  quantity: string;
  address: string;
  mapEmbedUrl: string;
  expiresIn: string;
  deadlineTimestamp: Date;
  status: 'Ready for pickup' | 'In preparation' | 'Urgent' | 'Confirmed';
  image: string;
}

// Mock data extins (6 carduri)
const initialReservations: Reservation[] = [
  {
    id: 1,
    title: 'Fresh Vegetables & Fruits',
    donor: 'Auchan Supermarket',
    quantity: '15 kg',
    address: 'Bulevardul Moscova 17, Chisinau',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Bulevardul%20Moscova%2017,%20Chisinau&t=&z=15&ie=UTF8&iwloc=&output=embed',
    expiresIn: '1 hour and 30 mins',
    deadlineTimestamp: new Date(Date.now() + 90 * 60000),
    status: 'Urgent',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 2,
    title: 'Lunch Menu (Catering Excess)',
    donor: 'La Mama Restaurant',
    quantity: '20 portions',
    address: 'Strada Episcopiei 1, Bucuresti',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Strada%20Episcopiei%201,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed',
    expiresIn: '4 hours',
    deadlineTimestamp: new Date(Date.now() + 240 * 60000),
    status: 'Ready for pickup',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 3,
    title: 'Artisan Bakery Products',
    donor: 'Paul Bakery',
    quantity: '50 pieces',
    address: 'Piata Romana 9, Bucuresti',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed',
    expiresIn: 'Tomorrow, 10:00 AM',
    deadlineTimestamp: new Date(Date.now() + 24 * 3600000),
    status: 'In preparation',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 4,
    title: 'Dairy & Milk Cartons',
    donor: 'Mega Image',
    quantity: '12 Liters',
    address: 'Bulevardul Unirii 12, Bucuresti',
    mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/3',
    expiresIn: '2 hours',
    deadlineTimestamp: new Date(Date.now() + 120 * 60000),
    status: 'Ready for pickup',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 5,
    title: 'Assorted Canned Goods',
    donor: 'Kaufland',
    quantity: '30 cans',
    address: 'Strada Barbu Vacarescu 120, Bucuresti',
    mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/4',
    expiresIn: 'Completed',
    deadlineTimestamp: new Date(Date.now() - 24 * 3600000), // Trecut
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&q=80&w=600&h=400',
  },
  {
    id: 6,
    title: 'Fresh Meat & Poultry',
    donor: 'Carrefour Market',
    quantity: '8 kg',
    address: 'Soseaua Pipera 42, Bucuresti',
    mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/5',
    expiresIn: '45 mins',
    deadlineTimestamp: new Date(Date.now() + 45 * 60000),
    status: 'Urgent',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bd682f?auto=format&fit=crop&q=80&w=600&h=400',
  }
];

const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleOpenMap = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
    setSelectedReservation(null);
  };

  const handleConfirmPickup = (id: number) => {
    setReservations((prevReservations) => 
      prevReservations.map((res) => 
        res.id === id ? { ...res, status: 'Confirmed' } : res
      )
    );
    toast.success('Pickup confirmed successfully! ✅');
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.deadlineTimestamp.getTime() - b.deadlineTimestamp.getTime();
    } else {
      return b.deadlineTimestamp.getTime() - a.deadlineTimestamp.getTime();
    }
  });

  return (
    <PageLayout>
      <div className={`space-y-8 max-w-7xl mx-auto min-h-screen relative pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        {/* Header-ul Paginii - Exact ca în CurrentInventory / DonationFeed */}
        <div className={`pb-6 border-b relative z-20 ${
          theme === 'light' ? 'border-gray-100' : 'border-gray-700'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
            <div>
              <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-2 ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-100'
              }`}>
                My Reservations
              </h1>
              <p className={`text-base md:text-lg leading-relaxed ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Track and manage the food you are scheduled to pick up.
              </p>
            </div>
            
            <div className="w-full md:w-64 relative z-30">
              <SortDropdown 
                label="Sort deadline:"
                value={sortOrder}
                onChange={(val) => setSortOrder(val as 'asc' | 'desc')}
                options={[
                  { value: 'desc', label: 'Newest First' },
                  { value: 'asc', label: 'Oldest First' }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Grid-ul cu Cardurile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0 animate-fade-in-up">
          {sortedReservations.map((item) => (
            <ReservationCard 
              key={item.id}
              title={item.title}
              donor={item.donor}
              quantity={item.quantity}
              address={item.address}
              expiresIn={item.expiresIn}
              status={item.status}
              image={item.image}
              onOpenMap={() => handleOpenMap(item)}
              onConfirm={() => handleConfirmPickup(item.id)} 
            />
          ))}
        </div>

        {/* Modalul Google Maps */}
        {isMapOpen && selectedReservation && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <div 
              className={`absolute inset-0 backdrop-blur-sm transition-opacity ${
                theme === 'light' ? 'bg-gray-900/40' : 'bg-black/60'
              }`}
              onClick={handleCloseMap}
            ></div>

            <div className={`relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up transition-all ${
              theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700 border'
            }`}>
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-5 border-b ${
                theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-gray-700 bg-gray-800/50'
              }`}>
                <div>
                  <h3 className={`text-xl font-extrabold ${
                    theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                  }`}>Pickup Location</h3>
                  <p className={`text-sm mt-1 flex items-center gap-1.5 font-medium ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    <MapPinIcon className="w-4 h-4 text-blue-500" /> 
                    {selectedReservation.address}
                  </p>
                </div>
                <button 
                  onClick={handleCloseMap}
                  className={`p-2 rounded-xl transition-all ${
                    theme === 'light' 
                      ? 'bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200' 
                      : 'bg-gray-700 border border-gray-600 text-gray-300 hover:bg-red-900/30 hover:text-red-400 hover:border-red-500/50'
                  }`}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Harta */}
              <div className={`w-full h-[60vh] min-h-[400px] relative ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                <iframe 
                  src={selectedReservation.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Modal Footer */}
              <div className={`p-5 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                theme === 'light' ? 'bg-white' : 'bg-gray-800'
              }`}>
                <div className={`flex items-center gap-3 text-sm p-3 rounded-xl w-full sm:w-auto border ${
                  theme === 'light' 
                    ? 'bg-orange-50/80 text-orange-700 border-orange-100' 
                    : 'bg-orange-900/20 text-orange-400 border-orange-900/50'
                }`}>
                   <ExclamationTriangleIcon className="w-5 h-5 text-orange-500 shrink-0" />
                   <span className="font-semibold">Please respect the pickup time window.</span>
                </div>
                <button 
                  onClick={handleCloseMap}
                  className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] w-full sm:w-auto text-white ${
                    theme === 'light' 
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200/50' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-black/50'
                  }`}
                >
                  Close Map
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Dashboard;