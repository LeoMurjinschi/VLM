import React, { useState } from 'react';
import DonationCard from '../components/DonationCard';
import DonationFilter from '../components/DonationFilter';
import { MOCK_DONATIONS } from '../_mock/donations';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

const DonationFeed: React.FC = () => {
  const { theme } = useTheme();
  const [donations, setDonations] = useState(MOCK_DONATIONS);


  const handleReserveItem = (id: string, amountReserved: number) => {
    setDonations((prevDonations) => 
      prevDonations.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - amountReserved;
          return {
            ...item,
            quantity: newQuantity,

            status: newQuantity === 0 ? 'Reserved' : item.status
          };
        }
        return item;
      })
    );
  };


  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const clearFilters = () => {
    setSearchQuery(''); setSelectedCategories([]); setStatusFilter('All');
    setUrgencyFilter('All'); setSortBy('newest'); setIsFilterOpen(false);
  };


  let processedDonations = [...donations];

  if (searchQuery) {
    processedDonations = processedDonations.filter(d => 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedCategories.length > 0) {
    processedDonations = processedDonations.filter(d => selectedCategories.includes(d.category));
  }
  if (statusFilter !== 'All') {
    processedDonations = processedDonations.filter(d => d.status === statusFilter);
  }
  if (urgencyFilter === 'Expiring Soon') {
    const fortyEightHoursFromNow = new Date().getTime() + (48 * 60 * 60 * 1000);
    processedDonations = processedDonations.filter(d => new Date(d.expirationDate).getTime() <= fortyEightHoursFromNow);
  }
  processedDonations.sort((a, b) => {
    if (sortBy === 'expires_first') return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
    if (sortBy === 'name_asc') return a.title.localeCompare(b.title);
    return 0; 
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto min-h-screen relative"> 

      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b relative z-20 ${
        theme === 'light' ? 'border-gray-100' : 'border-gray-700'
      }`}>
        <div className="max-w-2xl">
          <h1 className={`text-4xl font-extrabold tracking-tight mb-3 ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>Available Donations</h1>
          <p className={`text-lg leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>Turn surplus food into good deeds. Reserve items directly from local partners.</p>
        </div>
        
        <div className="flex gap-2 sm:gap-3 w-full lg:w-auto relative">
          <div className="relative flex-grow w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className={`h-6 w-6 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="text" placeholder="Search items..."
              className={`pl-12 pr-4 py-3.5 w-full border rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm font-medium ${
                theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-700 shadow-gray-100'
                  : 'bg-gray-800 border-gray-700 text-gray-100 shadow-gray-900'
              }`}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-3 sm:px-4 py-3.5 border rounded-xl shadow-sm transition-all flex items-center gap-2 font-bold flex-shrink-0 ${
              isFilterOpen || selectedCategories.length > 0 || statusFilter !== 'All'
                ? `bg-blue-600 border-transparent text-white shadow-lg ${
                    theme === 'light' ? 'shadow-blue-200' : 'shadow-blue-900'
                  }`
                : theme === 'light'
                ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FunnelIcon className="h-6 w-6" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <DonationFilter 
            isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} sortBy={sortBy} setSortBy={setSortBy}
            selectedCategories={selectedCategories} toggleCategory={toggleCategory} statusFilter={statusFilter}
            setStatusFilter={setStatusFilter} urgencyFilter={urgencyFilter} setUrgencyFilter={setUrgencyFilter} clearFilters={clearFilters}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div className={`fixed inset-0 z-10 backdrop-blur-[1px] ${
          theme === 'light' ? 'bg-gray-900/10' : 'bg-black/30'
        }`} onClick={() => setIsFilterOpen(false)}></div>
      )}


      {processedDonations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-10 relative z-0">
          {processedDonations.map((donation) => (
            <DonationCard 
              key={donation.id} 
              donation={donation} 
              onReserve={handleReserveItem} 
            />
          ))}
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center min-h-[50vh] rounded-3xl border border-dashed relative z-0 ${
          theme === 'light'
            ? 'bg-white border-gray-300'
            : 'bg-gray-800 border-gray-600'
        }`}>
          <div className={`p-4 rounded-full mb-4 ${
            theme === 'light' ? 'bg-blue-50' : 'bg-gray-700'
          }`}>
            <MagnifyingGlassIcon className={`h-10 w-10 ${
              theme === 'light' ? 'text-blue-500' : 'text-blue-400'
            }`} />
          </div>
          <p className={`font-bold text-xl ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>No donations found.</p>
          <p className={`mt-2 text-center max-w-sm ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>We couldn't find anything matching your current filters.</p>
          <button onClick={clearFilters} className={`mt-6 px-6 py-2 font-bold rounded-lg transition-colors ${
            theme === 'light'
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-700 text-blue-400 hover:bg-gray-600'
          }`}>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationFeed;