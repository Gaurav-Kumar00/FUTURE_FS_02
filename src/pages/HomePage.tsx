import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductGrid } from '../components/product/ProductGrid';

export const HomePage: React.FC = () => {
  const { applyFilters, filteredProducts } = useStore();
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Our Products</h1>
        <p className="text-slate-600">Discover amazing products at great prices</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-slate-600">
              Showing {filteredProducts.length} products
            </p>
          </div>
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};