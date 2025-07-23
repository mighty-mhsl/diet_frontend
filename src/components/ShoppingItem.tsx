import React from 'react';
import { Check } from 'lucide-react';
import { ShoppingListItem } from '../types';

interface ShoppingItemProps {
  item: ShoppingListItem;
  onTogglePurchased: (id: number) => void;
  className?: string;
}

const ShoppingItem: React.FC<ShoppingItemProps> = ({ 
  item, 
  onTogglePurchased, 
  className = '' 
}) => {
  const handleToggle = () => {
    onTogglePurchased(item.id);
  };

  return (
    <div 
      className={`flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 transition-all duration-200 ${
        item.isPurchased ? 'opacity-60' : ''
      } ${className}`}
    >
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          item.isPurchased
            ? 'bg-green-600 border-green-600 text-white'
            : 'border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200'
        }`}
        aria-label={item.isPurchased ? 'Mark as not purchased' : 'Mark as purchased'}
      >
        {item.isPurchased && <Check className="w-4 h-4" />}
      </button>
      
      <div className="flex-grow min-w-0">
        <h3 className={`font-medium text-gray-900 truncate ${
          item.isPurchased ? 'line-through' : ''
        }`}>
          {item.ingredientName}
        </h3>
        <p className="text-sm text-gray-500">
          {item.quantity} {item.unit}
        </p>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <p className={`font-semibold ${
          item.isPurchased ? 'text-gray-400 line-through' : 'text-gray-900'
        }`}>
          ${item.estimatedCost}
        </p>
      </div>
    </div>
  );
};

export default ShoppingItem;