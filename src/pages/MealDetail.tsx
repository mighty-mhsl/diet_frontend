import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const MealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { meals, isLoading } = useAppContext();
  
  const meal = meals.find(m => m.id === parseInt(id || ''));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Meal Not Found" showBackButton />
        <div className="max-w-md mx-auto p-4 text-center">
          <p className="text-gray-600">The requested meal could not be found.</p>
        </div>
      </div>
    );
  }

  const getMealTypeColor = (mealType: string) => {
    const colors = {
      BREAKFAST: 'bg-orange-100 text-orange-800 border-orange-200',
      LUNCH: 'bg-green-100 text-green-800 border-green-200',
      DINNER: 'bg-blue-100 text-blue-800 border-blue-200',
      SNACK: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[mealType as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Header title={meal.name} showBackButton className="bg-green-600 text-white border-green-700">
        <div className="flex items-center space-x-1 text-green-100">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{meal.cookingTime}m</span>
        </div>
      </Header>

      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="p-4 space-y-6">
          {/* Meal Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span 
                className={`px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide border ${getMealTypeColor(meal.mealType)}`}
              >
                {meal.mealType}
              </span>
              {meal.leftover && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                  Leftover
                </span>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {meal.name}
            </h1>
            
            <p className="text-gray-600 leading-relaxed">
              {meal.description}
            </p>
          </div>

          {/* Health Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-3">
              Why This Meal?
            </h2>
            <p className="text-blue-800 leading-relaxed">
              {meal.healthBenefits}
            </p>
          </div>

          {/* Ingredients */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Ingredients
            </h2>
            <ul className="space-y-3">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-900 font-medium">
                    {ingredient.name}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recipe */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Recipe
            </h2>
            <div className="prose prose-sm max-w-none">
              {meal.recipe.split('\n\n').map((step, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                  {step}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;