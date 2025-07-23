import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import MealDetail from './pages/MealDetail';
import ShoppingList from './pages/ShoppingList';
import Inventory from './pages/Inventory';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/meals/:id" element={<MealDetail />} />
            <Route path="/shopping" element={<ShoppingList />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;