import React, {type ReactNode, createContext, useContext, useState } from 'react';
import { MOCK_INVENTORY } from '../_mock';
import type { InventoryItem } from '../_mock';

interface InventoryContextType {
  inventory: InventoryItem[];
  addStock: (item: InventoryItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  deleteStock: (id: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);


  const addStock = (item: InventoryItem) => {
    setInventory((prev) => [item, ...prev]);
  };


  const updateQuantity = (id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            status: quantity === 0 ? 'Expired' : quantity < 5 ? 'Low Stock' : 'In Stock',
          };
        }
        return item;
      })
    );
  };

 
  const deleteStock = (id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <InventoryContext.Provider value={{ inventory, addStock, updateQuantity, deleteStock }}>
      {children}
    </InventoryContext.Provider>
  );
};


export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};