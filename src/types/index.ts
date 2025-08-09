export interface Ingredient {
  name: string;
  grams: number;
  details?: string;
}

export interface Meal {
  id: number;
  name: string;
  mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'BITE';
  description: string;
  healthBenefits: string;
  cookingTime: number;
  leftover: boolean;
  cookDate?: [number, number, number];
  ingredients: Ingredient[];
  recipe: string;
}

export interface ShoppingListItem {
  id: number;
  ingredientName: string;
  grams: number;
  purchased: boolean;
  estimatedCost: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  expirationDate: string;
  status: 'good' | 'expiring' | 'expired';
}

export interface AppState {
  meals: Meal[];
  shoppingList: ShoppingListItem[];
  inventory: InventoryItem[];
  isLoading: boolean;
}