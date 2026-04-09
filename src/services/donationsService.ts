
import type { Donation } from '../_mock';
import type { ReportFilters } from '../types/reports';
import { MOCK_DONATIONS } from '../_mock';

const SIMULATED_LATENCY_MS = 800;


const simulateRandomError = (): boolean => {
  return Math.random() < 0.1;
};


const simulateNetworkDelay = (ms: number = SIMULATED_LATENCY_MS): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchDonations = async (
  filters: {
    search?: string;
    categories?: string[];
    status?: string;
    urgency?: string;
  },
  page: number = 1,
  pageSize: number = 10
): Promise<Donation[]> => {
  await simulateNetworkDelay();

  if (simulateRandomError()) {
    throw new Error('Failed to fetch donations. Please try again later.');
  }

  let results = [...MOCK_DONATIONS];


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
    const fortyEightHoursFromNow = new Date().getTime() + 48 * 60 * 60 * 1000;
    results = results.filter(
      (d) => new Date(d.expirationDate).getTime() <= fortyEightHoursFromNow
    );
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return results.slice(startIndex, endIndex);
};

export const reserveDonation = async (donationId: string): Promise<boolean> => {
  await simulateNetworkDelay(500);

  if (simulateRandomError()) {
    throw new Error('Failed to reserve donation. Please try again later.');
  }

  return true;
};

export const fetchDonationCategories = async (): Promise<string[]> => {
  await simulateNetworkDelay(300);

  return ['Vegetables', 'Fruits', 'Bakery', 'Cooked Food', 'Dairy'];
};

export const sortDonations = async (
  donations: Donation[],
  sortBy: string
): Promise<Donation[]> => {
  await simulateNetworkDelay(200);

  const sorted = [...donations];

  if (sortBy === 'expires_first') {
    sorted.sort(
      (a, b) =>
        new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
    );
  } else if (sortBy === 'name_asc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'newest') {

    return sorted;
  }

  return sorted;
};
