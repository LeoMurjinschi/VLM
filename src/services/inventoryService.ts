import type { InventoryItem } from '../_mock';
import { stockStore } from './stockStore';

const SIMULATED_LATENCY_MS = 400;

const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchInventory = async (
  filters: {
    search?: string;
    categories?: string[];
    status?: string;
    sortBy?: string;
  },
  page: number = 1,
  pageSize: number = 50
): Promise<InventoryItem[]> => {
  await simulateNetworkDelay();

  let results = stockStore.getAll();

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
    if (filters.sortBy === 'oldest') {
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
  return results.slice(startIndex, startIndex + pageSize);
};

export const addInventoryItem = async (
  item: Omit<InventoryItem, 'id' | 'status'>
): Promise<InventoryItem> => {
  await simulateNetworkDelay(300);

  const newItem: InventoryItem = {
    ...item,
    id: `inv_${Date.now()}`,
    status: 'In Stock',
  };

  return stockStore.add(newItem);
};

export const updateInventoryItem = async (
  id: string,
  updates: Partial<InventoryItem>
): Promise<InventoryItem> => {
  await simulateNetworkDelay(300);

  const updated = stockStore.update(id, updates);
  if (!updated) throw new Error('Inventory item not found');
  return updated;
};

export const deleteInventoryItem = async (id: string): Promise<boolean> => {
  await simulateNetworkDelay(300);
  stockStore.remove(id);
  return true;
};

export const fetchInventoryCategories = async (): Promise<string[]> => {
  await simulateNetworkDelay(200);
  return ['Vegetables', 'Fruits', 'Bakery', 'Cooked Food', 'Dairy'];
};

export const getInventoryStats = async (): Promise<{
  totalItems: number;
  lowStockCount: number;
  expiredCount: number;
  totalQuantity: number;
}> => {
  await simulateNetworkDelay(200);

  const all = stockStore.getAll();
  return {
    totalItems: all.length,
    lowStockCount: all.filter((i) => i.status === 'Low Stock').length,
    expiredCount: all.filter((i) => i.status === 'Expired').length,
    totalQuantity: all.reduce((sum, i) => sum + i.quantity, 0),
  };
};
