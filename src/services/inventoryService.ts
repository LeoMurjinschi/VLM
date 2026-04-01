import type { InventoryItem } from '../_mock';
import { MOCK_INVENTORY } from '../_mock';

const SIMULATED_LATENCY_MS = 800;

const simulateRandomError = (): boolean => {
  return Math.random() < 0.1;
};

const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchInventory = async (
  filters: {
    search?: string;
    categories?: string[];
    status?: string;
    sortBy?: string;
  },
  page: number = 1,
  pageSize: number = 15
): Promise<InventoryItem[]> => {
  await simulateNetworkDelay();

  if (simulateRandomError()) {
    throw new Error('Failed to fetch inventory. Please try again later.');
  }

  let results = [...MOCK_INVENTORY];

  if (filters.search && filters.search.trim()) {
    const query = filters.search.toLowerCase();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  if (filters.categories && filters.categories.length > 0) {
    results = results.filter((item) => filters.categories!.includes(item.category));
  }
  if (filters.status && filters.status !== 'All') {
    results = results.filter((item) => item.status === filters.status);
  }

  if (filters.sortBy) {
    if (filters.sortBy === 'newest') {

    } else if (filters.sortBy === 'oldest') {
      results = results.reverse();
    } else if (filters.sortBy === 'expiring_soon') {
      results.sort(
        (a, b) =>
          new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
      );
    } else if (filters.sortBy === 'name_asc') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'quantity_high') {
      results.sort((a, b) => b.quantity - a.quantity);
    } else if (filters.sortBy === 'quantity_low') {
      results.sort((a, b) => a.quantity - b.quantity);
    }
  }


  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return results.slice(startIndex, endIndex);
};

export const addInventoryItem = async (
  item: Omit<InventoryItem, 'id' | 'status'>
): Promise<InventoryItem> => {
  await simulateNetworkDelay(600);

  if (simulateRandomError()) {
    throw new Error('Failed to add inventory item. Please try again later.');
  }

  const newItem: InventoryItem = {
    ...item,
    id: `inv_${Date.now()}`,
    status: 'In Stock',
  };

  return newItem;
};

export const updateInventoryItem = async (
  id: string,
  updates: Partial<InventoryItem>
): Promise<InventoryItem> => {
  await simulateNetworkDelay(600);

  if (simulateRandomError()) {
    throw new Error('Failed to update inventory item. Please try again later.');
  }


  const updatedItem = MOCK_INVENTORY.find((item) => item.id === id);

  if (!updatedItem) {
    throw new Error('Inventory item not found');
  }

  return { ...updatedItem, ...updates };
};


export const deleteInventoryItem = async (id: string): Promise<boolean> => {
  await simulateNetworkDelay(500);

  if (simulateRandomError()) {
    throw new Error('Failed to delete inventory item. Please try again later.');
  }

 
  return true;
};

export const fetchInventoryCategories = async (): Promise<string[]> => {
  await simulateNetworkDelay(300);

  return ['Vegetables', 'Fruits', 'Bakery', 'Cooked Food', 'Dairy'];
};

export const getInventoryStats = async (): Promise<{
  totalItems: number;
  lowStockCount: number;
  expiredCount: number;
  totalQuantity: number;
}> => {
  await simulateNetworkDelay(400);

  const lowStockCount = MOCK_INVENTORY.filter((item) => item.status === 'Low Stock').length;
  const expiredCount = MOCK_INVENTORY.filter((item) => item.status === 'Expired').length;
  const totalQuantity = MOCK_INVENTORY.reduce((sum, item) => sum + item.quantity, 0);

  return {
    totalItems: MOCK_INVENTORY.length,
    lowStockCount,
    expiredCount,
    totalQuantity,
  };
};