import React from 'react';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import ShoppingItem from '../components/ShoppingItem';
import LoadingSpinner from '../components/LoadingSpinner';

const ShoppingList: React.FC = () => {
  const { shoppingList, toggleShoppingItemPurchased, isLoading } = useAppContext();

  const unpurchasedItems = shoppingList.filter(item => !item.isPurchased);
  const purchasedItems = shoppingList.filter(item => item.isPurchased);

  const totalCost = unpurchasedItems.reduce((total, item) => 
    total + parseFloat(item.estimatedCost), 0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Header 
        title="Shopping List" 
        showBackButton 
      >
        <div className="text-right">
          <div className="text-sm text-gray-600">Remaining</div>
          <div className="font-bold text-gray-900">{unpurchasedItems.length} items</div>
        </div>
      </Header>

      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="p-4 space-y-6">
          {/* Cost Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Estimated Total</h2>
                <p className="text-sm text-gray-600">
                  {unpurchasedItems.length} items remaining
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  ${totalCost.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* To Buy Section */}
          {unpurchasedItems.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                To Buy ({unpurchasedItems.length})
              </h2>
              <div className="space-y-3">
                {unpurchasedItems.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    item={item}
                    onTogglePurchased={toggleShoppingItemPurchased}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Purchased Section */}
          {purchasedItems.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Purchased ({purchasedItems.length})
              </h2>
              <div className="space-y-3">
                {purchasedItems.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    item={item}
                    onTogglePurchased={toggleShoppingItemPurchased}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {shoppingList.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your shopping list is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Items will appear here when you plan meals or add ingredients manually.
              </p>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Add Items
              </button>
            </div>
          )}

          {/* Quick Actions */}
          {unpurchasedItems.length > 0 && (
            <div className="bg-gray-100 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => unpurchasedItems.forEach(item => toggleShoppingItemPurchased(item.id))}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Mark All as Purchased
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;