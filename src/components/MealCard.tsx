import React from 'react';
import { Clock } from 'lucide-react';
import { Meal } from '../types';
import { Link } from 'react-router-dom';

interface MealCardProps {
  meal: Meal;
  className?: string;
}

const MealCard: React.FC<MealCardProps> = ({ meal, className = '' }) => {
  const getMealTypeColor = (mealType: Meal['mealType']) => {
    const colors = {
      BREAKFAST: 'bg-orange-100 text-orange-800',
      LUNCH: 'bg-green-100 text-green-800',
      DINNER: 'bg-blue-100 text-blue-800',
      BITE: 'bg-purple-100 text-purple-800'
    };
    return colors[mealType];
  };

  return (
    <Link
      to={`/meals/${meal.id}`}
      className={`block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200 active:scale-95 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span 
          className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getMealTypeColor(meal.mealType)}`}
        >
          {meal.mealType}
        </span>
        <div className="flex items-center space-x-2">
          {meal.leftover && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Leftover
            </span>
          )}
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{meal.cookingTime}m</span>
          </div>
        </div>
      </div>
      
      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
        {meal.name}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
        {meal.description}
      </p>
    </Link>
  );
};

export default MealCard;