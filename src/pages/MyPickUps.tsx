import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import { CheckBadgeIcon, MapPinIcon, XMarkIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import ReservationCard from '../components/ReservationCard';
import SortDropdown from '../components/SortDropdown';

interface Pickup {
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

const ACTIVE_PICKUPS: Pickup[] = [
  { id: 101, title: 'Fresh Meat & Poultry', donor: 'Carrefour Market', category: '🥩 Meat', quantity: '8 kg', address: 'Soseaua Pipera 42, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '45 mins', deadlineTimestamp: new Date(Date.now() + 45 * 60000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bd682f?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 102, title: 'Lunch Menu (Catering Excess)', donor: 'La Mama Restaurant', category: '🍲 Cooked Meals', quantity: '20 portions', address: 'Strada Episcopiei 1, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Strada%20Episcopiei%201,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '2 hours', deadlineTimestamp: new Date(Date.now() + 120 * 60000), status: 'Ready for pickup', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 103, title: 'Artisan Bakery Products', donor: 'Paul Bakery', category: '🥐 Bakery', quantity: '50 pieces', address: 'Piata Romana 9, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '3 hours', deadlineTimestamp: new Date(Date.now() + 180 * 60000), status: 'In preparation', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400' },
];

const MyPickups: React.FC = () => {
  const { theme } = useTheme();
  
  // Avem doar lista activă acum
  const [activeList, setActiveList] = useState<Pickup[]>(ACTIVE_PICKUPS);
  const [completingIds, setCompletingIds] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [selectedPickupForMap, setSelectedPickupForMap] = useState<Pickup | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleOpenMap = (pickup: Pickup) => {
    setSelectedPickupForMap(pickup);
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
    setSelectedPickupForMap(null);
  };

  // Confirmare individuală (doar scoate din listă)
  const handleCompletePickup = (id: number) => {
    setCompletingIds(prev => [...prev, id]);
    toast.success('Food collected! Thank you for your help. 🚚✨');

    setTimeout(() => {
      setActiveList(prev => prev.filter(p => p.id !== id));
      setCompletingIds(prev => prev.filter(cId => cId !== id));
    }, 800);
  };

  // Confirmare pentru toate
  const handleCompleteAll = () => {
    if (activeList.length === 0) return;
    toast.success('All pickups completed! Incredible work today! 🎉');
    setActiveList([]); // Golește lista activă instant
  };

  // Sortăm direct lista activă
  const sortedDisplayList = [...activeList].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.deadlineTimestamp.getTime() - b.deadlineTimestamp.getTime();
    } else {
      return b.deadlineTimestamp.getTime() - a.deadlineTimestamp.getTime();
    }
  });

  return (
    <PageLayout>
      <div className={`w-full space-y-6 max-w-7xl mx-auto min-h-screen relative pb-10 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
        
        {/* HEADER & CONTROLS (Fără tab-uri) */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b relative z-20 ${
          theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
        }`}>
          <div className="max-w-2xl">
            <h1 className={`font-[var(--font-display)] text-3xl font-bold tracking-tight mb-2 ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`} style={{ fontFamily: 'var(--font-display)' }}>
              My Pickups
            </h1>
            <p className={`text-[15px] leading-relaxed ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Track and complete your assigned route for today.
            </p>
          </div>
            
            {/* Zona din dreapta (Sortare + Buton Complete All) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              
              <div className="w-full sm:w-64 relative z-30 shrink-0">
                <SortDropdown 
                  label="Sort deadline:"
                  value={sortOrder}
                  onChange={(val) => setSortOrder(val as 'asc' | 'desc')}
                  options={[
                    { value: 'asc', label: 'Urgent First' },
                    { value: 'desc', label: 'Later First' }
                  ]}
                />
              </div>

              {activeList.length > 0 && (
                <button 
                  onClick={handleCompleteAll}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <CheckBadgeIcon className="w-5 h-5" />
                  Complete All
                </button>
              )}
            </div>
        </div>

        {/* GRID CU CARDURI */}
        {sortedDisplayList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {sortedDisplayList.map((item) => {
              const isCompleting = completingIds.includes(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className={`transition-all duration-700 ease-in-out origin-top relative ${
                    isCompleting ? 'opacity-0 scale-90 translate-y-4 pointer-events-none' : 'opacity-100 scale-100'
                  }`}
                >
                  <ReservationCard 
                    title={item.title}
                    donor={item.donor}
                    quantity={item.quantity}
                    address={item.address}
                    expiresIn={item.expiresIn}
                    status={item.status}
                    image={item.image}
                    onOpenMap={() => handleOpenMap(item)}
                    onConfirm={() => handleCompletePickup(item.id)} 
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center min-h-[50vh] rounded-2xl border border-dashed relative z-0 ${
            theme === 'light' ? 'bg-white border-gray-300' : 'bg-[#1a1a1a] border-gray-600'
          }`}>
            <div className={`p-6 rounded-2xl mb-4 ${
              theme === 'light' ? 'bg-emerald-50' : 'bg-emerald-900/10'
            }`}>
              <span className="text-5xl block text-emerald-500">🏆</span>
            </div>
            <p className={`font-semibold text-lg ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-100'
            }`}>
              Mission accomplished!
            </p>
            <p className={`mt-1.5 text-center max-w-sm text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              You have no more food to collect right now.
            </p>
          </div>
        )}

        {/* === MODALUL GOOGLE MAPS === */}
        {isMapOpen && selectedPickupForMap && (
          <div className="fixed inset-[0] z-[9999] flex items-center justify-center p-4">
            <div 
              className={`absolute inset-0 backdrop-blur-sm transition-opacity ${
                theme === 'light' ? 'bg-black/40' : 'bg-black/60'
              }`}
              onClick={handleCloseMap}
            ></div>

            <div className={`relative w-full max-w-4xl rounded-3xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-fade-in-up ${
              theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'
            }`}>
              {/* Map Section - Full Bleed Top */}
              <div className="relative w-full h-[55vh] min-h-[300px] shrink-0 bg-gray-100 dark:bg-gray-800">
                <iframe 
                  src={selectedPickupForMap.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0"
                ></iframe>
                
                {/* Top Gradient for Close Button visibility */}
                <div className={`absolute top-0 inset-x-0 h-28 bg-gradient-to-b ${
                  theme === 'light' ? 'from-white/70 to-transparent' : 'from-black/70 to-transparent'
                } pointer-events-none z-10`} />

                {/* Close button */}
                <button 
                  onClick={handleCloseMap}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-md shadow-sm border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-white dark:hover:bg-black/80 hover:scale-105 transition-all outline-none z-20"
                >
                  <XMarkIcon className="w-5 h-5 font-bold" />
                </button>
              </div>

              {/* Bottom Info Section */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center justify-between z-20 relative">
                <div className="flex-grow w-full">
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-widest mb-3 ${
                    theme === 'light' ? 'bg-[#16a34a]/10 text-[#16a34a]' : 'bg-green-400/10 text-green-400'
                  }`}>
                    Location Details
                  </span>
                  
                  <h3 className={`text-2xl mb-1.5 font-bold leading-tight ${
                    theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
                  }`} style={{ fontFamily: 'var(--font-display)' }}>
                    Map Directions
                  </h3>
                  
                  <div className={`flex items-start gap-2 text-[15px] font-medium leading-relaxed ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                  }`}>
                    <MapPinIcon className="w-5 h-5 text-[#16a34a] mt-0.5 shrink-0" />
                    <span>{selectedPickupForMap.address}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
                  <div className={`flex items-center gap-2.5 text-xs px-3 py-2 rounded-xl border ${
                    theme === 'light' 
                      ? 'bg-amber-50/80 text-amber-800 border-amber-200/60' 
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                     <ExclamationTriangleIcon className="w-4 h-4 text-amber-500 shrink-0" />
                     <span className="font-semibold">Respect pickup time</span>
                  </div>

                  <button 
                    onClick={handleCloseMap}
                    className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-green-500/20 transition-all active:scale-[0.98]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyPickups;