import React from 'react';
import { Home, ShoppingBag, Cuboid as Cube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shopping', icon: ShoppingBag, label: 'Shopping' },
    { path: '/inventory', icon: Cube, label: 'Inventory' }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                  isActive
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Horizontal Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl text-gray-900">MedDiet</span>
            </div>
            <div className="flex items-center space-x-1">
              {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                      isActive
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;