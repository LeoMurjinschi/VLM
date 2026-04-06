import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ArchiveBoxIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import InventoryCard from '../components/InventoryCard';
import { fetchInventory, getInventoryStats } from '../services/inventoryService';
import { useTheme } from '../hooks/useTheme';
import Select from '../components/ui/Select';
import { SpinnerLoader, ErrorState } from '../components/ui/StateIndicators';
import { toast } from 'react-toastify';
import EmptyBasketSVG from '../components/ui/EmptyBasketSVG';
import type { InventoryItem } from '../_mock';

const CATEGORY_OPTIONS = [
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Bakery', label: 'Bakery' },
  { value: 'Cooked Food', label: 'Cooked Food' },
  { value: 'Dairy', label: 'Dairy' },
];

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Status' },
  { value: 'In Stock', label: 'In Stock' },
  { value: 'Low Stock', label: 'Low Stock' },
  { value: 'Expired', label: 'Expired' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Added' },
  { value: 'oldest', label: 'Oldest Added' },
  { value: 'expiring_soon', label: 'Expiring Soon' },
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'quantity_high', label: 'High Quantity' },
  { value: 'quantity_low', label: 'Low Quantity' },
];

const CurrentInventory: React.FC = () => {
  const { theme } = useTheme();

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalItems: 0, lowStockCount: 0, expiredCount: 0, totalQuantity: 0 });

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const currentFilters = useMemo(() => ({
    search: searchQuery,
    categories: selectedCategories,
    status: statusFilter,
    sortBy,
  }), [searchQuery, selectedCategories, statusFilter, sortBy]);

  useEffect(() => {
    const loadInventory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchInventory(currentFilters, 1, 50);
        setInventory(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load inventory';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    loadInventory();
  }, [currentFilters]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await getInventoryStats();
        setStats(statsData);
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };
    loadStats();
  }, [inventory]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategories([]);
    setStatusFilter('All');
    setSortBy('newest');
    setIsFilterOpen(false);
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item deleted successfully');
  }, []);

  const handleEditItem = useCallback((_item: InventoryItem) => {
    // Edit item handler
  }, []);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            status:
              quantity === 0
                ? 'Expired'
                : quantity < 5
                  ? 'Low Stock'
                  : 'In Stock',
          };
        }
        return item;
      })
    );
    toast.success('Quantity updated');
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
  }, []);

  const processedInventory = inventory;

  return (
    <div className="space-y-6 max-w-7xl mx-auto min-h-screen relative">
      {/* Header */}
      <div className={`pb-6 border-b relative z-20 ${
        theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2.5 rounded-xl ${
            theme === 'light' ? 'bg-[#16a34a]/10' : 'bg-[#16a34a]/20'
          }`}>
            <ArchiveBoxIcon className="w-7 h-7 text-[#16a34a]" />
          </div>
          <div>
            <h1 className={`text-3xl font-bold tracking-tight ${
              theme === 'light' ? 'text-[#1a1a1a]' : 'text-white'
            }`} style={{ fontFamily: 'var(--font-display)' }}>
              Current Inventory
            </h1>
            <p className={`text-[15px] leading-relaxed ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Manage and track your food inventory.
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${
            theme === 'light' ? 'bg-white border-gray-200/80' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            <div className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>Total Items</div>
            <div className="text-2xl font-bold text-[#16a34a] mt-1">
              {stats.totalItems}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${
            theme === 'light' ? 'bg-white border-gray-200/80' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            <div className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>Low Stock Items</div>
            <div className="text-2xl font-bold text-amber-500 mt-1">
              {stats.lowStockCount}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${
            theme === 'light' ? 'bg-white border-gray-200/80' : 'bg-[#1a1a1a] border-[#2e2e2e]'
          }`}>
            <div className={`text-sm font-medium ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>Total Stock</div>
            <div className="text-2xl font-bold text-[#16a34a] mt-1">
              {stats.totalQuantity}+
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b relative z-20 ${
        theme === 'light' ? 'border-gray-200/60' : 'border-[#2e2e2e]'
      }`}>
        <div className="flex gap-2 sm:gap-3 w-full lg:w-auto relative flex-grow">
          <div className="relative flex-grow w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className={`h-5 w-5 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search inventory..."
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
            className={`px-3 py-2.5 border rounded-xl transition-all font-semibold flex items-center gap-2 text-sm ${
              isFilterOpen
                ? 'bg-[#16a34a] border-transparent text-white shadow-md'
                : theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  : 'bg-[#1a1a1a] border-[#2e2e2e] text-gray-300 hover:bg-gray-800'
            }`}
          >
            <FunnelIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {isFilterOpen && (
        <div className={`p-5 rounded-xl border animate-fade-in-up ${
          theme === 'light'
            ? 'bg-white border-gray-200/80'
            : 'bg-[#1a1a1a] border-[#2e2e2e]'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-200'
              }`}>Categories</h3>
              <div className="space-y-2">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label key={cat.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.value)}
                      onChange={() => toggleCategory(cat.value)}
                      className="w-4 h-4 rounded border-gray-300 text-[#16a34a] focus:ring-[#16a34a]"
                    />
                    <span className={`text-sm font-medium ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                    }`}>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-200'
              }`}>Status</h3>
              <Select
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
              />
            </div>

            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-200'
              }`}>Sort By</h3>
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
              />
            </div>
          </div>

          <div className={`flex gap-3 justify-end pt-4 mt-4 border-t ${
            theme === 'light' ? 'border-gray-100' : 'border-[#2e2e2e]'
          }`}>
            <button
              onClick={clearFilters}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                theme === 'light'
                  ? 'text-gray-600 hover:bg-gray-50'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Inventory grid — uniform 3-col, no masonry */}
      {processedInventory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {processedInventory.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              onDelete={handleDeleteItem}
              onEdit={handleEditItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
      ) : loading ? (
        <SpinnerLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : (
        <div className={`flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed ${
          theme === 'light' ? 'bg-white border-gray-300' : 'bg-[#1a1a1a] border-gray-600'
        }`}>
          <div className={`p-6 rounded-2xl mb-4 ${
            theme === 'light' ? 'bg-amber-50' : 'bg-amber-900/10'
          }`}>
            <EmptyBasketSVG className="w-20 h-20 text-[#f59e0b]" />
          </div>
          <p className={`text-lg font-semibold ${
            theme === 'light' ? 'text-[#1a1a1a]' : 'text-gray-100'
          }`}>
            No inventory items found
          </p>
          <p className={`text-sm mt-1 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Try adjusting your filters or add new stock.
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentInventory;
