import React from 'react';
import { ShoppingCart, User, Search, Store } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { 
    cartItems, 
    toggleCart, 
    user, 
    toggleLoginModal, 
    setCurrentPage,
    currentPage 
  } = useStore();
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Store className="h-8 w-8" />
            <span className="text-xl font-bold">ShopEase</span>
          </button>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-slate-600 hover:text-blue-600 transition-colors ${
                currentPage === 'home' ? 'text-blue-600 font-medium' : ''
              }`}
            >
              Products
            </button>
            {user && (
              <button
                onClick={() => setCurrentPage('orders')}
                className={`text-slate-600 hover:text-blue-600 transition-colors ${
                  currentPage === 'orders' ? 'text-blue-600 font-medium' : ''
                }`}
              >
                Orders
              </button>
            )}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* User */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 hidden sm:block">
                  Hello, {user.firstName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => useStore.getState().setUser(null)}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLoginModal}
                className="flex items-center space-x-1"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:block">Login</span>
              </Button>
            )}
            
            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};