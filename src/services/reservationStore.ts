import type { Reservation } from '../types/reservation';

const STORAGE_KEY = 'foodshare_reservations_v1';

type Listener = () => void;
const listeners = new Set<Listener>();

function load(): Reservation[] {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

let store: Reservation[] = load();

function persist() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    }
  } catch {
    // ignore
  }
}

function notify() {
  listeners.forEach((l) => l());
}

export const reservationStore = {
  getAll: (): Reservation[] => [...store],
  getById: (id: string): Reservation | undefined => store.find((r) => r.id === id),
  getByDonor: (donorId: string): Reservation[] => store.filter((r) => r.donorId === donorId),
  getByReceiver: (receiverId: string): Reservation[] => store.filter((r) => r.receiverId === receiverId),
  getByStock: (stockId: string): Reservation[] => store.filter((r) => r.stockId === stockId),
  add: (reservation: Reservation): Reservation => {
    store = [reservation, ...store];
    persist();
    notify();
    return reservation;
  },
  update: (id: string, updates: Partial<Reservation>): Reservation | undefined => {
    let updated: Reservation | undefined;
    store = store.map((r) => {
      if (r.id !== id) return r;
      updated = { ...r, ...updates };
      return updated;
    });
    persist();
    notify();
    return updated;
  },
  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
