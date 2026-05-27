import React, { type ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { InventoryItem, Donation } from '../_mock';
import { stockStore, toDonation } from '../services/stockStore';
import { donationService } from '../api';
import type { DonationCreateDto, DonationInfoDto } from '../api/donationService';
import { useAuth } from './AuthContext';

interface InventoryContextType {
  inventory: InventoryItem[];
  donations: Donation[];
  fetchDonations: (filters: { sortBy?: string; categories?: string[]; status?: string }) => Promise<void>;
  addStock: (item: InventoryItem) => void;
  reserveStock: (id: string, amount: number) => void;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  deleteStock: (id: string) => Promise<void>;
  updateStock: (id: string, updates: Partial<InventoryItem>) => Promise<void>;
  setStockStatus: (id: string, status: 'Available' | 'Reserved') => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

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

const mapDonationToInventoryItem = (donation: Donation): InventoryItem => ({
    id: donation.id,
    title: donation.title,
    description: donation.description,
    category: donation.category,
    quantity: donation.quantity,
    unit: donation.unit,
    pickupLocation: donation.pickupLocation,
    expirationDate: donation.expirationDate,
    image: donation.image,
    addedAt: donation.postedAt,
    status: donation.status === 'Available' ? 'In Stock' : 'Expired',
    donorId: donation.donorId,
});

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const fetchDonations = useCallback(async (filters: { sortBy?: string; categories?: string[]; status?: string }) => {
    try {
      let apiDonations: DonationInfoDto[] = [];
      if (user?.role === 'donor' && user.id) {
        apiDonations = await donationService.getDonationsByDonorId(parseInt(user.id, 10), filters.sortBy, filters.categories, filters.status);
      } else {
        // For non-donors, we might not need to fetch anything for their specific inventory
        // Or we fetch all donations if they have a generic view
        // Based on the logic, inventory is donor-specific, so we can clear it for others.
        setInventory([]);
        setDonations([]); // Clearing donations as well if they are not supposed to see any
        return;
      }
      const mappedDonations = apiDonations.map(mapDonationDtoToDonation);
      setDonations(mappedDonations);
      
      const mappedInventory = mappedDonations.map(mapDonationToInventoryItem);
      setInventory(mappedInventory);

    } catch (err) {
      console.warn('API fetch failed, using mock data:', err);
      const mockDonations = stockStore.getAll().filter((i) => i.quantity > 0).map(toDonation);
      setDonations(mockDonations);
      setInventory(stockStore.getAll());
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDonations({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // intentionally omit fetchDonations — it recreates when user changes, this would double-fetch


  useEffect(() => {
    const unsubscribe = stockStore.subscribe(() => {
      // This might need to be adjusted based on whether you still use stockStore for anything
      // For now, we'll keep it, but it might become obsolete.
    });
    return unsubscribe;
  }, []);

  const addStock = useCallback((item: InventoryItem) => {
    // This should now probably call an API to create a donation
  }, []);

  const reserveStock = useCallback((id: string, amount: number) => {
    // This should call an API to reserve a donation
  }, []);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    const existing = inventory.find((item) => item.id === id);
    if (!existing || !user?.id) return;
    const dto: DonationCreateDto = {
      title: existing.title,
      description: existing.description,
      quantity,
      unit: existing.unit,
      donorId: parseInt(user.id, 10),
      category: existing.category,
      pickupLocation: existing.pickupLocation,
      expirationDate: existing.expirationDate,
      image: existing.image,
    };
    await donationService.update(parseInt(id, 10), dto);
    setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }, [inventory, user]);

  const deleteStock = useCallback(async (id: string) => {
    await donationService.delete(parseInt(id, 10));
    setInventory((prev) => prev.filter((item) => item.id !== id));
    setDonations((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const updateStock = useCallback(async (id: string, updates: Partial<InventoryItem>) => {
    const existing = inventory.find((item) => item.id === id);
    if (!existing || !user?.id) return;
    const dto: DonationCreateDto = {
      title: updates.title ?? existing.title,
      description: updates.description ?? existing.description,
      quantity: updates.quantity ?? existing.quantity,
      unit: updates.unit ?? existing.unit,
      donorId: parseInt(user.id, 10),
      category: updates.category ?? existing.category,
      pickupLocation: updates.pickupLocation ?? existing.pickupLocation,
      expirationDate: updates.expirationDate ?? existing.expirationDate,
      image: updates.image ?? existing.image,
    };
    await donationService.update(parseInt(id, 10), dto);
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, [inventory, user]);

  const setStockStatus = useCallback((id: string, status: 'Available' | 'Reserved') => {
    // This should call an API to update a donation's status
  }, []);

  const value = useMemo(
    () => ({
      inventory,
      donations,
      fetchDonations,
      addStock,
      reserveStock,
      updateQuantity,
      deleteStock,
      updateStock,
      setStockStatus,
    }),
    [inventory, donations, fetchDonations, addStock, reserveStock, updateQuantity, deleteStock, updateStock, setStockStatus]
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};