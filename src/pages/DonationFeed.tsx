import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DonationCard from '../components/DonationCard';
import DonationFilter from '../components/DonationFilter';
import { fetchDonations, sortDonations, reserveDonation } from '../services/donationsService';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import { SpinnerLoader, ErrorState } from '../components/UI/StateIndicators';
import EmptyBasketSVG from '../components/UI/EmptyBasketSVG';
import type { Donation } from '../_mock';

const DonationFeed: React.FC = () => {
  const { theme } = useTheme();

  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const currentFilters = useMemo(() => ({
    search: searchQuery,
    categories: selectedCategories,
    status: statusFilter,
    urgency: urgencyFilter,
  }), [searchQuery, selectedCategories, statusFilter, urgencyFilter]);

  useEffect(() => {
    const loadDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDonations(currentFilters, 1, 50);
        let sorted = data;
        if (sortBy && sortBy !== 'newest') {
          sorted = await sortDonations(data, sortBy);
        }
        setDonations(sorted);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load donations';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    loadDonations();
  }, [currentFilters, sortBy]);

  const handleReserveItem = useCallback(async (id: string, amountReserved: number) => {
    try {
      await reserveDonation(id);
      setDonations((prevDonations) =>
        prevDonations.map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity - amountReserved;
            return {
              ...item,
              quantity: newQuantity,
              status: newQuantity === 0 ? 'Reserved' : item.status,
            };
          }
          return item;
        })
      );
      toast.success('Item reserved successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reserve item';
      toast.error(message);
    }
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategories([]);
    setStatusFilter('All');
    setUrgencyFilter('All');
    setSortBy('newest');
    setIsFilterOpen(false);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative">
      {/* Page header */}
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b relative z-20 ${
        theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
      }`}>
        <div className="max-w-2xl">
          <h1 className={`font-[var(--font-display)] text-3xl font-bold tracking-tight mb-2 ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`} style={{ fontFamily: 'var(--font-display)' }}>
            Available Donations
          </h1>
          <p className={`text-[15px] leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Turn surplus food into good deeds. Reserve items directly from local partners.
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3 w-full lg:w-auto relative">
          <div className="relative flex-grow w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className={`h-5 w-5 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] outline-none transition-all duration-200 text-sm font-medium ${
                theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-700'
                  : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-100'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-3 py-2.5 border rounded-xl transition-all flex items-center gap-2 font-semibold flex-shrink-0 text-sm ${
              isFilterOpen || selectedCategories.length > 0 || statusFilter !== 'All'
                ? 'bg-[#16a34a] border-transparent text-white shadow-md shadow-green-200/50'
                : theme === 'light'
                ? 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-300 hover:bg-gray-800'
            }`}
          >
            <FunnelIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          <DonationFilter
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            urgencyFilter={urgencyFilter}
            setUrgencyFilter={setUrgencyFilter}
            clearFilters={clearFilters}
          />
        </div>
      </div>

      {isFilterOpen && (
        <div
          className={`fixed inset-0 z-10 backdrop-blur-[1px] ${
            theme === 'light' ? 'bg-gray-900/10' : 'bg-black/30'
          }`}
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}

      {/* Content */}
      {loading ? (
        <SpinnerLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : donations.length === 0 ? (
        <div className={`flex flex-col items-center justify-center min-h-[50vh] rounded-2xl border border-dashed relative z-0 ${
          theme === 'light' ? 'bg-white border-gray-300' : 'bg-[#1a1a1a] border-gray-600'
        }`}>
          <div className={`p-6 rounded-2xl mb-4 ${
            theme === 'light' ? 'bg-amber-50' : 'bg-amber-900/10'
          }`}>
            <EmptyBasketSVG className="w-20 h-20 text-[#f59e0b]" />
          </div>
          <p className={`font-semibold text-lg ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            No donations found.
          </p>
          <p className={`mt-1.5 text-center max-w-sm text-sm ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            We couldn't find anything matching your current filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-5 px-5 py-2 text-sm font-semibold rounded-lg transition-colors bg-[#16a34a]/10 text-[#16a34a] hover:bg-[#16a34a]/20"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        /* Uniform 3-column grid — no masonry, no stagger */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 relative z-0">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onReserve={handleReserveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationFeed;