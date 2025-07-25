import { Meal, ShoppingListItem, InventoryItem } from '../types';

export const mockMeals: Meal[] = [
  {
    id: 1,
    name: "Mediterranean Quinoa Bowl",
    mealType: "LUNCH",
    description: "Protein-rich quinoa with fresh vegetables, olives, and feta cheese",
    healthBenefits: "High in plant protein and omega-3 fatty acids. Quinoa provides all essential amino acids while olive oil supports heart health. Rich in fiber and antioxidants from colorful vegetables.",
    cookingTime: 25,
    leftover: false,
    ingredients: [
      { name: "Quinoa", quantity: "1", unit: "cup" },
      { name: "Cherry tomatoes", quantity: "200", unit: "g" },
      { name: "Cucumber", quantity: "1", unit: "medium" },
      { name: "Kalamata olives", quantity: "50", unit: "g" },
      { name: "Feta cheese", quantity: "80", unit: "g" },
      { name: "Extra virgin olive oil", quantity: "2", unit: "tbsp" },
      { name: "Lemon juice", quantity: "1", unit: "tbsp" },
      { name: "Fresh herbs", quantity: "2", unit: "tbsp" }
    ],
    recipe: "1. Rinse quinoa and cook in vegetable broth according to package directions (about 15 minutes).\n\n2. Meanwhile, dice cucumber and halve cherry tomatoes.\n\n3. Crumble feta cheese and roughly chop olives.\n\n4. Whisk olive oil, lemon juice, salt, and pepper for dressing.\n\n5. Combine cooked quinoa with vegetables, olives, and feta.\n\n6. Drizzle with dressing and garnish with fresh herbs.\n\n7. Serve immediately or chill for 30 minutes for best flavor."
  },
  {
    id: 2,
    name: "Greek Yogurt with Honey & Nuts",
    mealType: "BREAKFAST",
    description: "Creamy Greek yogurt topped with raw honey, walnuts, and fresh berries",
    healthBenefits: "Packed with probiotics for digestive health and high-quality protein. Walnuts provide omega-3 fatty acids and vitamin E. Berries offer powerful antioxidants and fiber.",
    cookingTime: 5,
    leftover: false,
    ingredients: [
      { name: "Greek yogurt", quantity: "200", unit: "g" },
      { name: "Raw honey", quantity: "1", unit: "tbsp" },
      { name: "Walnuts", quantity: "30", unit: "g" },
      { name: "Mixed berries", quantity: "100", unit: "g" },
      { name: "Cinnamon", quantity: "1", unit: "pinch" }
    ],
    recipe: "1. Place Greek yogurt in a serving bowl.\n\n2. Drizzle honey over the yogurt.\n\n3. Roughly chop walnuts and sprinkle on top.\n\n4. Add fresh mixed berries.\n\n5. Dust lightly with cinnamon.\n\n6. Serve immediately for best texture."
  },
  {
    id: 3,
    name: "Grilled Sea Bass with Vegetables",
    mealType: "DINNER",
    description: "Fresh sea bass grilled with Mediterranean herbs and seasonal vegetables",
    healthBenefits: "Rich in omega-3 fatty acids and lean protein. Grilled vegetables retain maximum nutrients while herbs provide antioxidants and anti-inflammatory compounds.",
    cookingTime: 35,
    leftover: false,
    ingredients: [
      { name: "Sea bass fillets", quantity: "400", unit: "g" },
      { name: "Zucchini", quantity: "2", unit: "medium" },
      { name: "Bell peppers", quantity: "2", unit: "pieces" },
      { name: "Red onion", quantity: "1", unit: "small" },
      { name: "Extra virgin olive oil", quantity: "3", unit: "tbsp" },
      { name: "Lemon", quantity: "1", unit: "large" },
      { name: "Fresh rosemary", quantity: "2", unit: "sprigs" },
      { name: "Garlic", quantity: "2", unit: "cloves" }
    ],
    recipe: "1. Preheat grill to medium-high heat.\n\n2. Pat sea bass fillets dry and season with salt, pepper, and minced garlic.\n\n3. Slice zucchini and bell peppers, cut onion into wedges.\n\n4. Toss vegetables with olive oil, salt, and pepper.\n\n5. Grill vegetables for 15-20 minutes, turning occasionally.\n\n6. Grill sea bass for 4-5 minutes per side until flaky.\n\n7. Squeeze fresh lemon juice over fish and vegetables.\n\n8. Garnish with fresh rosemary and serve hot."
  },
  {
    id: 4,
    name: "Mediterranean Trail Mix",
    mealType: "SNACK",
    description: "Energy-boosting mix of almonds, dried figs, and dark chocolate",
    healthBenefits: "Provides sustained energy from healthy fats and natural sugars. Almonds offer vitamin E and magnesium, while dark chocolate contains flavonoids for heart health.",
    cookingTime: 0,
    leftover: true,
    ingredients: [
      { name: "Raw almonds", quantity: "40", unit: "g" },
      { name: "Dried figs", quantity: "30", unit: "g" },
      { name: "Dark chocolate", quantity: "20", unit: "g" },
      { name: "Sunflower seeds", quantity: "15", unit: "g" }
    ],
    recipe: "1. Combine all ingredients in a small container.\n\n2. Mix well to distribute evenly.\n\n3. Store in an airtight container for up to one week.\n\n4. Portion into 30g servings for perfect snack sizes."
  }
];

export const mockShoppingList: ShoppingListItem[] = [
  {
    id: 1,
    ingredientName: "Extra Virgin Olive Oil",
    quantity: "500",
    unit: "ml",
    purchased: false,
    estimatedCost: "8.99"
  },
  {
    id: 2,
    ingredientName: "Fresh Spinach",
    quantity: "200",
    unit: "g",
    purchased: true,
    estimatedCost: "3.49"
  },
  {
    id: 3,
    ingredientName: "Greek Yogurt",
    quantity: "1",
    unit: "large container",
    purchased: false,
    estimatedCost: "4.99"
  },
  {
    id: 4,
    ingredientName: "Quinoa",
    quantity: "500",
    unit: "g",
    purchased: false,
    estimatedCost: "6.49"
  },
  {
    id: 5,
    ingredientName: "Cherry Tomatoes",
    quantity: "400",
    unit: "g",
    purchased: false,
    estimatedCost: "4.29"
  },
  {
    id: 6,
    ingredientName: "Feta Cheese",
    quantity: "200",
    unit: "g",
    purchased: true,
    estimatedCost: "5.99"
  },
  {
    id: 7,
    ingredientName: "Kalamata Olives",
    quantity: "150",
    unit: "g",
    purchased: false,
    estimatedCost: "3.79"
  },
  {
    id: 8,
    ingredientName: "Raw Honey",
    quantity: "350",
    unit: "g",
    purchased: false,
    estimatedCost: "7.99"
  }
];

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