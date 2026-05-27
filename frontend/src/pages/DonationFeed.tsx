import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DonationCard from '../components/DonationCard';
import DonationFilter from '../components/DonationFilter';
import { MagnifyingGlassIcon, FunnelIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { toast } from 'react-toastify';
import EmptyBasketSVG from '../components/UI/EmptyBasketSVG';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationContext';
import StockDetailModal from '../components/StockDetailModal';
import type { Donation } from '../_mock';
import { donationService } from '../api';
import type { DonationInfoDto } from '../api/donationService';

const mapDonationDtoToDonation = (dto: DonationInfoDto): Donation => ({
    id: String(dto.id),
    title: dto.title,
    description: dto.description,
    quantity: dto.quantity,
    unit: dto.unit,
    category: dto.category,
    pickupLocation: dto.pickupLocation,
    expirationDate: dto.expirationDate || new Date().toISOString(),
    image: dto.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    status: dto.status as 'Available' | 'Reserved',
    donorId: String(dto.donorId),
    donorName: dto.donorName,
    donorAvatar: dto.donorAvatar,
    postedAt: dto.createdDate,
  });

const DonationFeed: React.FC = () => {
  const { theme } = useTheme();
  const [donations, setDonations] = useState<Donation[]>([]);
  const { user } = useAuth();
  const { createReservation } = useReservations();

  const isDonor = user?.role === 'donor';

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeStock, setActiveStock] = useState<Donation | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    const fetchAllDonations = async () => {
        try {
            const apiDonations = await donationService.getAll();
            const mappedDonations = apiDonations.map(mapDonationDtoToDonation);
            setDonations(mappedDonations);
        } catch (error) {
            console.error("Failed to fetch donations:", error);
            toast.error("Could not load the donation feed.");
        }
    };
    fetchAllDonations();
  }, []);

  const filteredDonations = useMemo(() => {
    let results = [...donations];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (d) => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      results = results.filter((d) => selectedCategories.includes(d.category));
    }

    if (statusFilter !== 'All') {
      results = results.filter((d) => d.status === statusFilter);
    }

    if (urgencyFilter === 'Expiring Soon') {
      const cutoff = Date.now() + 48 * 60 * 60 * 1000;
      results = results.filter((d) => new Date(d.expirationDate).getTime() <= cutoff);
    }

    if (sortBy === 'expires_first') {
      results.sort(
        (a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
      );
    } else if (sortBy === 'name_asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [donations, searchQuery, selectedCategories, statusFilter, urgencyFilter, sortBy]);

  const handleReserveItem = useCallback(
    async (id: string, amountReserved: number) => {
      if (isDonor) {
        toast.info('Only receiver organizations can reserve donations.');
        return;
      }
      try {
        await createReservation(id, amountReserved);
        toast.success("Reserved! The donor will confirm when it's ready for pickup.");
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to reserve item';
        toast.error(message);
      }
    },
    [isDonor, createReservation]
  );

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

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative">
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
          className={`fixed inset-0 z-10 ${
            theme === 'light' ? 'bg-gray-900/10' : 'bg-black/30'
          }`}
          onClick={() => setIsFilterOpen(false)}
        ></div>
      )}

      {isDonor && (
        <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
          theme === 'light'
            ? 'bg-amber-50/60 border-amber-200 text-amber-800'
            : 'bg-amber-900/10 border-amber-900/40 text-amber-300'
        }`}>
          <InformationCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="text-sm leading-relaxed">
            <span className="font-bold">Viewing only.</span> As a donor, you can browse available donations but cannot reserve them. Reservations are reserved for receiver organizations.
          </div>
        </div>
      )}

      {filteredDonations.length === 0 ? (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 relative z-0">
          {filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onReserve={handleReserveItem}
              canReserve={!isDonor}
              onCardClick={(d) => setActiveStock(d)}
            />
          ))}
        </div>
      )}

      <StockDetailModal
        isOpen={!!activeStock}
        donation={activeStock}
        onClose={() => setActiveStock(null)}
        onReserve={handleReserveItem}
      />
    </div>
  );
};

export default DonationFeed;