import React, { useState } from 'react';
import { ArchiveBoxIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import InventoryCard from '../components/InventoryCard';
import { MOCK_INVENTORY } from '../_mock/inventory';
import { useTheme } from '../hooks/useTheme';
import Select from '../components/UI/Select';
import type { InventoryItem } from '../_mock/inventory';

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
  const [inventory, setInventory] = useState(MOCK_INVENTORY);

  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setStatusFilter('All');
    setSortBy('newest');
    setIsFilterOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditItem = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
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
  };

  // Filter and sort logic
  let processedInventory = [...inventory];

  if (searchQuery) {
    processedInventory = processedInventory.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    processedInventory = processedInventory.filter((item) =>
      selectedCategories.includes(item.category)
    );
  }

  if (statusFilter !== 'All') {
    processedInventory = processedInventory.filter(
      (item) => item.status === statusFilter
    );
  }

  // Sorting
  processedInventory.sort((a, b) => {
    if (sortBy === 'newest') {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();
      return dateB - dateA;
    }
    if (sortBy === 'oldest') {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();
      return dateA - dateB;
    }
    if (sortBy === 'expiring_soon') {
      return (
        new Date(a.expirationDate).getTime() -
        new Date(b.expirationDate).getTime()
      );
    }
    if (sortBy === 'name_asc') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'quantity_high') {
      return b.quantity - a.quantity;
    }
    if (sortBy === 'quantity_low') {
      return a.quantity - b.quantity;
    }
    return 0;
  });

  const totalItems = inventory.length;
  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = inventory.filter((item) => item.status === 'Low Stock')
    .length;

  return (
    <div
      className={`space-y-8 max-w-7xl mx-auto min-h-screen relative ${
        theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
      }`}
    >
      {/* Header Section with Stats */}
      <div
        className={`pb-6 border-b relative z-20 ${
          theme === 'light' ? 'border-gray-100' : 'border-gray-700'
        }`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`p-2.5 rounded-xl ${
              theme === 'light' ? 'bg-blue-100' : 'bg-blue-900/40'
            }`}
          >
            <ArchiveBoxIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1
              className={`text-4xl font-extrabold tracking-tight ${
                theme === 'light' ? 'text-gray-900' : 'text-gray-100'
              }`}
            >
              Current Inventory
            </h1>
            <p
              className={`text-lg leading-relaxed ${
                theme === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              Manage and track your food inventory.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              theme === 'light'
                ? 'bg-white border-gray-100'
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <div
              className={`text-sm font-medium ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              Total Items
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {totalItems}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              theme === 'light'
                ? 'bg-white border-gray-100'
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <div
              className={`text-sm font-medium ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              Low Stock Items
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {lowStockItems}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              theme === 'light'
                ? 'bg-white border-gray-100'
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <div
              className={`text-sm font-medium ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}
            >
              Total Stock
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {totalQuantity}+
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b relative z-20 ${
          theme === 'light' ? 'border-gray-100' : 'border-gray-700'
        }`}
      >
        <div className="flex gap-2 sm:gap-3 w-full lg:w-auto relative flex-grow">
          <div className="relative flex-grow w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon
                className={`h-6 w-6 ${
                  theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Search inventory..."
              className={`pl-12 pr-4 py-3.5 w-full border rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm font-medium ${
                theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-700 shadow-gray-100'
                  : 'bg-gray-800 border-gray-700 text-gray-100 shadow-gray-900'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-4 py-3.5 border rounded-xl transition-all shadow-sm font-medium flex items-center gap-2 ${
              isFilterOpen
                ? theme === 'light'
                  ? 'bg-white border-blue-500 text-blue-600 ring-2 ring-blue-100'
                  : 'bg-gray-700 border-blue-500 text-blue-400 ring-2 ring-blue-900'
                : theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-700 hover:border-blue-400'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500'
            }`}
          >
            <FunnelIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div
          className={`p-6 rounded-2xl border shadow-sm animate-fade-in-up ${
            theme === 'light'
              ? 'bg-white border-gray-100'
              : 'bg-gray-800 border-gray-700'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <h3
                className={`text-sm font-semibold mb-3 ${
                  theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}
              >
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label key={cat.value} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.value)}
                      onChange={() => toggleCategory(cat.value)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <span
                      className={`text-sm font-medium ${
                        theme === 'light'
                          ? 'text-gray-700'
                          : 'text-gray-300'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h3
                className={`text-sm font-semibold mb-3 ${
                  theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}
              >
                Status
              </h3>
              <Select
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
              />
            </div>

            {/* Sort Options */}
            <div>
              <h3
                className={`text-sm font-semibold mb-3 ${
                  theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}
              >
                Sort By
              </h3>
              <Select
                options={SORT_OPTIONS}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex gap-3 justify-end pt-4 mt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                theme === 'light'
                  ? 'text-gray-700 hover:bg-gray-50'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Inventory Grid */}
      {processedInventory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
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
      ) : (
        <div
          className={`flex flex-col items-center justify-center py-16 rounded-2xl border-2 border-dashed ${
            theme === 'light'
              ? 'bg-gray-50 border-gray-200'
              : 'bg-gray-800 border-gray-700'
          }`}
        >
          <ArchiveBoxIcon
            className={`w-16 h-16 mb-4 ${
              theme === 'light' ? 'text-gray-300' : 'text-gray-600'
            }`}
          />
          <p
            className={`text-lg font-semibold ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            No inventory items found
          </p>
          <p
            className={`text-sm mt-1 ${
              theme === 'light' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Try adjusting your filters or add new stock.
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentInventory;
