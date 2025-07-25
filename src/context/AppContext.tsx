import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, InventoryItem, Meal } from '../types';
import { mockShoppingList, mockInventory } from '../data/mockData';

interface AppContextType extends AppState {
  toggleShoppingItemPurchased: (id: number) => void;
  updateInventoryQuantity: (id: number, change: number) => void;
  deleteInventoryItem: (id: number) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    meals: [],
    shoppingList: [],
    inventory: [],
    isLoading: true
  });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const res = await fetch('http://localhost:8080/api/meal-plans/current');
        let meals: Meal[] = [];
        if (res.ok) {
          type MealResponse = Omit<Meal, 'isLeftover'> & { leftover: boolean };
          const data: MealResponse[] = await res.json();
          meals = data.map((m) => ({
            ...m,
            isLeftover: m.leftover,
          }));
        }

        setState({
          meals,
          shoppingList: mockShoppingList,
          inventory: mockInventory,
          isLoading: false
        });
      } catch (err) {
        console.error('Failed to load meals', err);
        setState({
          meals: [],
          shoppingList: mockShoppingList,
          inventory: mockInventory,
          isLoading: false
        });
      }
    };

    loadData();
  }, []);

  const toggleShoppingItemPurchased = (id: number) => {
    setState(prev => ({
      ...prev,
      shoppingList: prev.shoppingList.map(item =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    }));
  };

  const updateInventoryQuantity = (id: number, change: number) => {
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.map(item => {
        if (item.id === id) {
          const currentQuantity = parseInt(item.quantity);
          const newQuantity = Math.max(0, currentQuantity + change);
          return { ...item, quantity: newQuantity.toString() };
        }
        return item;
      }).filter(item => parseInt(item.quantity) > 0)
    }));
  };

  const deleteInventoryItem = (id: number) => {
    setState(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== id)
    }));
  };

  const addInventoryItem = (newItem: Omit<InventoryItem, 'id'>) => {
    setState(prev => ({
      ...prev,
      inventory: [...prev.inventory, { ...newItem, id: Date.now() }]
    }));
  };

  const value: AppContextType = {
    ...state,
    toggleShoppingItemPurchased,
    updateInventoryQuantity,
    deleteInventoryItem,
    addInventoryItem
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};