import { MOCK_INVENTORY } from '../_mock';
import type { InventoryItem, Donation } from '../_mock';

const STORAGE_KEY = 'foodshare_stock_v1';

type Listener = () => void;
const listeners = new Set<Listener>();

function load(): InventoryItem[] {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return [...MOCK_INVENTORY];
}

let store: InventoryItem[] = load();

function persist() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
  } catch {
    // ignore quota errors
  }
}

function notify() {
  listeners.forEach((l) => l());
}

function deriveStatus(quantity: number): InventoryItem['status'] {
  if (quantity <= 0) return 'Expired';
  if (quantity < 5) return 'Low Stock';
  return 'In Stock';
}

export const stockStore = {
  getAll: (): InventoryItem[] => [...store],
  getById: (id: string): InventoryItem | undefined => store.find((i) => i.id === id),
  add: (item: InventoryItem): InventoryItem => {
    const next: InventoryItem = { ...item, status: deriveStatus(item.quantity) };
    store = [next, ...store];
    persist();
    notify();
    return next;
  },
  update: (id: string, updates: Partial<InventoryItem>): InventoryItem | undefined => {
    let updated: InventoryItem | undefined;
    store = store.map((item) => {
      if (item.id !== id) return item;
      const merged = { ...item, ...updates };
      if (updates.quantity !== undefined) {
        merged.status = deriveStatus(merged.quantity);
      }
      updated = merged;
      return merged;
    });
    persist();
    notify();
    return updated;
  },
  remove: (id: string): void => {
    store = store.filter((i) => i.id !== id);
    persist();
    notify();
  },
  reset: (): void => {
    store = [...MOCK_INVENTORY];
    persist();
    notify();
  },
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function toDonation(item: InventoryItem): Donation {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    status: item.quantity <= 0 ? 'Reserved' : 'Available',
    pickupLocation: item.pickupLocation,
    expirationDate: item.expirationDate,
    postedAt: item.addedAt,
    image: item.image,
    quantity: item.quantity,
    unit: item.unit,
  };
}
