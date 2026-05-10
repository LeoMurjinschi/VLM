import React, { type ReactNode, createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { InventoryItem, Donation } from '../_mock';
import { stockStore, toDonation } from '../services/stockStore';

interface InventoryContextType {
  inventory: InventoryItem[];
  donations: Donation[];
  addStock: (item: InventoryItem) => void;
  reserveStock: (id: string, amount: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  deleteStock: (id: string) => void;
  updateStock: (id: string, updates: Partial<InventoryItem>) => void;
  setStockStatus: (id: string, status: 'Available' | 'Reserved') => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => stockStore.getAll());

  useEffect(() => {
    const unsubscribe = stockStore.subscribe(() => {
      setInventory(stockStore.getAll());
    });
    return unsubscribe;
  }, []);

  const addStock = useCallback((item: InventoryItem) => {
    if (stockStore.getById(item.id)) {
      stockStore.update(item.id, item);
    } else {
      stockStore.add(item);
    }
  }, []);

  const reserveStock = useCallback((id: string, amount: number) => {
    const item = stockStore.getById(id);
    if (!item) return;
    const newQuantity = Math.max(0, item.quantity - amount);
    stockStore.update(id, { quantity: newQuantity });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    stockStore.update(id, { quantity });
  }, []);

  const deleteStock = useCallback((id: string) => {
    stockStore.remove(id);
  }, []);

  const updateStock = useCallback((id: string, updates: Partial<InventoryItem>) => {
    stockStore.update(id, updates);
  }, []);

  const setStockStatus = useCallback((id: string, status: 'Available' | 'Reserved') => {
    const item = stockStore.getById(id);
    if (!item) return;
    if (status === 'Reserved') {
      stockStore.update(id, { quantity: 0 });
    } else if (item.quantity <= 0) {
      stockStore.update(id, { quantity: 1 });
    }
  }, []);

  const donations = useMemo(
    () => inventory.filter((i) => i.quantity > 0).map(toDonation),
    [inventory]
  );

  const value = useMemo(
    () => ({
      inventory,
      donations,
      addStock,
      reserveStock,
      updateQuantity,
      deleteStock,
      updateStock,
      setStockStatus,
    }),
    [inventory, donations, addStock, reserveStock, updateQuantity, deleteStock, updateStock, setStockStatus]
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
