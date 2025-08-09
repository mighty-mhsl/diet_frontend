import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { formatDate, getGreeting } from '../utils/dateUtils';
import MealCard from '../components/MealCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { meals, shoppingList, isLoading } = useAppContext();
  const today = new Date();

  // Get meals for today (in a real app, this would filter by date)
  const todaysMeals = meals.slice(0, 4);
  
  // Get first 3 shopping items that aren't purchased
  const upcomingShoppingItems = shoppingList.filter(item => !item.purchased).slice(0, 3);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 md:pb-0">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading your meal plan...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <div className="max-w-md mx-auto md:max-w-4xl">
        {/* Greeting Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {getGreeting()}!
          </h1>
          <p className="text-green-100 text-sm md:text-base">
            {formatDate(today)}
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Today's Meals Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Meals</h2>
            {todaysMeals.length > 0 ? (
              <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                {todaysMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 mb-2">No meals planned for today</p>
                <button className="text-green-600 font-medium hover:text-green-700">
                  Plan your meals
                </button>
              </div>
            )}
          </section>

          {/* Shopping List Preview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Shopping List</h2>
              <Link 
                to="/shopping" 
                className="text-green-600 font-medium hover:text-green-700 text-sm"
              >
                View All
              </Link>
            </div>
            
            {upcomingShoppingItems.length > 0 ? (
              <div className="space-y-3">
                {upcomingShoppingItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.ingredientName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.grams} g
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">
                      ${item.estimatedCost}
                    </span>
                  </div>
                ))}
                
                {shoppingList.filter(item => !item.purchased).length > 3 && (
                  <Link 
                    to="/shopping"
                    className="block text-center py-3 text-green-600 font-medium hover:text-green-700 bg-green-50 rounded-lg transition-colors"
                  >
                    +{shoppingList.filter(item => !item.purchased).length - 3} more items
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-6 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 mb-2">Your shopping list is empty</p>
                <Link 
                  to="/shopping" 
                  className="text-green-600 font-medium hover:text-green-700"
                >
                  Add items
                </Link>
              </div>
            )}
          </section>

          {/* Quick Stats */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {todaysMeals.reduce((total, meal) => total + meal.cookingTime, 0)}m
              </div>
              <div className="text-sm text-gray-600">Cooking Time Today</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {shoppingList.filter(item => !item.purchased).length}
              </div>
              <div className="text-sm text-gray-600">Items to Buy</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;