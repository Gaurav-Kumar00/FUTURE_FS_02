import React from 'react';
import { useStore } from '../../store/useStore';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { filteredProducts } = useStore();
  
  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 text-lg">No products found matching your criteria.</p>
        <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};