import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import { MapPinIcon, XMarkIcon, ExclamationTriangleIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import FeedCard from '../components/Feedcard';
import DashboardFilter from '../components/DashboardFilter';
import ReservationModal from '../components/ReservationModal';
import type { Donation } from '../_mock';

const QUICK_FILTERS = ['All', '🚨 Urgent', '🥦 Veggies', '🍲 Cooked Meals', '🥐 Bakery', '🥛 Dairy', '🥫 Canned'];

interface Reservation {
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

const initialReservations: Reservation[] = [
  { id: 1, title: 'Fresh Vegetables & Fruits', donor: 'Auchan Supermarket', category: '🥦 Veggies', quantity: '15 kg', address: 'Bulevardul Moscova 17, Chisinau', mapEmbedUrl: 'https://maps.google.com/maps?q=Bulevardul%20Moscova%2017,%20Chisinau&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '1 hour and 30 mins', deadlineTimestamp: new Date(Date.now() + 90 * 60000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'Lunch Menu (Catering Excess)', donor: 'La Mama Restaurant', category: '🍲 Cooked Meals', quantity: '20 portions', address: 'Strada Episcopiei 1, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Strada%20Episcopiei%201,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: '4 hours', deadlineTimestamp: new Date(Date.now() + 240 * 60000), status: 'Ready for pickup', image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 3, title: 'Artisan Bakery Products', donor: 'Paul Bakery', category: '🥐 Bakery', quantity: '50 pieces', address: 'Piata Romana 9, Bucuresti', mapEmbedUrl: 'https://maps.google.com/maps?q=Piata%20Romana%209,%20Bucuresti&t=&z=15&ie=UTF8&iwloc=&output=embed', expiresIn: 'Tomorrow, 10:00 AM', deadlineTimestamp: new Date(Date.now() + 24 * 3600000), status: 'In preparation', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 4, title: 'Dairy & Milk Cartons', donor: 'Mega Image', category: '🥛 Dairy', quantity: '12 Liters', address: 'Bulevardul Unirii 12, Bucuresti', mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179657.48512169117!2d25.929007687842777!3d44.43798533728341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest!5e0!3m2!1sen!2sro!4v1715000000000!5m2!1sen!2sro', expiresIn: '2 hours', deadlineTimestamp: new Date(Date.now() + 120 * 60000), status: 'Ready for pickup', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 5, title: 'Assorted Canned Goods', donor: 'Kaufland', category: '🥫 Canned', quantity: '30 cans', address: 'Strada Barbu Vacarescu 120, Bucuresti', mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/4', expiresIn: 'Completed', deadlineTimestamp: new Date(Date.now() - 24 * 3600000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 6, title: 'Fresh Meat & Poultry', donor: 'Carrefour Market', category: '🥩 Meat', quantity: '8 kg', address: 'Soseaua Pipera 42, Bucuresti', mapEmbedUrl: 'http://googleusercontent.com/maps.google.com/5', expiresIn: '45 mins', deadlineTimestamp: new Date(Date.now() + 45 * 60000), status: 'Urgent', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bd682f?auto=format&fit=crop&q=80&w=600&h=400' }
];

const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  const [completingIds, setCompletingIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resToReserve, setResToReserve] = useState<Reservation | null>(null);

  const getDonationMap = (res: Reservation): Donation => ({
    id: res.id.toString(),
    title: res.title,
    description: `Donated by ${res.donor}`,
    category: res.category,
    pickupLocation: res.address,
    expirationDate: res.deadlineTimestamp.toISOString(),
    postedAt: new Date().toISOString(),
    status: res.status as any,
    image: res.image,
    quantity: parseFloat(res.quantity) || 1,
    unit: res.quantity.replace(/[0-9.]/g, '').trim() || 'items',
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
    setSelectedCategories([]);
    setStatusFilter('All');
    setSortOrder('asc');
    setIsFilterOpen(false);
  };

  const handleOpenReserve = (reservation: Reservation) => {
    setResToReserve(reservation);
    setModalOpen(true);
  };

  const handleModalReserve = (id: string, amount: number) => {
    const numId = parseInt(id);
    setCompletingIds(prev => [...prev, numId]);
    setTimeout(() => {
      setReservations(prev => prev.filter(res => res.id !== numId));
      setCompletingIds(prev => prev.filter(cId => cId !== numId));
    }, 800);
  };

  const handleOpenMap = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
    setSelectedReservation(null);
  };



  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.donor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Quick filter check
    let matchesQuick = true;
    if (activeFilter === '🚨 Urgent') {
      matchesQuick = res.status === 'Urgent';
    } else if (activeFilter !== 'All') {
      const cat = activeFilter.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/gu, '').trim();
      matchesQuick = res.category.includes(cat);
    }

    // Dropdown Check
    const catWords = res.category.toLowerCase().split(' ');
    const matchesCategoryDrop = selectedCategories.length === 0 || selectedCategories.some(cat => 
      catWords.some(word => cat.toLowerCase().includes(word)) || res.category.toLowerCase().includes(cat.toLowerCase())
    );
    const matchesStatusDrop = statusFilter === 'All' || res.status === statusFilter;

    return matchesSearch && matchesQuick && matchesCategoryDrop && matchesStatusDrop;
  });

  const sortedAndFilteredReservations = [...filteredReservations].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.deadlineTimestamp.getTime() - b.deadlineTimestamp.getTime();
    } else {
      return b.deadlineTimestamp.getTime() - a.deadlineTimestamp.getTime();
    }
  });

  return (
    <PageLayout>
      <div className="w-full space-y-6 max-w-7xl mx-auto min-h-screen relative pb-10">
        
        {/* === HEADER & CONTROLS === */}
        <div className={`flex flex-col gap-6 pb-6 border-b relative z-20 ${
          theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
        }`}>
          <div className="max-w-2xl">
            <h1 className={`font-[var(--font-display)] text-3xl font-bold tracking-tight mb-2 ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`} style={{ fontFamily: 'var(--font-display)' }}>
              My Reservations
            </h1>
            <p className={`text-[15px] leading-relaxed ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Track and manage the food you are scheduled to pick up.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full z-20">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <input 
                type="text" 
                placeholder="Search food or donor..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] outline-none transition-all duration-200 text-sm font-medium ${
                  theme === 'light'
                    ? 'bg-white border-gray-200 text-gray-700'
                    : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-100'
                }`}
              />
            </div>
            
            <div className="relative z-30 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`px-4 py-2.5 border rounded-xl transition-all flex items-center justify-center gap-2 font-semibold text-sm h-full w-full sm:w-auto ${
                  isFilterOpen || selectedCategories.length > 0 || statusFilter !== 'All'
                    ? 'bg-[#16a34a] border-transparent text-white shadow-md shadow-green-200/50'
                    : theme === 'light'
                    ? 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-300 hover:bg-gray-800'
                }`}
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
              </button>

              <DashboardFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                sortBy={sortOrder}
                setSortBy={(val) => setSortOrder(val as 'asc' | 'desc')}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                clearFilters={clearAllFilters}
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide items-center">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                  activeFilter === filter 
                    ? 'bg-[#16a34a] text-white border border-transparent shadow-[#16a34a]/20' 
                    : (theme === 'light' 
                        ? 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50' 
                        : 'bg-[#1a1a1a] text-gray-300 border border-[#2e2e2e] hover:bg-gray-800')
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Backdrop for Filters */}
        {isFilterOpen && (
          <div
            className={`fixed inset-0 z-[5] backdrop-blur-[1px] ${
              theme === 'light' ? 'bg-gray-900/10' : 'bg-black/30'
            }`}
            onClick={() => setIsFilterOpen(false)}
          ></div>
        )}

        {/* === GRID-UL CU CARDURI === */}
        {sortedAndFilteredReservations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0 pb-12 animate-fade-in-up">
            {sortedAndFilteredReservations.map((item) => {
              const isCompleting = completingIds.includes(item.id);
              
              return (
                <div 
                  key={item.id} 
                  className={`transition-all duration-700 ease-in-out origin-top ${
                    isCompleting ? 'opacity-0 scale-90 translate-y-4 pointer-events-none' : 'opacity-100 scale-100'
                  }`}
                >
                  <FeedCard 
                    title={item.title}
                    donor={item.donor}
                    quantity={item.quantity}
                    address={item.address}
                    expiresIn={item.expiresIn}
                    status={item.status}
                    image={item.image}
                    onOpenMap={() => handleOpenMap(item)}
                    onConfirm={() => handleOpenReserve(item)} 
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
              theme === 'light' ? 'bg-green-50' : 'bg-green-900/10'
            }`}>
              <span className="text-4xl block">🙌</span>
            </div>
            <p className={`font-semibold text-lg ${
              theme === 'light' ? 'text-gray-900' : 'text-gray-100'
            }`}>
              All caught up!
            </p>
            <p className={`mt-1.5 text-center max-w-sm text-sm ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              You have no pending pickups matching your criteria.
            </p>
            {(searchQuery !== '' || activeFilter !== 'All' || selectedCategories.length > 0 || statusFilter !== 'All') && (
              <button
                onClick={clearAllFilters}
                className="mt-5 px-5 py-2 text-sm font-semibold rounded-lg transition-colors bg-[#16a34a]/10 text-[#16a34a] hover:bg-[#16a34a]/20"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* === MODALUL DE REZERVARE === */}
        {resToReserve && (
          <ReservationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            donation={getDonationMap(resToReserve)}
            onReserve={handleModalReserve}
          />
        )}

        {/* === MODALUL GOOGLE MAPS === */}
        {isMapOpen && selectedReservation && (
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
                  src={selectedReservation.mapEmbedUrl}
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
                    <span>{selectedReservation.address}</span>
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

export default Dashboard;