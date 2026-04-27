import React, { useState, useMemo } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  TrashIcon, 
  ExclamationTriangleIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';
import { toast } from 'react-toastify';
import { MOCK_ADMIN_DONATIONS, type AdminDonationItem } from '../../_mock/adminMockData';
import DonationFilter from '../../components/DonationFilter';
import Modal from '../../components/ui/Modal';
import EmptyBasketSVG from '../../components/UI/EmptyBasketSVG';

// Inline simple Admin Donation Card
const AdminDonationCard = ({ 
  donation, 
  onDeleteClick 
}: { 
  donation: AdminDonationItem; 
  onDeleteClick: (d: AdminDonationItem) => void;
}) => {
  const { theme } = useTheme();

  const getCategoryColor = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('fruit')) return { bg: 'bg-orange-500/80', text: 'text-white' };
    if (lower.includes('baker')) return { bg: 'bg-amber-500/80', text: 'text-white' };
    if (lower.includes('veg')) return { bg: 'bg-green-600/80', text: 'text-white' };
    if (lower.includes('dairy')) return { bg: 'bg-blue-500/80', text: 'text-white' };
    if (lower.includes('cook')) return { bg: 'bg-red-500/80', text: 'text-white' };
    return { bg: 'bg-gray-500/80', text: 'text-white' };
  };

  const isAvailable = donation.status === 'Available';
  const expiration = new Date(donation.expirationDate).getTime();
  const daysLeft = Math.ceil((expiration - new Date().getTime()) / 86400000);
  const isExpiringSoon = daysLeft <= 1 && daysLeft >= 0;
  const catColors = getCategoryColor(donation.category);

  return (
    <div className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out
      hover:-translate-y-1.5 hover:shadow-xl
      ${theme === 'light'
        ? 'bg-white border border-gray-200/80 shadow-sm hover:shadow-gray-200/60'
        : 'bg-[#1a1a1a] border border-[#2e2e2e] shadow-sm hover:shadow-black/30'
      }
      ${donation.reported ? (theme === 'light' ? 'ring-2 ring-red-400/40' : 'ring-2 ring-red-500/50') : ''}
    `}>
      
      {/* Image section */}
      <div className="relative h-[200px] overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide shadow-sm ${catColors.bg} ${catColors.text}`}>
          {donation.category}
        </span>

        {donation.reported && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm bg-red-600 text-white flex items-center gap-1">
            <ExclamationTriangleIcon className="w-3 h-3" />
            Reported
          </span>
        )}
        {!donation.reported && (
          <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm ${
            isAvailable
              ? 'bg-green-500/80 text-white'
              : 'bg-amber-500/80 text-white'
          }`}>
            {donation.status}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-grow p-4 pt-3.5">
        <h3 className={`text-lg font-bold leading-snug mb-1.5 ${
          theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
        }`} style={{ fontSize: '18px' }}>
          {donation.title}
        </h3>

        {donation.reported && donation.flagReason && (
          <div className="mb-2 p-2 rounded bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-xs text-red-700 dark:text-red-400">
            <strong>Flag Reason:</strong> {donation.flagReason}
          </div>
        )}

        <p className={`text-[13px] mb-3 line-clamp-2 leading-relaxed ${
          theme === 'light' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {donation.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {donation.donorName.charAt(0)}
          </div>
          <p className={`text-xs font-medium truncate ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            by {donation.donorName}
          </p>
        </div>

        <div className={`mt-auto space-y-2 pt-3 border-t ${
          theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
        }`}>
          <div className={`flex items-center text-[13px] ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <MapPinIcon className="w-4 h-4 mr-2 text-[#8b5cf6] flex-shrink-0" />
            <span className="truncate">{donation.pickupLocation}</span>
          </div>
          <div className={`flex items-center text-[13px] ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            <ClockIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${isExpiringSoon ? 'text-amber-500' : 'text-gray-400'}`} />
            <span>
              Expires:{' '}
              <span className={isExpiringSoon ? 'text-amber-500 font-semibold' : ''}>
                {new Date(donation.expirationDate).toLocaleDateString()}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Admin Action Bar on Hover */}
      <div className={`absolute bottom-0 inset-x-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out ${
        theme === 'light' ? 'bg-white/95 backdrop-blur-sm' : 'bg-[#1a1a1a]/95 backdrop-blur-sm'
      }`}>
        <button 
          onClick={() => onDeleteClick(donation)}
          className="w-full py-2.5 rounded-full font-semibold text-sm transition-all active:scale-[0.98] bg-red-500 text-white hover:bg-red-600 shadow-md flex items-center justify-center gap-2"
        >
          <TrashIcon className="w-4 h-4" />
          Delete Donation
        </button>
      </div>

      {isExpiringSoon && !donation.reported && (
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-amber-400 group-hover:opacity-0 transition-opacity" />
      )}
      {donation.reported && (
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-red-500 group-hover:opacity-0 transition-opacity" />
      )}
    </div>
  );
};


const AdminDonationFeed: React.FC = () => {
  const { theme } = useTheme();

  const [donations, setDonations] = useState<AdminDonationItem[]>(MOCK_ADMIN_DONATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState<AdminDonationItem | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setStatusFilter('All');
    setUrgencyFilter('All');
    setSortBy('newest');
    setIsFilterOpen(false);
  };

  // Basic filtering mock
  const filteredDonations = useMemo(() => {
    return donations.filter(d => {
      const matchSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.donorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategories.length === 0 || selectedCategories.some(c => d.category.toLowerCase().includes(c.toLowerCase()));
      const matchStatus = statusFilter === 'All' || d.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [donations, searchQuery, selectedCategories, statusFilter]);

  const initiateDelete = (item: AdminDonationItem) => {
    setDonationToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (donationToDelete) {
      setDonations(prev => prev.filter(d => d.id !== donationToDelete.id));
      toast.success('Donation listing deleted successfully');
      setDeleteModalOpen(false);
      setDonationToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative animate-fade-in-up">
      {/* Header */}
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b relative z-20 ${
        theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
      }`}>
        <div className="max-w-2xl">
          <h1 className={`font-[var(--font-display)] text-3xl font-bold tracking-tight mb-2 ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
          }`} style={{ fontFamily: 'var(--font-display)' }}>
            Donation Feed Moderation
          </h1>
          <p className={`text-[15px] leading-relaxed ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Monitor all active donations. Remove inappropriate or expired items.
          </p>
        </div>

        <div className="flex gap-2 w-full lg:w-auto relative">
          <div className="relative flex-grow w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className={`h-5 w-5 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search items or donors..."
              className={`pl-10 pr-4 py-2.5 w-full border rounded-xl focus:ring-2 focus:ring-[#8b5cf6]/20 focus:border-[#8b5cf6] outline-none transition-all duration-200 text-sm font-medium ${
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
                ? 'bg-[#8b5cf6] border-transparent text-white shadow-md'
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

      {/* Grid */}
      {filteredDonations.length === 0 ? (
        <div className={`flex flex-col items-center justify-center min-h-[50vh] rounded-2xl border border-dashed relative z-0 ${
          theme === 'light' ? 'bg-white border-gray-300' : 'bg-[#1a1a1a] border-gray-600'
        }`}>
          <div className={`p-6 rounded-2xl mb-4 ${
            theme === 'light' ? 'bg-violet-50' : 'bg-violet-900/10'
          }`}>
            <EmptyBasketSVG className="w-20 h-20 text-[#8b5cf6]" />
          </div>
          <p className={`font-semibold text-lg ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            No donations found.
          </p>
          <button
            onClick={clearFilters}
            className="mt-5 px-5 py-2 text-sm font-semibold rounded-lg transition-colors bg-[#8b5cf6]/10 text-[#8b5cf6] hover:bg-[#8b5cf6]/20"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 relative z-0">
          {filteredDonations.map((donation) => (
            <AdminDonationCard
              key={donation.id}
              donation={donation}
              onDeleteClick={initiateDelete}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirm Deletion">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <TrashIcon className="h-8 w-8 text-red-600 dark:text-red-500" aria-hidden="true" />
          </div>
          <p className={`text-sm mb-6 mt-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            Are you sure you want to permanently delete <strong>{donationToDelete?.title}</strong>? This action cannot be undone and the item will be removed from the platform.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20"
            >
              Yes, Delete It
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AdminDonationFeed;
