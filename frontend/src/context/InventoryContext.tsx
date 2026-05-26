import React, { type ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { InventoryItem, Donation } from '../_mock';
import { stockStore, toDonation } from '../services/stockStore';
import { donationService } from '../api';
import type { DonationInfoDto } from '../api/donationService';
import { useAuth } from './AuthContext';

interface InventoryContextType {
  inventory: InventoryItem[];
  donations: Donation[];
  fetchDonations: (filters: any) => Promise<void>;
  addStock: (item: InventoryItem) => void;
  reserveStock: (id: string, amount: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  deleteStock: (id: string) => void;
  updateStock: (id: string, updates: Partial<InventoryItem>) => void;
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

  const fetchDonations = useCallback(async (filters: any) => {
    try {
      let apiDonations: DonationInfoDto[] = [];
      if (user?.role === 'donor' && user.id) {
        apiDonations = await donationService.getDonationsByDonorId(parseInt(user.id, 10));
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
    if (user) { // Only fetch if user is loaded
        fetchDonations({});
    }
  }, [fetchDonations, user]);


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

  const updateQuantity = useCallback((id: string, quantity: number) => {
    // This should call an API to update a donation's quantity
  }, []);

  const deleteStock = useCallback((id: string) => {
    // This should call an API to delete a donation
  }, []);

  const updateStock = useCallback((id: string, updates: Partial<InventoryItem>) => {
    // This should call an API to update a donation
  }, []);

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