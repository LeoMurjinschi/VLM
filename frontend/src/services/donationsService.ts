import type { Donation } from '../_mock';
import { stockStore, toDonation } from './stockStore';

const SIMULATED_LATENCY_MS = 400;

const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDonations = async (
  filters: {
    search?: string;
    categories?: string[];
    status?: string;
    urgency?: string;
  },
  page: number = 1,
  pageSize: number = 50
): Promise<Donation[]> => {
  await simulateNetworkDelay();

  // Only items with remaining quantity are shown in the feed
  let results = stockStore
    .getAll()
    .filter((item) => item.quantity > 0)
    .map(toDonation);

  if (filters.search && filters.search.trim()) {
    const query = filters.search.toLowerCase();
    results = results.filter(
      (d) =>
        d.title.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
    );
  }

  if (filters.categories && filters.categories.length > 0) {
    results = results.filter((d) => filters.categories!.includes(d.category));
  }

  if (filters.status && filters.status !== 'All') {
    results = results.filter((d) => d.status === filters.status);
  }

  if (filters.urgency === 'Expiring Soon') {
    const fortyEightHoursFromNow = Date.now() + 48 * 60 * 60 * 1000;
    results = results.filter(
      (d) => new Date(d.expirationDate).getTime() <= fortyEightHoursFromNow
    );
  }

  const startIndex = (page - 1) * pageSize;
  return results.slice(startIndex, startIndex + pageSize);
};

export const reserveDonation = async (
  donationId: string,
  amount: number = 1
): Promise<boolean> => {
  await simulateNetworkDelay(300);

  const item = stockStore.getById(donationId);
  if (!item) throw new Error('Donation not found.');
  if (item.quantity <= 0) throw new Error('This donation is no longer available.');

  const newQuantity = Math.max(0, item.quantity - amount);
  stockStore.update(donationId, { quantity: newQuantity });
  return true;
};

export const fetchDonationCategories = async (): Promise<string[]> => {
  await simulateNetworkDelay(200);
  return ['Vegetables', 'Fruits', 'Bakery', 'Cooked Food', 'Dairy'];
};

export type DonationUpdate = Partial<{
  title: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  pickupLocation: string;
  expirationDate: string;
  image: string;
  status: 'Available' | 'Reserved';
}>;

export const updateDonation = async (
  donationId: string,
  updates: DonationUpdate
): Promise<Donation | null> => {
  await simulateNetworkDelay(250);
  const inventoryUpdates: Record<string, unknown> = { ...updates };
  // Map donation status -> inventory quantity flip if explicitly set
  if (updates.status === 'Reserved') {
    delete inventoryUpdates.status;
    inventoryUpdates.quantity = 0;
  } else if (updates.status === 'Available') {
    delete inventoryUpdates.status;
    const existing = stockStore.getById(donationId);
    if (existing && existing.quantity <= 0) inventoryUpdates.quantity = 1;
  }
  const updated = stockStore.update(donationId, inventoryUpdates as Partial<import('../_mock').InventoryItem>);
  return updated ? toDonation(updated) : null;
};

export const deleteDonation = async (donationId: string): Promise<boolean> => {
  await simulateNetworkDelay(200);
  const existing = stockStore.getById(donationId);
  if (!existing) return false;
  stockStore.remove(donationId);
  return true;
};

export const sortDonations = async (
  donations: Donation[],
  sortBy: string
): Promise<Donation[]> => {
  await simulateNetworkDelay(100);

  const sorted = [...donations];

  if (sortBy === 'expires_first') {
    sorted.sort(
      (a, b) =>
        new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
    );
  } else if (sortBy === 'name_asc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sorted;
};
