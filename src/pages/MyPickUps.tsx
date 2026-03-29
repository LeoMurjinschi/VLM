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
        <div className={`pb-6 border-b relative z-20 ${theme === 'light' ? 'border-gray-100' : 'border-gray-700'}`}>
          <div className="mb-2 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            {/* Titlu și descriere */}
            <div>
              <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
                My Pickups
              </h1>
              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
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
          <div className={`py-16 text-center rounded-3xl border border-dashed ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            <span className="text-5xl block mb-5">🙌</span>
            <h3 className={`text-xl font-bold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>
              Mission accomplished!
            </h3>
            <p className={`text-base ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              You have no more food to collect right now.
            </p>
          </div>
        )}

        {/* === MODALUL GOOGLE MAPS === */}
                {isMapOpen && selectedPickupForMap && (
                  <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
                    <div 
                      className={`absolute inset-0 backdrop-blur-sm transition-opacity ${
                        theme === 'light' ? 'bg-gray-900/40' : 'bg-black/60'
                      }`}
                      onClick={handleCloseMap}
                    ></div>
        
                    <div className={`relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up transition-all ${
                      theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700 border'
                    }`}>
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
                            {selectedPickupForMap.address}
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
        
                      <div className={`w-full h-[60vh] min-h-100 relative ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
                        <iframe 
                          src={selectedPickupForMap.mapEmbedUrl}
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={true} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0"
                        ></iframe>
                      </div>
        
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

export default MyPickups;