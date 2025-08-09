import { InventoryItem } from '../types';

export const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Extra Virgin Olive Oil",
    quantity: "300",
    unit: "ml",
    expirationDate: "2025-12-01",
    status: "good"
  },
  {
    id: 2,
    name: "Greek Yogurt",
    quantity: "2",
    unit: "containers",
    expirationDate: "2025-01-25",
    status: "expiring"
  },
  {
    id: 3,
    name: "Quinoa",
    quantity: "250",
    unit: "g",
    expirationDate: "2025-06-15",
    status: "good"
  },
  {
    id: 4,
    name: "Walnuts",
    quantity: "150",
    unit: "g",
    expirationDate: "2025-01-18",
    status: "expired"
  },
  {
    id: 5,
    name: "Feta Cheese",
    quantity: "100",
    unit: "g",
    expirationDate: "2025-01-28",
    status: "good"
  }
];
