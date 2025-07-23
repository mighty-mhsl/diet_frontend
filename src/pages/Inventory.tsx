import React, { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getDaysUntilExpiration } from '../utils/dateUtils';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';

const Inventory: React.FC = () => {
  const { inventory, updateInventoryQuantity, deleteInventoryItem, isLoading } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      good: 'bg-green-100 text-green-800 border-green-200',
      expiring: 'bg-orange-100 text-orange-800 border-orange-200',
      expired: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getExpirationText = (expirationDate: string, status: string) => {
    const days = getDaysUntilExpiration(expirationDate);
    
    if (status === 'expired') return 'Expired';
    if (days === 0) return 'Expires today';
    if (days === 1) return 'Expires tomorrow';
    if (days <= 3) return `${days} days left`;
    
    return new Date(expirationDate).toLocaleDateString();
  };

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
        title="Inventory" 
        showBackButton 
      >
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
          aria-label="Add new item"
        >
          <Plus className="w-5 h-5" />
        </button>
      </Header>

      <div className="max-w-md mx-auto md:max-w-4xl">
        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">
                {inventory.length}
              </div>
              <div className="text-xs text-gray-600">Total Items</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-xl font-bold text-orange-600 mb-1">
                {inventory.filter(item => item.status === 'expiring').length}
              </div>
              <div className="text-xs text-gray-600">Expiring Soon</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
              <div className="text-xl font-bold text-red-600 mb-1">
                {inventory.filter(item => item.status === 'expired').length}
              </div>
              <div className="text-xs text-gray-600">Expired</div>
            </div>
          </div>

          {/* Add Item Form */}
          {showAddForm && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Add New Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter item name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="g">Grams</option>
                      <option value="ml">Milliliters</option>
                      <option value="pieces">Pieces</option>
                      <option value="cups">Cups</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Items */}
          {inventory.length > 0 ? (
            <div className="space-y-3">
              {inventory.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}
                    >
                      {getExpirationText(item.expirationDate, item.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateInventoryQuantity(item.id, -1)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        disabled={parseInt(item.quantity) <= 1}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateInventoryQuantity(item.id, 1)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => deleteInventoryItem(item.id)}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your inventory is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add ingredients to track their quantities and expiration dates.
              </p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Add Your First Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;